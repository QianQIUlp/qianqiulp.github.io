---
title: "新服务器加固的三阶段心智模型：从「关门」到「装监控」"
date: 2026-05-20
tags: [Security, Tech]
description: "新 Linux 服务器加固实战，按 P0 / P1 / P2 梳理安全组、SSH、自动更新和 fail2ban。"
ogImage: /assets/posts/linux-security-setup/cover.png
ogImageAlt: "新 Linux 服务器加固文章封面"
license: "CC BY-NC 4.0"
---

<aside>
  <p>📖 <strong>关于这篇文章</strong></p>
  <p>这是一份新 Linux 服务器加固的实战手册，30 分钟可走完。沿用 <strong>P0 / P1 / P2</strong> 三阶段心智模型——<strong>不只告诉你敲什么命令，更告诉你为什么这么做</strong>。</p>
  <p><strong>适合谁读</strong></p>
  <ul>
    <li>刚拿到一台新 VPS、想尽快收紧默认配置的人</li>
    <li>想理解服务器安全<strong>分层防御</strong>思路而不只是抄命令的人</li>
    <li>用云服务器搞个人项目 / 学习 / 单用户开发，但不想成为安全专家的人</li>
  </ul>
  <p><strong>怎么读这篇文章</strong></p>
  <ul>
    <li><strong>第一次部署</strong> → 顺着 P0 → P1 → P2 一节节做下来</li>
    <li><strong>只想要核心</strong> → 做完 P0 + P1 就有四层防御，P2 是长期保险</li>
    <li><strong>出问题</strong> → 先看 踩坑合集 的表格，再回头对照具体章节</li>
    <li><strong>想理解原理</strong> → 看 进阶心法</li>
  </ul>
  <p><strong>版权与声明</strong></p>
  <p>本文为个人实操笔记整理而成，仅供学习与参考。其中涉及的系统配置请结合自己的环境评估，并对自己的运维行为负责。</p>
  <p><strong>首发与转载</strong></p>
  <ul>
    <li>原文首发：<a href="https://qianqiulp.notion.site/qiu">新服务器加固的三阶段心智模型</a>（Notion 公开页）</li>
    <li>本文采用 <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh">CC BY-NC 4.0</a> 协议发布——允许非商业转载与改编，转载请<strong>保留作者署名</strong>与<strong>首发链接</strong>，<strong>禁止商业用途</strong>。</li>
  </ul>
</aside>

<aside>
  <p>🛡️ 拿到新 Linux 服务器后，<strong>30 分钟搞定核心安全加固</strong>。这是一份<strong>实战手册 + 心智模型</strong>——不只告诉你敲什么命令，更告诉你<strong>为什么这么做</strong>。</p>
</aside>

<hr>

## 为什么要做这件事

<p>云厂商交付的新服务器，<strong>默认配置是"为开机即用，不为安全"</strong>：</p>
<ul>
  <li>root 可以远程登录</li>
  <li>密码登录开启</li>
  <li>SSH 监听标准端口 22</li>
  <li>没有任何登录失败防护</li>
  <li>安全补丁需要手动打</li>
</ul>
<p>只要公网 IP 暴露<strong>几小时</strong>，就会被全球扫描器命中。常见后果：</p>
<ul>
  <li>🔴 几千次/天的自动化爆破尝试</li>
  <li>🔴 弱密码服务器<strong>几天内被攻陷</strong></li>
  <li>🔴 被攻陷后：当矿池节点、DDoS 跳板、被勒索</li>
</ul>
<p>🟢 好消息：<strong>做对几件事就能挡住 99% 的攻击</strong>。这份手册是给"想用好一台 VPS、但不想成为安全专家"的人。</p>

### 适用人群

<ul>
  <li>✅ <strong>适用</strong>：个人 VPS、学习用机、单用户开发服务器</li>
  <li>❌ <strong>不适用</strong>：生产环境多用户系统、有合规要求的企业部署（那需要更专业的方案）</li>
</ul>

<hr>

## 三阶段心智模型

<p>把所有安全措施按<strong>目的 + 时间维度</strong>分成三层：</p>
<table>
  <thead><tr><th>阶段</th><th>防什么</th><th>时间维度</th><th>类比</th></tr></thead>
  <tbody>
    <tr><td><strong>P0</strong></td><td>默认弱配置</td><td>现在</td><td>把门关上</td></tr>
    <tr><td><strong>P1</strong></td><td>直接的网络/协议攻击</td><td>现在</td><td>换防盗门 + 装猫眼</td></tr>
    <tr><td><strong>P2</strong></td><td><strong>长期运行衰减</strong></td><td>未来</td><td>装监控 + 自动报警</td></tr>
  </tbody>
</table>

### 🔑 关键认知

<ul>
  <li><strong>P0 / P1</strong> 是 <em>preventive</em>（防止进入）</li>
  <li><strong>P2</strong> 是 <em>resilient</em>（长期韧性）</li>
</ul>
<p>跳过 P2 → 短期没事，但<strong>未来某天有新漏洞、配置漂移时</strong>你没保险。</p>
<p>跳过 P0 / P1 → <strong>现在</strong>就已经在裸奔。</p>

### 三阶段分别做什么

<table>
  <thead><tr><th>阶段</th><th>工具</th><th>防的是</th></tr></thead>
  <tbody>
    <tr><td><strong>P0</strong></td><td>收紧安全组 / 系统更新 / 创建用户</td><td>出厂默认值</td></tr>
    <tr><td><strong>P1</strong></td><td>密钥登录 / 改端口 / 禁 root + 禁密码</td><td>直接的协议层攻击</td></tr>
    <tr><td><strong>P2</strong></td><td>自动安全更新 / fail2ban / ufw（可选）</td><td>未来漏洞、配置漂移、应用泄露</td></tr>
  </tbody>
</table>

<hr>

## 核心原则（4 条铁律）

<aside>
  <p>⚠️ 在敲任何命令前，把这四条内化：</p>
  <ol>
    <li><strong>永远保持当前会话开着，再开新会话验证</strong> —— 改坏了能用老会话救命</li>
    <li><strong>先建后拆</strong>（新端口先放行再删旧的） —— 任何"删除"都是单向，要可回退</li>
    <li><strong>每步都有验证点</strong> —— 不验证就往下走 = 在叠 bug</li>
    <li><strong>最小化变更</strong>：只动需要动的，其他不碰 —— 副作用面 = 你以后排障的成本</li>
  </ol>
</aside>

<hr>

## P0 · 基础准备

### P0.1 立刻在云厂商控制台收紧安全组

<p>🛠️ 控制台路径：<code>实例 → 安全组 → 入方向规则</code></p>
<p>默认通常会开三个端口给整个互联网：</p>
<ul>
  <li><code>22 (SSH)</code> 来源 <code>0.0.0.0/0</code></li>
  <li><code>3389 (RDP)</code> 来源 <code>0.0.0.0/0</code></li>
  <li><code>ICMP</code> 来源 <code>0.0.0.0/0</code></li>
</ul>
<p><strong>立刻</strong>做：</p>
<ol>
  <li>把 <code>22</code> 的来源改为<strong>你家庭公网 IP</strong>（查询：<code>curl ifconfig.me</code> 或访问 <a href="http://ipinfo.io">ipinfo.io</a>）</li>
  <li><strong>删除 <code>3389</code></strong>（你不是 Windows 不需要）</li>
  <li><code>ICMP</code> 可保留方便 ping 排障</li>
</ol>
<p>✅ <strong>验证</strong>：用手机 4G 流量试连 SSH → 应该连不上（说明白名单生效）</p>

### P0.2 升级系统打补丁

<p>用云厂商提供的初始凭证（通常是 root + 密码）登入：</p>
<pre><code>sudo apt update && sudo apt upgrade -y</code></pre>
<p>❗ 这步<strong>必须做</strong>。新机器经常带着已知漏洞。</p>

### P0.3 创建普通用户

<p>直接用 root 是大忌。创建一个普通用户：</p>
<pre><code>adduser dev              # 用你喜欢的名字，避开 admin/user/test
usermod -aG sudo dev     # 加 sudo 组</code></pre>
<p>💡 <strong>命名提醒</strong>：用一个<strong>不在常见用户名字典</strong>里的名字（不要叫 admin、user、root2 这种）。攻击者扫描时会优先尝试这些常见名字。</p>
<aside>
  <p>⚠️ <strong>常见坑</strong>：<code>adduser</code> 是交互式的，中途按到 <code>Ctrl+Z</code> 会挂起、密码不被设上。出问题就：</p>
  <pre><code>jobs              # 看有没有 Stopped
kill %1           # 杀掉挂起的 adduser
passwd dev        # 单独重设密码</code></pre>
</aside>
<p>✅ <strong>验证</strong>：<code>su - dev</code> 能进 → <code>whoami</code> 显示 <code>dev</code> → <code>sudo -v</code> 能升权</p>

<hr>

## P1 · 核心加固

<blockquote>
  <p>这是最关键的阶段。做完 P1 你就拥有了<strong>四层防御</strong>的前三层。</p>
</blockquote>

### P1.1 配置 SSH 密钥登录

#### 在客户端生成密钥

<p><strong>类型选 ED25519</strong>（不要用 RSA 2048，已不推荐）。</p>
<ul>
  <li>macOS / Linux: <code>ssh-keygen -t ed25519 -C "your_comment"</code></li>
  <li>Windows: Termius / PuTTY / VS Code 图形界面生成</li>
  <li>移动端: Termius</li>
</ul>
<p>🔑 <strong>强烈推荐设 passphrase</strong>——即使密钥被偷也能多挡一层。</p>

#### 把公钥贴到服务器

<p>在服务器上切到普通用户：</p>
<pre><code>su - dev
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys      # 粘贴一行公钥
chmod 600 ~/.ssh/authorized_keys</code></pre>
<aside>
  <p>⚠️ <strong>权限必须正确</strong>，否则 sshd 拒绝使用密钥还<strong>不告诉你为什么</strong>：</p>
  <table>
    <thead><tr><th>文件</th><th>权限</th></tr></thead>
    <tbody>
      <tr><td><code>~/.ssh</code></td><td><code>700</code> (drwx------)</td></tr>
      <tr><td><code>~/.ssh/authorized_keys</code></td><td><code>600</code> (-rw-------)</td></tr>
    </tbody>
  </table>
  <p>所有者必须是普通用户自己，<strong>不是 root</strong>。</p>
</aside>

#### 用新会话测试

<p>❗ <strong>不要关 root 会话</strong>。新建/复制一个客户端 Host：</p>
<ul>
  <li>用户名: <code>dev</code></li>
  <li>密码: 留空</li>
  <li>关联生成的密钥</li>
</ul>
<p>✅ 能登入 → <code>whoami</code> 显示 <code>dev</code> → <code>sudo -v</code> 工作 → <strong>才能进 P1.2</strong></p>

### P1.2 改 SSH 端口避开扫描

<p>把 SSH 从标准 22 改到一个不显眼的端口。</p>

#### 选端口

<ul>
  <li>范围：10000–65535</li>
  <li>验证没被占用：<code>sudo ss -tlnp | grep &lt;端口&gt;</code> → 空 = 可用</li>
  <li>本文示例用 <strong>60022</strong>（请你自己选一个不同的，避免大家都用一样的）</li>
</ul>

#### 控制台先放行新端口

<p>🛠️ 安全组新增入方向规则：</p>
<ul>
  <li>端口：<code>60022</code></li>
  <li>来源：和 <code>22</code> 那条一样（家庭 IP 白名单 或 <code>0.0.0.0/0</code>）</li>
  <li>描述：<code>SSH-new-port</code></li>
</ul>
<p>❗ <strong>保留旧 <code>22</code> 规则</strong>，<strong>不要删</strong>——先建后拆。</p>

### P1.3 加固 sshd 配置

<pre><code>sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
sudo nano /etc/ssh/sshd_config</code></pre>
<p>确认以下四行<strong>存在且没有 <code>#</code></strong>：</p>
<pre><code>Port 60022
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes</code></pre>
<p>每条的含义：</p>
<table>
  <thead><tr><th>配置</th><th>含义</th></tr></thead>
  <tbody>
    <tr><td><code>Port 60022</code></td><td>监听新端口</td></tr>
    <tr><td><code>PermitRootLogin no</code></td><td>禁止 root 直接 SSH 登录</td></tr>
    <tr><td><code>PasswordAuthentication no</code></td><td>禁止密码登录（<strong>必须先确认密钥能用</strong>！）</td></tr>
    <tr><td><code>PubkeyAuthentication yes</code></td><td>允许密钥登录</td></tr>
  </tbody>
</table>
<p>验证语法正确：</p>
<pre><code>sudo sshd -t        # 没输出 = OK，有错就显示哪行</code></pre>

### P1.4 处理 Ubuntu socket activation 坑（24.04+ 必看）

<aside>
  <p>🪤 Ubuntu 22.04 之后默认用 <strong>systemd socket activation</strong> 管理 SSH。<strong>光改 sshd_config 的 Port 不会生效</strong>——这是最容易踩的坑。</p>
</aside>

#### 怎么判断你踩到了

<pre><code>sudo systemctl status ssh.socket</code></pre>
<p>如果 <code>Active: active</code> → 中招了。<code>ssh.socket</code> 写死了监听 22，会忽略 <code>sshd_config</code> 的 <code>Port</code>。</p>

#### 解决：切换到传统服务模式

<pre><code>sudo systemctl disable --now ssh.socket
sudo systemctl enable --now ssh.service</code></pre>

#### 处理可能的遗留 sshd 进程

<pre><code>sudo ss -tlnp | grep ssh</code></pre>
<p>如果还看到 22 端口在监听（PID 是个旧的）：</p>
<pre><code>sudo kill &lt;旧PID&gt;</code></pre>
<p>✅ <strong>最终状态</strong>：<code>ss -tlnp</code> 只显示新端口，22 完全消失。</p>

#### 客户端测试新端口

<p>复制刚才的 dev Host → 改端口为 <code>60022</code> → 新开连接。</p>
<p>能连 = <strong>完成</strong> ✔</p>

### P1.5 收尾清理

<p>确认新端口能稳定登录后：</p>
<ol>
  <li>🛠️ 控制台<strong>删除</strong>旧的 <code>22</code> 安全组规则</li>
  <li>客户端<strong>删除</strong>旧的 <code>root + 密码 + 22</code> Host 配置</li>
  <li><code>sshd_config.bak</code> 备份<strong>保留 24 小时</strong>，确认无异常后再删</li>
</ol>

<hr>

## 📊 P1 完成后的"四层防御"

<table>
  <thead><tr><th>层</th><th>控制</th><th>状态</th></tr></thead>
  <tbody>
    <tr><td><strong>网络层</strong></td><td>防火墙 / 安全组</td><td>✔ 仅放行新端口</td></tr>
    <tr><td><strong>传输层</strong></td><td>端口选择</td><td>✔ 避开扫描器热点</td></tr>
    <tr><td><strong>协议层</strong></td><td>sshd 配置</td><td>✔ 禁 root、禁密码、强制密钥</td></tr>
    <tr><td><strong>身份层</strong></td><td>密钥</td><td>✔ ED25519 + passphrase</td></tr>
  </tbody>
</table>
<p>任一层被突破，下面还有三层 → <strong>defense in depth</strong>。</p>

<hr>

## P2 · 长期韧性

<blockquote>
  <p>P1 完成后你已经"现在安全"了。P2 是让你<strong>长期保持安全</strong>。</p>
</blockquote>

### P2.1 自动安全更新（unattended-upgrades）

<p>很多 Ubuntu 系统<strong>默认已经装</strong>，但要验证配置正确：</p>
<pre><code>sudo systemctl status unattended-upgrades
sudo cat /etc/apt/apt.conf.d/20auto-upgrades</code></pre>
<p>期望看到：</p>
<pre><code>APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";</code></pre>
<p>如果是 <code>"0"</code> 或文件不存在：</p>
<pre><code>sudo dpkg-reconfigure -plow unattended-upgrades
# 弹出对话框选 Yes</code></pre>
<p>看日志确认在工作：</p>
<pre><code>sudo cat /var/log/unattended-upgrades/unattended-upgrades.log | tail -20</code></pre>

### P2.2 自动封禁爆破 IP（fail2ban）

#### 它做什么

<p>监控 SSH 失败登录，达到阈值就<strong>自动用防火墙规则封禁来源 IP</strong>。</p>
<aside>
  <p>🤔 <strong>诚实说</strong>：如果你已经按 P1 配了<strong>仅密钥登录</strong>，fail2ban 的<strong>直接安全收益很小</strong>——密码爆破对你本来就 100% 失败。它的真实价值是：</p>
  <ul>
    <li><strong>日志卫生</strong>：扫描尝试被快速封掉，<code>auth.log</code> 不再被淹没</li>
    <li><strong>配置漂移保险</strong>：万一某天误把密码登录开回来，仍有兜底</li>
    <li><strong>资源节省</strong>：减少握手开销</li>
  </ul>
  <p>🟡 是否安装由你的偏好决定（精简党可跳过，强迫症推荐装）。</p>
</aside>

#### 安装

<pre><code>sudo apt install fail2ban -y
sudo nano /etc/fail2ban/jail.local</code></pre>
<p>粘贴：</p>
<pre><code>[DEFAULT]
bantime  = 3600
findtime = 600
maxretry = 5
ignoreip = 127.0.0.1/8 ::1

[sshd]
enabled = true
port    = 60022
backend = systemd</code></pre>
<p>💡 含义：「10 分钟内失败 5 次 → 封禁 1 小时」</p>

#### 启动 + 验证

<pre><code>sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd</code></pre>

#### ⚠️ 动态 IP 用户：放宽参数

<p>如果你在多地登录、IP 经常变化，<strong>不要用 ignoreip 白名单</strong>——改用更宽松的参数避免误封自己：</p>
<pre><code>[sshd]
enabled  = true
port     = 60022
backend  = systemd
maxretry = 10
findtime = 300
bantime  = 600</code></pre>

#### 万一锁了自己怎么办

<p>云服务器的优势：<strong>有控制台救援通道</strong>。</p>
<p>🛠️ 阿里云：<code>实例 → 远程连接 → Workbench / VNC</code> —— 这条通道<strong>绕过 SSH 独立工作</strong>，fail2ban 封不到。</p>
<p>进去后：</p>
<pre><code>sudo fail2ban-client unban --all</code></pre>
<p>🟢 30 秒救援完成。</p>

### P2.3 OS 防火墙 ufw（可选）

#### 是否需要

<p>你已经有<strong>云厂商安全组</strong>这一层防火墙了。ufw 是 OS 侧的<strong>第二层</strong>。</p>
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

<pre><code># Step 1: 先放行新端口！
sudo ufw allow 60022/tcp comment 'SSH'

# Step 2: 检查
sudo ufw show added

# Step 3: 设置默认策略
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Step 4: 启用（会提示风险）
sudo ufw enable

# Step 5: 验证
sudo ufw status verbose</code></pre>
<p>❗ 启用前<strong>必须</strong>先放行新端口，否则会断开自己。</p>

<hr>

## 🐞 踩坑合集

<p>按"现象 → 真因 → 解决"排列：</p>
<table>
  <thead><tr><th>现象</th><th>真因</th><th>解决</th></tr></thead>
  <tbody>
    <tr><td>改了 <code>Port</code> 但 sshd 还是听 22</td><td>Ubuntu socket activation</td><td><code>disable ssh.socket</code> · <code>enable ssh.service</code></td></tr>
    <tr><td>用密钥登不上，<code>Permission denied (publickey)</code></td><td><code>.ssh</code> 或 <code>authorized_keys</code> 权限错</td><td><code>chmod 700 .ssh && chmod 600 authorized_keys && chown -R user:user ~/.ssh</code></td></tr>
    <tr><td>改完 sshd 重启就连不上</td><td>端口没在云安全组放行</td><td>控制台<strong>先放行再</strong>重启 sshd</td></tr>
    <tr><td><code>adduser</code> 卡死无响应</td><td>被 <code>Ctrl+Z</code> 挂起了</td><td><code>jobs</code> → <code>kill %1</code> → <code>passwd 重设</code></td></tr>
    <tr><td>客户端显示能连 22，服务器查不到监听</td><td>客户端 UI 缓存</td><td>信服务器端 <code>ss -tlnp</code> 的输出</td></tr>
    <tr><td>ping 首包 70ms 后续 30ms</td><td>ARP / 路由首次建立</td><td>正常现象，不是问题</td></tr>
    <tr><td>改完 IP 白名单后被锁外面</td><td>家庭 IP 动态变了</td><td>控制台改回 <code>0.0.0.0/0</code>，靠端口+密钥防御</td></tr>
    <tr><td>装完 fail2ban 误封自己</td><td>maxretry 太严</td><td>放宽参数 或 Workbench 救援后 unban</td></tr>
    <tr><td>kill 旧 sshd 后又有遗留进程</td><td>ssh.socket 还在 enable 状态</td><td><code>disable --now ssh.socket</code> 再 kill</td></tr>
  </tbody>
</table>

### 💡 排雷思路（记住一辈子用得上）

<p>凡是"客户端说能 / 不能，但服务器端看到的不一样"——<strong>信服务器端</strong>。</p>
<p>机制信仰排序：</p>
<pre><code>kernel 状态 > 系统命令输出 > 服务端日志 > 客户端日志 > 客户端 UI 显示</code></pre>
<p><code>ss -tlnp</code> 读的是内核 socket 表，是<strong>事实</strong>。客户端 UI 缓存什么的都是表象。</p>

<hr>

## ✅ 加固完成验收清单

<p>服务器上跑：</p>
<pre><code># 监听端口
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
# → 应该看到全部四行正确</code></pre>
<p>云厂商控制台核对：</p>
<ul>
  <li><input type="checkbox" disabled> 仅保留新端口入方向规则</li>
  <li><input type="checkbox" disabled> 旧的 22 / 3389 / 其他默认端口已删</li>
  <li><input type="checkbox" disabled> ICMP 视需保留</li>
</ul>
<p>客户端验证：</p>
<ul>
  <li><input type="checkbox" disabled> 用密码登（应失败：<code>Permission denied</code>）</li>
  <li><input type="checkbox" disabled> 用 root 登（应失败：<code>Permission denied</code>）</li>
  <li><input type="checkbox" disabled> 用 dev + 密钥 + 新端口（应成功）</li>
</ul>

<hr>

## 🧠 进阶心法

### 安全是分层的，不是单点的

<p>不要追求"一个完美的防御"。追求<strong>多层 OK 的防御</strong>。任一层被突破，剩下的还能挡。</p>
<pre><code>密钥被偷？还有 passphrase
passphrase 被试出来？还要登对端口
端口被找到？还有 fail2ban
fail2ban 失效？还有禁 root + 禁密码
全失败？还有云控制台 Workbench 救援</code></pre>

### 够用就好，别追求"最优解"

<p>完美主义最大的成本不是钱，是<strong>注意力</strong>。</p>
<table>
  <thead><tr><th>状态</th><th>收益</th></tr></thead>
  <tbody>
    <tr><td>0 → 60% 加固</td><td><strong>巨大</strong>（挡住 95% 攻击）</td></tr>
    <tr><td>60% → 90% 加固</td><td>中等（挡住额外 4% 攻击）</td></tr>
    <tr><td>90% → 100% 加固</td><td>微小（最后 1%，可能耗你 10 倍时间）</td></tr>
  </tbody>
</table>
<p><strong>做到 90% 就停</strong>。剩下 10% 用时间和经验慢慢补。</p>

### 公网 IP 不是秘密

<p>公网 IP 的设计就是<strong>让全世界都能找到</strong>。别人知道你的 IP <strong>不等于</strong>能进来。Shodan、Censys 这类引擎每天扫一遍全球 IPv4，你的 IP 早就在公开数据库里了。</p>
<p>真正的保护<strong>不是藏 IP</strong>，是让"IP 被找到"这件事变成<strong>无害</strong>的事——这正是本指南做的事。</p>

### 动态 IP 用户特别提醒

<p>如果你经常换地点登录（咖啡馆、4G、出差），<strong>不要用 IP 白名单</strong>。改用：</p>
<ul>
  <li>安全组放 <code>0.0.0.0/0</code>（依赖端口+密钥防御）</li>
  <li>fail2ban 用宽松参数避免误封</li>
  <li>知道 Workbench 救援路径</li>
</ul>

### 装服务时的黄金原则

<blockquote>
  <p><strong>任何监听网络的服务，第一选择是 <code>127.0.0.1</code>，不是 <code>0.0.0.0</code></strong></p>
</blockquote>
<pre><code># ❌ 不安全：监听所有网卡，公网可达
redis-server --bind 0.0.0.0

# ✔ 安全：只监听本机，外部进不来
redis-server --bind 127.0.0.1</code></pre>
<p>这一条<strong>比装防火墙更根本</strong>——从源头消除暴露，而不是事后补救。</p>

<hr>

## 🎯 总结

<p>新服务器加固 = <strong>用最小特权身份 + 非标端口 + 仅密钥 + 网络层先收紧</strong>，过程中<strong>永远留一条回退通道</strong>。</p>
<p>完成后你拥有：</p>
<ul>
  <li>✅ 4 层防御（网络 / 传输 / 协议 / 身份）</li>
  <li>✅ 长期韧性（自动补丁 + 行为兜底）</li>
  <li>✅ 救援通道（云厂商 Workbench）</li>
</ul>
<p>剩下的事就是<strong>用得开心</strong>。</p>

<hr>

<aside>
  <p>🌸 本文是一次真实的服务器加固实战回顾，结构沿用 P0 / P1 / P2 心智模型。如果对你有用，欢迎收藏；如果发现错漏，欢迎指正。</p>
</aside>