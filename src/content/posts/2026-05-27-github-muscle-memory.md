---
title: "从零到上线：4 周把 GitHub 变成肌肉记忆（一份小白生还指南）"
date: 2026-05-27
tags: [Tech, Git]
toc: true
description: "这是一篇手把手教你在 4 周内、每周 2-3 小时建立 GitHub 肌肉记忆的实操指南，包含环境准备、分支协作、自动化 Actions 与开源社区规范。"
ogImage: ../../assets/posts/github-muscle-memory/cover.webp
ogImageAlt: "从零到上线：4 周把 GitHub 变成肌肉记忆文章封面图"
license: "CC BY-NC-ND 4.0"
---

<aside>
<h3>关于这篇文章</h3>

这是一份给 GitHub 新手的 4 周上手路线图。我把环境准备、分支协作、PR、Actions、Release 和开源仓库基本功串成了每周一个闭环，目标不是背概念，而是把常用工作流练成肌肉记忆。

<h3>适合谁读</h3>

- 听说过 GitHub，但每次打开就想关掉的人
- 想用一个真实项目练协作，而不是只看概念的人
- 想从零搭起个人仓库、上线网站和基础开源规范的人

<h3>怎么读这篇文章</h3>

- **只想先跑通一遍** → 先看 Week 0 到 Week 2
- **想补自动化** → 直接跳到 Week 3 的 Actions & Release
- **想把仓库做得更像样** → 看 Week 4 + 文末速查表
- **卡在具体命令** → 直接翻 Git 命令速查 / Conventional Commits 速查 / 术语表

<h3>版权与声明</h3>

本文是我亲手走完一遍 4 周计划后的实操复盘，面向 GitHub 入门者整理。文中提到的产品界面、权限和功能可能随 GitHub 更新而变化，请结合你自己的环境核对。

<h3>首发与转载</h3>

- 首发于：千秋的个人站（本站）
- 本文采用 [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh) 协议发布——允许非商业整篇转载，转载请**保留作者署名**与**原文链接**，**禁止商业用途**，**禁止改编与衍生创作**。
</aside>

我写这份计划时，不想再做一篇看完觉得“懂了”、关掉页面又不敢动手的 GitHub 教程。我更想陪一个刚开始的人，把同一套动作真的做几遍：建仓库、提交、开分支、提 PR、让 Actions 跑起来，最后发布一个看得见的版本。

每周拿出两三个小时就够。四周之后，命令不一定全背下来，但下一次看到 conflict、review 或 CI，不至于又觉得那是另一群人的世界。

## 为什么是 4 周，不是 4 天也不是 4 个月

学 GitHub 最容易踩两种坑：

- **太快**：30 分钟速通视频，第二天全忘
- **太慢**：买系统课，第 5 章弃坑

4 周的设计哲学是 **「每周一个小型完整闭环」**：

| **周** | **主题** | **你能向别人展示什么** | **核心机制** | **时长** |
| --- | --- | --- | --- | --- |
| **W0** | 环境准备 | 账号 + Git + VSCode 全打通 | SSH / Token / 全局配置 | 1h |
| **W1** | 第一个 Repo & 上线 | 一个**已上线**的个人网站 | 本地 ↔ 云端的最小闭环 | 2–3h |
| **W2** | 分支 & PR | 被合并的 PR + 解过一次冲突 | 分开做事、合在一起 | 2–3h |
| **W3** | Actions & Release | 绿色对勾的 CI + 一个 Release | 仓库的「自动化机器人」 | 2–3h |
| **W4** | 开源标准 & 复盘 | 一份长得像那么回事的 repo | 从「自己玩」到「可以发出去」 | 2h |

每周末都有能截图发朋友圈的东西 — 这就是燃料。

---

## Week 0 · 环境准备（启动当晚 60 分钟）

这一步打通，后面 4 周才不会被「环境问题」反复打断。

### 先分清 Git 和 GitHub

<aside>

**Git** = 本地的时间机器（管理版本历史）
**GitHub** = 云端的备份 + 协作平台（让别人能看到、改、合并）
它们是**两个东西**，名字像而已。

</aside>

### 概念清单（你需要能解释这些）

| **概念** | **一句话解释** |
| --- | --- |
| SSH key | 本机和 GitHub 的「身份证 + 通行证」，省去每次输密码 |
| 全局配置 | 告诉 Git「我是谁」，每次 commit 都会带上这个署名 |
| 默认分支 | 主线分支的名字，现代约定叫 `main`（旧仓库可能叫 `master`） |

### 最小清单

- 注册 GitHub 账号（用户名建议**简短、英文、用一辈子**）
- 如果你是学生：申请 **GitHub Student Developer Pack** — 免费的 Copilot Pro 比什么都值
- 装 Git，终端跑 `git --version` 验证
- 配置全局信息（这步以后每台新电脑都要做一次）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
git config --global init.defaultBranch main
```

- 生成 SSH key 并加到 GitHub（之后 push 不再要密码）
- VSCode 装 **GitLens** 扩展（能在编辑器里直接看每行代码是谁、什么时候、为啥改的）

### 通关自查

- 终端 `git --version` 有输出
- 终端 `ssh -T git@github.com` 显示 `Hi 你的用户名!`
- VSCode 打开任何文件夹后，左侧能看到 Source Control 图标
- 能用自己的话解释：repo / commit / branch / push / pull

### 我的卡点

SSH 那步最容易卡。如果 `ssh -T git@github.com` 没有显示 `Hi 你的用户名!`，**先别往下走**。这一步不通，整个 4 周都会反复出问题。

---

## Week 1 · 看到自己的网站上线（魔法时刻）

这是整个 4 周里**最爽的一周**。

### 这周建立的工作流

<aside>

`本地改 → git add → git commit → git push → 网站自动更新`
这个循环是后面所有操作的基本节奏。**先让肌肉记住它**，再去理解每一步为什么这样做。

</aside>

### 概念清单（这周必须能解释）

| **概念** | **一句话解释** |
| --- | --- |
| Repository (repo) | 项目的「工程文件夹」，带完整历史 |
| Commit | 一次「快照 + 说明」的提交，是 Git 的最小单元 |
| Push / Pull | 把本地变化推到云端 / 把云端变化拉到本地 |
| `.gitignore` | 声明哪些文件**不**要被 Git 追踪（密钥、缓存、产物） |
| `README.md` | 项目门面，给陌生人看的入口 |
| GitHub Pages | 把 repo 静态文件免费托管成网站 |

### 一个小魔法

建 repo 时，名字一定要是 **`你的用户名.github.io`** — 这个名字会触发 GitHub **自动开启 Pages 托管**。免费、自动、HTTPS。

### 这周的最小闭环

1. 建一个叫 `用户名.github.io` 的 repo（勾选 Add README）
2. `git clone git@github.com:用户名/用户名.github.io.git` 到本地
3. 写一个 `index.html`（让 AI 帮你起骨架就行）
4. `git add .` → `git commit -m "feat: 添加首页"` → `git push`
5. 打开 `https://用户名.github.io` — **看到自己的网站**
6. 截图存档（这一刻你要记一辈子）
7. 再做 3 次小 commit，练习「小 commit」习惯

### 这周最重要的习惯：Commit 要小，Message 要清楚

烂 message（半年后看自己代码像看天书）：

```bash
git commit -m "update"
git commit -m "fix"
git commit -m "改了点东西"
```

好 message（Conventional Commits 格式，下方有完整速查）：

```bash
git commit -m "feat: 添加首页自我介绍"
git commit -m "fix(nav): 修复手机端菜单错位"
git commit -m "docs: 更新 README quick start"
```

<aside>

**为什么要拆小？** Git 的本质是「时间机器」。每个 commit 就是一个可以回到的存档点。如果一次提交改 50 个文件，你的「存档」就只有一个超大颗粒度 — 出问题时根本没法精准回滚。

</aside>

---

## Week 2 · 分支 & PR（程序员协作的核心）

### 一个关键的认知翻转

<aside>

新手以为：分支是高级功能，先在 main 上写熟了再说。
**真相**：分支是给「未完成的工作」的安全屋。在 main 上直接改，就像在原稿上涂改 — 想反悔都没办法。

</aside>

### 概念清单

| **概念** | **一句话解释** |
| --- | --- |
| Branch | 从某个时间点分出来的「平行宇宙」 |
| Pull Request (PR) | 申请把我的分支合并回主线，附带「同行检查」环节 |
| Merge / Rebase / Squash | 合并的三种姿势（细节见下） |
| Conflict | 两边都改了同一行 → Git 没办法替你决定，求你手动选 |
| Code Review | 合并前的同行检查，哪怕只是自己 review 自己 |

### Merge 三姿势速懂

- **Merge**：保留两条历史，多出一个「合并 commit」 — 历史最真实但乱
- **Squash**：把分支上所有 commit 压成 1 个再合 — 历史最干净，**个人项目推荐**
- **Rebase**：把分支的 commit 「重新接到」主线最新位置 — 历史像直线，但操作稍复杂

### 一次完整 PR 流程

```bash
# 1. 从 main 切一个新分支
git checkout -b feat/projects-page

# 2. 改东西，拆成 3–5 个小 commit
git add . && git commit -m "feat: 添加作品页骨架"
git add . && git commit -m "style: 调整作品页配色"

# 3. 推到云端（第一次推要 -u 关联远程分支）
git push -u origin feat/projects-page

# 4. GitHub 点 "Compare & pull request"
# 5. PR 标题用 Conventional 格式
# 6. PR 描述写：做了什么 + 为什么 + 怎么测
# 7. 自己 review 自己的 diff（认真挑刺）
# 8. Squash & Merge
```

### 必须亲身经历一次的事：解决 Conflict

第一次看到 `CONFLICT (content): Merge conflict in ...` 时，**千万不要 panic 用** `git reset --hard`。

正确姿势：

1. VSCode 会自动用上下箭头标出冲突区，给你 4 个按钮：
- **Accept Current**：保留我这边的
- **Accept Incoming**：用对面那边的
- **Accept Both**：两个都留下
- **Compare Changes**：先看 diff 再决定
2. 选完 → 保存 → `git add .` → `git commit`

<aside>

**Conflict 本质是什么？** 两个平行宇宙都改了同一行，Git 没办法替你决定哪个对 — 它在向你**求助**，不是在惩罚你。

</aside>

### 这周建议练 4 个 PR

- **PR #1**：加一个作品页（练完整流程）
- **PR #2**：**故意制造冲突再 resolve**（这是必修课）
- **PR #3**：加博客模板
- **PR #4**：优化样式 / 配色

顺便去 **Settings → Branches → Add rule** 保护 main，禁止直接 push — 强制自己走 PR 流程。

---

## Week 3 · Actions & Release（让仓库「活」起来）

这周的关键词：**自动化 + 版本管理**。

### 心智模型

<aside>

**Actions** = 你的仓库的机器人员工
你定义「什么时候 + 干什么」，它就 7×24 替你干。

</aside>

### 概念清单

| **概念** | **一句话解释** |
| --- | --- |
| Issue | 所有「待办 / bug / 想法」的统一入口，比微信收藏强 100 倍 |
| Label / Milestone | Issue 的分类标签和阶段目标 |
| Workflow | 一个 YAML 文件 = 一个自动化任务 |
| Job / Step | Workflow 的两层结构：一个 job 里有多个顺序执行的 step |
| Tag | 给某个 commit 钉一个永久标签，通常用来标版本 |
| Release | 基于 Tag 的「正式发布」，可以挂下载文件和 release notes |

### 典型 Actions 应用

- 每次 push 自动检查代码语法
- 每次合并自动部署到服务器
- 每周一自动跑一次依赖更新
- PR 评论里有人写 `/deploy` 就自动触发部署

### 你的第一个工作流 · `check.yml`

在 repo 里新建 `.github/workflows/check.yml`，复制下面这段进去：

```yaml
# .github/workflows/check.yml
# 作用：每次 push / PR 时自动检查 HTML 语法 + Markdown 链接
name: Check

on:                              # 什么时候触发
  push:
    branches: [main]             # 推送到 main 时
  pull_request:                  # 有 PR 时
  workflow_dispatch:             # 允许手动点按钮触发

jobs:
  html-validate:                 # job 名字，随便起
    runs-on: ubuntu-latest       # 跑在什么机器上（GitHub 免费提供）
    steps:
- name: Checkout code      # 第 1 步：把代码下载到这台虚拟机
        uses: actions/checkout@v4

- name: Setup Node.js      # 第 2 步：装 Node（检查工具需要）
        uses: actions/setup-node@v4
        with:
          node-version: '20'

- name: Validate HTML       # 第 3 步：跑 HTML 检查
        run: npx html-validate "**/*.html"

- name: Check Markdown links  # 第 4 步：检查文档里的死链
        uses: gaurav-nelson/github-action-markdown-link-check@v1
        with:
          use-quiet-mode: 'yes'
```

<aside>

**读懂这个文件的 3 个关键词**：
**`on`** = 「什么时候触发」，**`jobs`** = 「要跑几件事」，**`steps`** = 「每件事里的具体步骤」。
三层嵌套，就这么简单。

</aside>

push 之后去 **Actions tab** 看。第一次看到工作流变成绿色对勾时，你会明白为什么程序员会在意 CI。

### 跑红了怎么办？

1. 点进那条红的记录 → 点 **Re-run** 之前先看日志
2. 日志从下往上看（错误信息通常在最后几行）
3. 拼拷贝错误记录丢给 AI，问「这是什么意思？怎么修？」— 比自己猜快 10 倍

### Issue + Milestone + PR 的连环技

1. 开 3 个 Issue：1 个 bug + 1 个 feature + 1 个 chore
2. 建一个 Milestone「v0.1.0」把它们都归进去
3. 修 bug 时切分支 → 写代码 → 开 PR
4. **PR 描述里写 `Closes #1`** — 合并时 GitHub 会自动关掉这个 Issue

### Semantic Versioning（语义化版本）

版本号是个简单约定：`v主版本.次版本.修订号`

| **变化** | **含义** | **例子** |
| --- | --- | --- |
| 修订号 +1 | 修了个 bug，向后兼容 | `v0.1.0` → `v0.1.1` |
| 次版本 +1 | 加了新功能，向后兼容 | `v0.1.1` → `v0.2.0` |
| 主版本 +1 | 大改，可能不兼容旧版 | `v0.2.0` → `v1.0.0` |

打第一个 tag：

```bash
git tag v0.1.0
git push origin v0.1.0
```

然后在 GitHub **Releases** 页面点 **Draft new release** — 这是给世界看的「正式版本」。Conventional Commits 还能让你**一键自动生成** release notes。

---

## Week 4 · 开源标准（从「自己玩」到「可以发出去」）

一个「专业仓库」该有的标配文件：

| **文件** | **作用** | **没它的代价** |
| --- | --- | --- |
| `README.md` | 项目门面：这是什么 / 怎么用 / 找谁问 | 陌生人 30 秒内关掉你的 repo |
| `LICENSE` | 声明开源协议，建议选 MIT | **别人不敢用你的代码**（法律风险） |
| `CONTRIBUTING.md` | 别人怎么给你贡献代码的规则 | PR 来一个乱一个 |
| `.github/ISSUE_TEMPLATE/` | 让别人提 bug / 提议有模板可循 | 收到一堆「能不能修一下啊」的 Issue |
| `.github/PULL_REQUEST_TEMPLATE.md` | 让 PR 描述格式统一 | review 时找不到上下文 |
| `CHANGELOG.md` | 每个版本改了什么 | 用户升级时一脸懵 |

配齐之后去 repo 的 **Insights → Community Standards** 看 — 全绿就说明你的项目已经「长得像那么回事」了。

### PR 模板 · `.github/PULL_REQUEST_TEMPLATE.md`

建一次，以后每个新 PR 都会自动填这个骨架：

```markdown
## 这个 PR 做了什么
<!-- 一句话总结 -->

## 为什么要这么改
<!-- 背后的动机 / 解决的问题 -->
Closes #<!-- issue 号 -->

## 怎么测试
<!-- reviewer 怎么验证你这个改动能跑 -->
- [ ] 本地 `npm run dev` 能启动
- [ ] 访问 /xxx 页面，看到 yyy
- [ ] CI 全绿

## 截图 / 录屏（UI 改动必填）
<!-- 拖拽图片进来 -->

## 检查清单
- [ ] 代码能跑起来
- [ ] 添加/更新了必要的文档
- [ ] commit message 符合 Conventional Commits
- [ ] 没有 commit 进来密码/密钥
```

### Issue 模板 · `.github/ISSUE_TEMPLATE/`

建两个文件，让别人提 Issue 时能选「报 bug」还是「提议新功能」。

**`bug_report.md`**

```markdown
---
name:  Bug 报告
about: 遇到不对劲的行为请汇报
title: "[Bug] "
labels: bug
---

## 什么问题
<!-- 一行话描述 -->

## 复现步骤
1. 打开 ...
2. 点击 ...
3. 看到 ...

## 预期 vs 实际
- 预期：
- 实际：

## 环境
- OS： (Windows 11 / macOS 14 / …)
- 浏览器： (Chrome 120 / …)
- 版本： (v0.2.0)

## 截图 / 控制台报错
```

**`feature_request.md`**

```markdown
---
name:  功能请求
about: 提议一个新功能
title: "[Feature] "
labels: enhancement
---

## 想解决的问题
<!-- 你为什么需要这个功能 -->

## 期望的方案
<!-- 希望怎么实现 -->

## 替代方案
<!-- 考虑过哪些别的思路 -->

## 补充上下文
```

### CONTRIBUTING.md 骨架

个人项目不需要写太复杂，这个最小版就够：

```markdown
# 贡献指南

感谢考虑给这个项目贡献！

## 提交 Issue 前
- 先搜一下是不是已经有人提过
- 用 Issue 模板，信息越全 reviewer 越快处理

## 提交 PR 的流程
1. Fork 这个 repo
2. 从 `main` 切一个 feature 分支：`git checkout -b feat/my-feature`
3. 提交改动，遵守 [Conventional Commits](https://www.conventionalcommits.org/)
4. 推到你的 fork，开 PR 回本 repo 的 `main`
5. 等 CI 跑绿 + 响应 review 评论

## 代码风格
- HTML/CSS 用 2 个空格缩进
- 文件名全小写，单词间用 `-` 分隔
- 提交前本地跑一下 `npx html-validate "**/*.html"`

## 行为准则
保持友善、耐心、尊重。他人可能是第一次贡献开源。
```

### `.gitignore` 起手范例

项目一开始就把这个文件加进去，避免垃圾文件污染仓库：

```bash
# 依赖
node_modules/

# 环境变量 / 密钥（重点！）
.env
.env.local
*.pem
*.key

# 编辑器
.vscode/
.idea/
*.swp
.DS_Store

# 构建产物
dist/
build/
*.log

# 缓存
.cache/
.next/
```

<aside>

**记住**：`.gitignore` 只能拦「还没被追踪」的文件。如果你已经不小心 commit 了 `.env`，**光加进 `.gitignore` 没用** — 还得 `git rm --cached .env` 才能从追踪里移除。而且历史里依然留着，需要用 `git filter-repo` 清掉。

</aside>

### README 加分项

- 顶部加 **badges**（构建状态 / license / 版本号），例如：

```markdown
![CI](https://github.com/用户名/repo名/actions/workflows/check.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/github/v/release/用户名/repo名)
```

- 加**截图 / GIF 演示**（推荐用 LICEcap 录小 GIF）
- 加 **Quick Start** 章节（让人能在 3 分钟内跑起来）

---

## 我刚开始时最容易踩的 10 个坑

<aside>

**这些坑有些会浪费时间，有些真的会丢代码或泄露密钥。我把它们留在一起，卡住时回来对照。**

</aside>

1. **把密码 / API key commit 进去** — 推送后全网公开，可能被刷爆账单。`.gitignore` + `.env`，提交前默问一句「这文件能给陌生人看吗」。
2. **直接在 main 上改东西** — 没有缓冲层，搞砸难回滚。永远从 main 切分支。
3. **一个 commit 改 50 个文件** — 没法 review，出问题难定位。一个 commit 只做一件事。
4. **commit message 写 "update" / "fix"** — 半年后看自己代码像看天书。用 Conventional Commits。
5. **`git push --force` 不看后果** — 把别人或自己的提交直接抹掉。个人 repo 之外**永远**不 force push。
6. **不先 pull 就 push** — 触发冲突或被拒。**改之前先 pull，写之前先 pull**。
7. **把 `node_modules` / 编译产物 commit 进去** — 仓库爆炸到几百 MB。`.gitignore` 第一天就配好。
8. **忘了 LICENSE** — 别人不敢用你代码。个人项目选 MIT，复制粘贴。
9. **PR 标题写「改了点东西」** — reviewer 一脸懵。**标题 = 做了什么；描述 = 为什么 + 怎么测**。
10. **看到 conflict 就 panic 用 `git reset --hard`** — 会丢东西。VSCode 有 conflict UI，照着点就行。

---

## ⌨ Git 命令速查（背 80% 就够日常用）

- **点开查表**

    ```bash
    # 看状态
    git status              # 当前有哪些改动？
    git log --oneline       # 历史 commit 简洁列表
    git diff                # 看具体改了什么

    # 提交
    git add .               # 把所有改动加入暂存
    git add 文件名           # 只加某个文件
    git commit -m "feat: 描述"
    git commit --amend      # 修改最近一次 commit

    # 远程同步
    git push                # 推到远程
    git pull                # 拉远程更新（= fetch + merge）
    git fetch               # 只下载，不合并

    # 分支
    git branch              # 看所有分支
    git checkout -b 名字     # 新建并切换分支
    git checkout 名字        # 切换分支
    git merge 名字           # 把「名字」分支合并到当前
    git branch -d 名字       # 删分支

    # 反悔三连
    git restore 文件名       # 丢弃工作区改动
    git reset --soft HEAD~1 # 撤销最近 commit，保留改动
    git revert <hash>       # 用新 commit 抵消旧 commit（安全）
    ```

## Conventional Commits 速查

让 commit message 一眼能读：

格式：`<类型>(<范围>): <描述>`

| **类型** | **含义** | **示例** |
| --- | --- | --- |
| `feat` | 新功能 | `feat(blog): 添加文章页面` |
| `fix` | 修 bug | `fix(nav): 修复手机端菜单错位` |
| `docs` | 仅文档变化 | `docs: 更新 README quick start` |
| `style` | 格式（不影响逻辑） | `style: 统一缩进` |
| `refactor` | 重构（不改功能） | `refactor: 抽取 Header 组件` |
| `perf` | 性能优化 | `perf: 压缩首页图片` |
| `test` | 测试相关 | `test: 添加导航单测` |
| `chore` | 杂活（构建配置等） | `chore: 升级 Actions 版本` |

## 术语表（看完能听懂 90% 程序员对话）

- **点开查表**
- **Repo (Repository)** — 项目仓库
- **Clone** — 把云端 repo 抓到本地
- **Fork** — 把别人的 repo 复制一份到自己账号
- **Origin** — 默认远程仓库别名
- **HEAD** — 「你当前位置」指针
- **Staging Area** — `git add` 之后、`git commit` 之前的中间区
- **Working Directory** — 你看到的文件
- **Upstream** — 上游分支（push 默认推到这里）
- **PR (Pull Request)** — 申请合并代码
- **MR (Merge Request)** — GitLab 的叫法，同 PR
- **CI/CD** — Continuous Integration / Delivery，自动化测试 + 部署
- **SemVer** — Semantic Versioning，`v1.2.3`
- **Octocat** — GitHub 吉祥物（章鱼猫）

---

## 四周以后，我希望你留下的是这个节奏

如果你真的把四周走完，当然会留下一个上线的网站、几次 PR、一个 Actions 工作流和一个 Release。但这些东西不是奖杯，它们只是证据：你已经亲手走过 `commit → push → PR → review → merge`，下次不必再从“Git 到底是什么”重新开始。

第一次的 HTML 很丑、commit message 写得不漂亮、PR 描述只有两行，都没关系。我自己的经验是，先把一整圈跑通，比在第一步停下来追求标准答案有用得多。每周末只记一句也行：这周卡在哪里，最后怎么出来的。几个月后真正救你的，往往就是这句当时觉得很普通的笔记。

走完之后，也不需要马上给自己安排一门更大的课。可以把这个项目放进个人简介，可以去修一个开源项目的 typo，也可以再做一个很小的工具。挑一件你确实想做的，然后继续用同一个节奏推进。

我希望这篇文章最后留下的不是“我学完 GitHub 了”，而是另一种更踏实的感觉：下一次要做东西时，我知道该从哪里开始，也知道出错以后还能回来。
