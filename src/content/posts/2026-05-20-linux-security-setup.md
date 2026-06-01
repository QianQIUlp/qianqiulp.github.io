---
title: "新服务器加固的三阶段心智模型：从「关门」到「装监控」"
date: 2026-05-20
tags: [Security, Tech]
description: "新 Linux 服务器加固实战，按 P0 / P1 / P2 梳理安全组、SSH、自动更新和 fail2ban。"
ogImage: ../../assets/posts/linux-security-setup/cover.webp
ogImageAlt: "新 Linux 服务器加固文章封面"
license: "CC BY-NC 4.0"
---

<aside>
📖 

**关于这篇文章**

这是一份新 Linux 服务器加固的实战手册，30 分钟可走完。沿用 **P0 / P1 / P2** 三阶段心智模型——**不只告诉你敲什么命令，更告诉你为什么这么做**。

**适合谁读**

- 刚拿到一台新 VPS、想尽快收紧默认配置的人

- 想理解服务器安全**分层防御**思路而不只是抄命令的人

- 用云服务器搞个人项目 / 学习 / 单用户开发，但不想成为安全专家的人

**怎么读这篇文章**

- **第一次部署** → 顺着 P0 → P1 → P2 一节节做下来

- **只想要核心** → 做完 P0 + P1 就有四层防御，P2 是长期保险

- **出问题** → 先看 踩坑合集 的表格，再回头对照具体章节

- **想理解原理** → 看 进阶心法

**版权与声明**

本文为个人实操笔记整理而成，仅供学习与参考。其中涉及的系统配置请结合自己的环境评估，并对自己的运维行为负责。

**首发与转载**

- 原文首发：[新服务器加固的三阶段心智模型](https://www.notion.so/qianqiulp/3661d0b6482180aba964fea1389968f1)（Notion 公开页）

- 本文采用 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.zh) 协议发布——允许非商业转载与改编，转载请**保留作者署名**与**首发链接**，**禁止商业用途**。
</aside>

<aside>
🛡️ 拿到新 Linux 服务器后，**30 分钟搞定核心安全加固**。这是一份**实战手册 + 心智模型**——不只告诉你敲什么命令，更告诉你**为什么这么做**。
</aside>

---

## 为什么要做这件事

云厂商交付的新服务器，**默认配置是"为开机即用，不为安全"**：

  - root 可以远程登录
  - 密码登录开启
  - SSH 监听标准端口 22
  - 没有任何登录失败防护
  - 安全补丁需要手动打

只要公网 IP 暴露**几小时**，就会被全球扫描器命中。常见后果：

  - 🔴 几千次/天的自动化爆破尝试
  - 🔴 弱密码服务器**几天内被攻陷**
  - 🔴 被攻陷后：当矿池节点、DDoS 跳板、被勒索

🟢 好消息：**做对几件事就能挡住 99% 的攻击**。这份手册是给"想用好一台 VPS、但不想成为安全专家"的人。

### 适用人群

  - ✅ **适用**：个人 VPS、学习用机、单用户开发服务器
  - ❌ **不适用**：生产环境多用户系统、有合规要求的企业部署（那需要更专业的方案）

---

## 三阶段心智模型

把所有安全措施按**目的 + 时间维度**分成三层：
<table>
  <thead><tr><th>阶段</th><th>防什么</th><th>时间维度</th><th>类比</th></tr></thead>
  <tbody>
    <tr><td>**P0**</td><td>默认弱配置</td><td>现在</td><td>把门关上</td></tr>
    <tr><td>**P1**</td><td>直接的网络/协议攻击</td><td>现在</td><td>换防盗门 + 装猫眼</td></tr>
    <tr><td>**P2**</td><td>**长期运行衰减**</td><td>未来</td><td>装监控 + 自动报警</td></tr>
  </tbody>
</table>

### 🔑 关键认知

  - **P0 / P1** 是 <em>preventive</em>（防止进入）
  - **P2** 是 <em>resilient</em>（长期韧性）

跳过 P2 → 短期没事，但**未来某天有新漏洞、配置漂移时**你没保险。
跳过 P0 / P1 → **现在**就已经在裸奔。

### 三阶段分别做什么

<table>
  <thead><tr><th>阶段</th><th>工具</th><th>防的是</th></tr></thead>
  <tbody>
    <tr><td>**P0**</td><td>收紧安全组 / 系统更新 / 创建用户</td><td>出厂默认值</td></tr>
    <tr><td>**P1**</td><td>密钥登录 / 改端口 / 禁 root + 禁密码</td><td>直接的协议层攻击</td></tr>
    <tr><td>**P2**</td><td>自动安全更新 / fail2ban / ufw（可选）</td><td>未来漏洞、配置漂移、应用泄露</td></tr>
  </tbody>
</table>

---

## 核心原则（4 条铁律）

<aside>
⚠️ 在敲任何命令前，把这四条内化：

- **永远保持当前会话开着，再开新会话验证** —— 改坏了能用老会话救命

- **先建后拆**（新端口先放行再删旧的） —— 任何"删除"都是单向，要可回退

- **每步都有验证点** —— 不验证就往下走 = 在叠 bug

- **最小化变更**：只动需要动的，其他不碰 —— 副作用面 = 你以后排障的成本
</aside>

---

## P0 · 基础准备

### P0.1 立刻在云厂商控制台收紧安全组

🛠️ 控制台路径：`实例 → 安全组 → 入方向规则`
默认通常会开三个端口给整个互联网：

  - `22 (SSH)` 来源 `0.0.0.0/0`
  - `3389 (RDP)` 来源 `0.0.0.0/0`
  - `ICMP` 来源 `0.0.0.0/0`

**立刻**做：

  - 把 `22` 的来源改为**你家庭公网 IP**（查询：`curl ifconfig.me` 或访问 [ipinfo.io](http://ipinfo.io)）
  - **删除 `3389`**（你不是 Windows 不需要）
  - `ICMP` 可保留方便 ping 排障

✅ **验证**：用手机 4G 流量试连 SSH → 应该连不上（说明白名单生效）

### P0.2 升级系统打补丁

用云厂商提供的初始凭证（通常是 root + 密码）登入：
```
sudo apt update && sudo apt upgrade -y
```
❗ 这步**必须做**。新机器经常带着已知漏洞。

### P0.3 创建普通用户

直接用 root 是大忌。创建一个普通用户：
```
adduser dev              # 用你喜欢的名字，避开 admin/user/test
usermod -aG sudo dev     # 加 sudo 组
```
💡 **命名提醒**：用一个**不在常见用户名字典**里的名字（不要叫 admin、user、root2 这种）。攻击者扫描时会优先尝试这些常见名字。
<aside>
⚠️ **常见坑**：`adduser` 是交互式的，中途按到 `Ctrl+Z` 会挂起、密码不被设上。出问题就：

```
jobs              # 看有没有 Stopped
kill %1           # 杀掉挂起的 adduser
passwd dev        # 单独重设密码
```
</aside>
✅ **验证**：`su - dev` 能进 → `whoami` 显示 `dev` → `sudo -v` 能升权

---

## P1 · 核心加固

> 这是最关键的阶段。做完 P1 你就拥有了**四层防御**的前三层。

### P1.1 配置 SSH 密钥登录

#### 在客户端生成密钥

**类型选 ED25519**（不要用 RSA 2048，已不推荐）。

  - macOS / Linux: `ssh-keygen -t ed25519 -C "your_comment"`
  - Windows: Termius / PuTTY / VS Code 图形界面生成
  - 移动端: Termius

🔑 **强烈推荐设 passphrase**——即使密钥被偷也能多挡一层。

#### 把公钥贴到服务器

在服务器上切到普通用户：
```
su - dev
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys      # 粘贴一行公钥
chmod 600 ~/.ssh/authorized_keys
```
<aside>
⚠️ **权限必须正确**，否则 sshd 拒绝使用密钥还**不告诉你为什么**：

<table>

<thead><tr><th>文件</th><th>权限</th></tr></thead>

<tbody>

<tr><td>`~/.ssh`</td><td>`700` (drwx------)</td></tr>

<tr><td>`~/.ssh/authorized_keys`</td><td>`600` (-rw-------)</td></tr>

</tbody>

</table>

所有者必须是普通用户自己，**不是 root**。
</aside>

#### 用新会话测试

❗ **不要关 root 会话**。新建/复制一个客户端 Host：

  - 用户名: `dev`
  - 密码: 留空
  - 关联生成的密钥

✅ 能登入 → `whoami` 显示 `dev` → `sudo -v` 工作 → **才能进 P1.2**

### P1.2 改 SSH 端口避开扫描

把 SSH 从标准 22 改到一个不显眼的端口。

#### 选端口

  - 范围：10000–65535
  - 验证没被占用：`sudo ss -tlnp | grep &lt;端口&gt;` → 空 = 可用
  - 本文示例用 **60022**（请你自己选一个不同的，避免大家都用一样的）

#### 控制台先放行新端口

🛠️ 安全组新增入方向规则：

  - 端口：`60022`
  - 来源：和 `22` 那条一样（家庭 IP 白名单 或 `0.0.0.0/0`）
  - 描述：`SSH-new-port`

❗ **保留旧 `22` 规则**，**不要删**——先建后拆。

### P1.3 加固 sshd 配置

```
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
sudo nano /etc/ssh/sshd_config
```
确认以下四行**存在且没有 `#`**：
```
Port 60022
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```
每条的含义：
<table>
  <thead><tr><th>配置</th><th>含义</th></tr></thead>
  <tbody>
    <tr><td>`Port 60022`</td><td>监听新端口</td></tr>
    <tr><td>`PermitRootLogin no`</td><td>禁止 root 直接 SSH 登录</td></tr>
    <tr><td>`PasswordAuthentication no`</td><td>禁止密码登录（**必须先确认密钥能用**！）</td></tr>
    <tr><td>`PubkeyAuthentication yes`</td><td>允许密钥登录</td></tr>
  </tbody>
</table>
验证语法正确：
```
sudo sshd -t        # 没输出 = OK，有错就显示哪行
```

### P1.4 处理 Ubuntu socket activation 坑（24.04+ 必看）

<aside>
🪤 Ubuntu 22.04 之后默认用 **systemd socket activation** 管理 SSH。**光改 sshd_config 的 Port 不会生效**——这是最容易踩的坑。
</aside>

#### 怎么判断你踩到了

```
sudo systemctl status ssh.socket
```
如果 `Active: active` → 中招了。`ssh.socket` 写死了监听 22，会忽略 `sshd_config` 的 `Port`。

#### 解决：切换到传统服务模式

```
sudo systemctl disable --now ssh.socket
sudo systemctl enable --now ssh.service
```

#### 处理可能的遗留 sshd 进程

```
sudo ss -tlnp | grep ssh
```
如果还看到 22 端口在监听（PID 是个旧的）：
```
sudo kill &lt;旧PID&gt;
```
✅ **最终状态**：`ss -tlnp` 只显示新端口，22 完全消失。

#### 客户端测试新端口

复制刚才的 dev Host → 改端口为 `60022` → 新开连接。
能连 = **完成** ✔

### P1.5 收尾清理

确认新端口能稳定登录后：

  - 🛠️ 控制台**删除**旧的 `22` 安全组规则
  - 客户端**删除**旧的 `root + 密码 + 22` Host 配置
  - `sshd_config.bak` 备份**保留 24 小时**，确认无异常后再删

---

## 📊 P1 完成后的"四层防御"

<table>
  <thead><tr><th>层</th><th>控制</th><th>状态</th></tr></thead>
  <tbody>
    <tr><td>**网络层**</td><td>防火墙 / 安全组</td><td>✔ 仅放行新端口</td></tr>
    <tr><td>**传输层**</td><td>端口选择</td><td>✔ 避开扫描器热点</td></tr>
    <tr><td>**协议层**</td><td>sshd 配置</td><td>✔ 禁 root、禁密码、强制密钥</td></tr>
    <tr><td>**身份层**</td><td>密钥</td><td>✔ ED25519 + passphrase</td></tr>
  </tbody>
</table>
任一层被突破，下面还有三层 → **defense in depth**。

---

## P2 · 长期韧性

> P1 完成后你已经"现在安全"了。P2 是让你**长期保持安全**。

### P2.1 自动安全更新（unattended-upgrades）

很多 Ubuntu 系统**默认已经装**，但要验证配置正确：
```
sudo systemctl status unattended-upgrades
sudo cat /etc/apt/apt.conf.d/20auto-upgrades
```
期望看到：
```
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```
如果是 `"0"` 或文件不存在：
```
sudo dpkg-reconfigure -plow unattended-upgrades
# 弹出对话框选 Yes
```
看日志确认在工作：
```
sudo cat /var/log/unattended-upgrades/unattended-upgrades.log | tail -20
```

### P2.2 自动封禁爆破 IP（fail2ban）

#### 它做什么

监控 SSH 失败登录，达到阈值就**自动用防火墙规则封禁来源 IP**。
<aside>
🤔 **诚实说**：如果你已经按 P1 配了**仅密钥登录**，fail2ban 的**直接安全收益很小**——密码爆破对你本来就 100% 失败。它的真实价值是：

- **日志卫生**：扫描尝试被快速封掉，`auth.log` 不再被淹没

- **配置漂移保险**：万一某天误把密码登录开回来，仍有兜底

- **资源节省**：减少握手开销

🟡 是否安装由你的偏好决定（精简党可跳过，强迫症推荐装）。
</aside>

#### 安装

```
sudo apt install fail2ban -y
sudo nano /etc/fail2ban/jail.local
```
粘贴：
```
[DEFAULT]
bantime  = 3600
findtime = 600
maxretry = 5
ignoreip = 127.0.0.1/8 ::1

[sshd]
enabled = true
port    = 60022
backend = systemd
```
💡 含义：「10 分钟内失败 5 次 → 封禁 1 小时」

#### 启动 + 验证

```
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

#### ⚠️ 动态 IP 用户：放宽参数

如果你在多地登录、IP 经常变化，**不要用 ignoreip 白名单**——改用更宽松的参数避免误封自己：
```
[sshd]
enabled  = true
port     = 60022
backend  = systemd
maxretry = 10
findtime = 300
bantime  = 600
```

#### 万一锁了自己怎么办

云服务器的优势：**有控制台救援通道**。
🛠️ 阿里云：`实例 → 远程连接 → Workbench / VNC` —— 这条通道**绕过 SSH 独立工作**，fail2ban 封不到。
进去后：
```
sudo fail2ban-client unban --all
```
🟢 30 秒救援完成。

### P2.3 OS 防火墙 ufw（可选）

#### 是否需要

你已经有**云厂商安全组**这一层防火墙了。ufw 是 OS 侧的**第二层**。
<table>
  <thead><tr><th>你的情况</th><th>建议</th></tr></thead>
  <tbody>
    <tr><td>学习目的、想完整体验</td><td>🟢 做</td></tr>
    <tr><td>极简主义、够用就好</td><td>🟡 跳过</td></tr>
    <tr><td>担心安全组被误删</td><td>🟢 做</td></tr>
    <tr><td>计划本机跑很多服务</td><td>🟢 做</td></tr>
  </tbody>
</table>

#### 安装步骤（严格按顺序，否则锁外面）

```
# Step 1: 先放行新端口！
sudo ufw allow 60022/tcp comment 'SSH'

# Step 2: 检查
sudo ufw show added

# Step 3: 设置默认策略
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Step 4: 启用（会提示风险）
sudo ufw enable

# Step 5: 验证
sudo ufw status verbose
```
❗ 启用前**必须**先放行新端口，否则会断开自己。

---

## 🐞 踩坑合集

按"现象 → 真因 → 解决"排列：
<table>
  <thead><tr><th>现象</th><th>真因</th><th>解决</th></tr></thead>
  <tbody>
    <tr><td>改了 `Port` 但 sshd 还是听 22</td><td>Ubuntu socket activation</td><td>`disable ssh.socket` · `enable ssh.service`</td></tr>
    <tr><td>用密钥登不上，`Permission denied (publickey)`</td><td>`.ssh` 或 `authorized_keys` 权限错</td><td>`chmod 700 .ssh && chmod 600 authorized_keys && chown -R user:user ~/.ssh`</td></tr>
    <tr><td>改完 sshd 重启就连不上</td><td>端口没在云安全组放行</td><td>控制台**先放行再**重启 sshd</td></tr>
    <tr><td>`adduser` 卡死无响应</td><td>被 `Ctrl+Z` 挂起了</td><td>`jobs` → `kill %1` → `passwd 重设`</td></tr>
    <tr><td>客户端显示能连 22，服务器查不到监听</td><td>客户端 UI 缓存</td><td>信服务器端 `ss -tlnp` 的输出</td></tr>
    <tr><td>ping 首包 70ms 后续 30ms</td><td>ARP / 路由首次建立</td><td>正常现象，不是问题</td></tr>
    <tr><td>改完 IP 白名单后被锁外面</td><td>家庭 IP 动态变了</td><td>控制台改回 `0.0.0.0/0`，靠端口+密钥防御</td></tr>
    <tr><td>装完 fail2ban 误封自己</td><td>maxretry 太严</td><td>放宽参数 或 Workbench 救援后 unban</td></tr>
    <tr><td>kill 旧 sshd 后又有遗留进程</td><td>ssh.socket 还在 enable 状态</td><td>`disable --now ssh.socket` 再 kill</td></tr>
  </tbody>
</table>

### 💡 排雷思路（记住一辈子用得上）

凡是"客户端说能 / 不能，但服务器端看到的不一样"——**信服务器端**。
机制信仰排序：
```
kernel 状态 > 系统命令输出 > 服务端日志 > 客户端日志 > 客户端 UI 显示
```
`ss -tlnp` 读的是内核 socket 表，是**事实**。客户端 UI 缓存什么的都是表象。

---

## ✅ 加固完成验收清单

服务器上跑：
```
# 监听端口
sudo ss -tlnp | grep ssh
# → 只看到新端口，没 22

# 服务状态
sudo systemctl is-active ssh.service unattended-upgrades fail2ban
# → 都是 active（ufw 可选）

# socket activation 状态
sudo systemctl is-enabled ssh.socket
# → disabled

# sshd 关键配置
sudo grep -E "^(Port|PermitRootLogin|PasswordAuthentication|PubkeyAuthentication)" /etc/ssh/sshd_config
# → 应该看到全部四行正确
```
云厂商控制台核对：

  - <input type="checkbox" disabled> 仅保留新端口入方向规则
  - <input type="checkbox" disabled> 旧的 22 / 3389 / 其他默认端口已删
  - <input type="checkbox" disabled> ICMP 视需保留

客户端验证：

  - <input type="checkbox" disabled> 用密码登（应失败：`Permission denied`）
  - <input type="checkbox" disabled> 用 root 登（应失败：`Permission denied`）
  - <input type="checkbox" disabled> 用 dev + 密钥 + 新端口（应成功）

---

## 🧠 进阶心法

### 安全是分层的，不是单点的

不要追求"一个完美的防御"。追求**多层 OK 的防御**。任一层被突破，剩下的还能挡。
```
密钥被偷？还有 passphrase
passphrase 被试出来？还要登对端口
端口被找到？还有 fail2ban
fail2ban 失效？还有禁 root + 禁密码
全失败？还有云控制台 Workbench 救援
```

### 够用就好，别追求"最优解"

完美主义最大的成本不是钱，是**注意力**。
<table>
  <thead><tr><th>状态</th><th>收益</th></tr></thead>
  <tbody>
    <tr><td>0 → 60% 加固</td><td>**巨大**（挡住 95% 攻击）</td></tr>
    <tr><td>60% → 90% 加固</td><td>中等（挡住额外 4% 攻击）</td></tr>
    <tr><td>90% → 100% 加固</td><td>微小（最后 1%，可能耗你 10 倍时间）</td></tr>
  </tbody>
</table>
**做到 90% 就停**。剩下 10% 用时间和经验慢慢补。

### 公网 IP 不是秘密

公网 IP 的设计就是**让全世界都能找到**。别人知道你的 IP **不等于**能进来。Shodan、Censys 这类引擎每天扫一遍全球 IPv4，你的 IP 早就在公开数据库里了。
真正的保护**不是藏 IP**，是让"IP 被找到"这件事变成**无害**的事——这正是本指南做的事。

### 动态 IP 用户特别提醒

如果你经常换地点登录（咖啡馆、4G、出差），**不要用 IP 白名单**。改用：

  - 安全组放 `0.0.0.0/0`（依赖端口+密钥防御）
  - fail2ban 用宽松参数避免误封
  - 知道 Workbench 救援路径

### 装服务时的黄金原则

> **任何监听网络的服务，第一选择是 `127.0.0.1`，不是 `0.0.0.0`**

```
# ❌ 不安全：监听所有网卡，公网可达
redis-server --bind 0.0.0.0

# ✔ 安全：只监听本机，外部进不来
redis-server --bind 127.0.0.1
```
这一条**比装防火墙更根本**——从源头消除暴露，而不是事后补救。

---

## 🎯 总结

新服务器加固 = **用最小特权身份 + 非标端口 + 仅密钥 + 网络层先收紧**，过程中**永远留一条回退通道**。
完成后你拥有：

  - ✅ 4 层防御（网络 / 传输 / 协议 / 身份）
  - ✅ 长期韧性（自动补丁 + 行为兜底）
  - ✅ 救援通道（云厂商 Workbench）

剩下的事就是**用得开心**。

---

<aside>
🌸 本文是一次真实的服务器加固实战回顾，结构沿用 P0 / P1 / P2 心智模型。如果对你有用，欢迎收藏；如果发现错漏，欢迎指正。
</aside>
