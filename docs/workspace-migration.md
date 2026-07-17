# 工作区迁移说明

`scripts/bootstrap-qiu-workspace.sh` 用于在新的 Linux 或 macOS 机器上恢复当前
`~/src` 工作区中的三个公开仓库，以及它们可由锁文件重建的开发环境。

## 一条命令恢复

先把脚本复制到新机器并阅读内容，再执行：

```bash
chmod +x bootstrap-qiu-workspace.sh
WORKSPACE_ROOT="$HOME/src" ./bootstrap-qiu-workspace.sh
```

脚本默认恢复各仓库的 `main` 分支。当前网站拉取请求合并前，如需复现本分支，使用：

```bash
QIU_SITE_REF=codex/immersive-home-hotspots \
  WORKSPACE_ROOT="$HOME/src" \
  ./bootstrap-qiu-workspace.sh
```

依赖恢复完成后，可用 `RUN_CHECKS=1` 再运行一次来执行三个仓库各自的构建、类型检查
和测试。该开关会忠实返回每个上游仓库当前测试状态；测试失败不会被忽略。

脚本会：

- 以当前普通用户安装 `mise 2026.7.7` 和 `uv 0.8.22`，不调用 `sudo`；
- 用 `mise` 提供隔离的 `Node 22.23.1`，恢复网站的 npm 依赖和 Crewlight 的
  pnpm 依赖；
- 用 `uv` 创建 MealCircuit 独立的 `.venv`，根据 `uv.lock` 恢复全部可选功能和
  开发工具；
- 通过 HTTPS 克隆公开仓库，不依赖原机器的 SSH 私钥；
- 遇到目标目录有未提交修改时停止，不覆盖现有工作。

新机器必须预先具备 Git、curl、CA 证书和 tar。脚本检测到缺项时只会报告，不会
自行调用 `sudo`。如果需要系统管理员安装，请先审查适合新机器发行版的安装命令。

## 无法安全放进脚本的内容

以下内容与账号、机器或操作系统绑定，因此明确不包含在迁移脚本中：

- `.env`、API 密钥、GitHub 令牌、SSH/GPG 密钥；
- Codex 登录会话、插件缓存和浏览器登录资料；
- `node_modules`、`.venv`、Astro 构建目录和 Playwright/Chromium 缓存；
- MealCircuit 的真实用户数据；
- Crewlight 的 Windows Electron 安装包和签名材料；
- MealCircuit 同步服务器的数据库、PostgreSQL 密码和 HTTPS 配置。

这些内容不能通过“复制整个主目录”安全解决。依赖和浏览器二进制应在目标平台重新
下载；凭据应从密码管理器重新录入；Windows 桌面包应在 Windows 构建环境重新生成。

## MealCircuit 数据迁移

在旧机器的 MealCircuit 仓库中创建加密备份：

```bash
cd "$HOME/src/meal-circuit"
uv run python -m mealcircuit.agent_cli export-data --output mealcircuit-backup.mcx
```

把 `mealcircuit-backup.mcx` 通过可信通道复制到新机器。先预览，再明确应用恢复：

```bash
cd "$HOME/src/meal-circuit"
uv run python -m mealcircuit.agent_cli import-data /path/to/mealcircuit-backup.mcx --preview --mode restore
uv run python -m mealcircuit.agent_cli import-data /path/to/mealcircuit-backup.mcx --mode restore --apply
```

如有 AI 提供商配置，在新机器从 `.env.example` 新建 `.env`，然后从密码管理器填写
新的或原有的 API 密钥；不要把 `.env` 提交到 Git。

## Browser 插件与可视化测试

Browser/Codex 插件属于用户级工具，不属于任何一个项目仓库。请在新机器的 Codex
中从插件目录重新安装；首次执行前端浏览器测试时，再由插件下载与目标操作系统匹配的
浏览器。不要复制旧机器的 `~/.codex` 或浏览器 profile，其中可能包含令牌、Cookie
和私密会话。

## MealCircuit 同步服务器

当前机器没有安装 Docker，也没有运行同步数据库，因此脚本不会虚构这一部署状态。
如果新机器需要同步服务，应另行安装 Docker，随后依据
`meal-circuit/sync_server/compose.yaml` 创建独立的 PostgreSQL 密码和域名配置；数据库
内容必须使用数据库备份迁移，而不是复制项目目录。
