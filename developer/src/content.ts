export type Locale = 'en' | 'zh';

type Project = {
  key: string;
  name: string;
  tier: string;
  status: string;
  type: string;
  summary: string;
  audience: string;
  decision: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

type Principle = {
  title: string;
  body: string;
};

type Writing = {
  date: string;
  title: string;
  description: string;
  href: string;
};

export type DeveloperCopy = {
  meta: { title: string; description: string; image: string; imageAlt: string };
  skip: string;
  brandAria: string;
  navAria: string;
  nav: { work: string; studio: string; approach: string; writing: string; contact: string };
  languageLabel: string;
  languageAria: string;
  themeAria: string;
  day: string;
  night: string;
  interaction: {
    projectIndex: string;
    inspect: string;
    evidenceTitle: string;
    evidenceCaption: string;
    close: string;
    actualSize: string;
    fitImage: string;
    details: string;
    audience: string;
    decision: string;
    copyEmail: string;
    copied: string;
    copyFailed: string;
  };
  hero: {
    eyebrow: string;
    studio: string;
    studioLead: string;
    headline: string;
    body: string;
    workAction: string;
    githubAction: string;
    personalAction: string;
    nowLabel: string;
    nowProject: string;
    nowStatus: string;
    nowBody: string;
    nowEvidence: string;
  };
  work: {
    eyebrow: string;
    title: string;
    lead: string;
    featuredTier: string;
    featuredAudience: string;
    featuredLabel: string;
    featuredTitle: string;
    featuredBody: string;
    featuredBoundary: string;
    featuredProduct: string;
    featuredSource: string;
    image: string;
    imageHeight: number;
    imageAlt: string;
    listAria: string;
  };
  projects: Project[];
  studio: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    facts: { term: string; detail: string; href?: string; linkLabel?: string }[];
    factsAria: string;
  };
  approach: { eyebrow: string; title: string; lead: string; principles: Principle[] };
  writing: { eyebrow: string; title: string; lead: string; items: Writing[]; action: string };
  personal: { eyebrow: string; title: string; body: string; action: string; image: string; imageAlt: string };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    emailLabel: string;
    githubLabel: string;
  };
  footer: string;
};

const links = {
  github: 'https://github.com/QianQIUlp',
  verisilo: 'https://verisilo.qiu.works',
  verisiloRepo: 'https://github.com/QianQIUlp/VeriSilo',
  mealCircuit: 'https://github.com/QianQIUlp/meal-circuit',
  crewlight: 'https://github.com/QianQIUlp/Crewlight',
  hadoop: 'https://github.com/QianQIUlp/docker-hadoop-cluster',
  personalEn: 'https://me.qiu.works/en/',
  personalZh: 'https://me.qiu.works/',
} as const;

export const copy: Record<Locale, DeveloperCopy> = {
  en: {
    meta: {
      title: 'Q Studio · Independent software studio by Qian Qiu',
      description: 'Q Studio is an independent, self-funded software studio founded and operated by Qian Qiu, building local-first and inspectable software including VeriSilo.',
      image: '/assets/og/developer-en.png',
      imageAlt: 'Q Studio by Qian Qiu — local-first software with explicit boundaries',
    },
    skip: 'Skip to main content',
    brandAria: 'Q Studio developer home',
    navAria: 'Primary navigation',
    nav: { work: 'Work', studio: 'Studio', approach: 'Approach', writing: 'Writing', contact: 'Contact' },
    languageLabel: '中文',
    languageAria: '切换到中文',
    themeAria: 'Switch color theme',
    day: 'Day',
    night: 'Night',
    interaction: {
      projectIndex: 'Project index',
      inspect: 'Look closer',
      evidenceTitle: 'Evidence, in view.',
      evidenceCaption: 'From the VeriSilo product site · a captured view, not a live audit.',
      close: 'Close evidence view',
      actualSize: 'View at full size',
      fitImage: 'Fit to view',
      details: 'Open file',
      audience: 'Who it is for',
      decision: 'A deliberate choice',
      copyEmail: 'Copy email',
      copied: 'Email copied.',
      copyFailed: 'Copy unavailable. Select the address above, or click it to email.',
    },
    hero: {
      eyebrow: 'Independent software studio',
      studio: 'Q Studio',
      studioLead: 'Founded and operated by Qian Qiu · CS student and indie developer',
      headline: 'Focused software with explicit boundaries.',
      body: 'An independent, self-funded studio building local-first, inspectable software. User-controlled data, clear capability boundaries, and systems others can reproduce.',
      workAction: 'View selected work',
      githubAction: 'GitHub',
      personalAction: 'Meet 千秋',
      nowLabel: 'Current focus',
      nowProject: 'VeriSilo',
      nowStatus: 'Public pre-release · v0.1.0-rc4',
      nowBody: 'Separate browser-owned state without pretending to change what ordinary browser software cannot control.',
      nowEvidence: 'A Windows x64 installer is available for download, alongside checksums, SBOMs, provenance, an open threat model, and explicit capability states.',
    },
    work: {
      eyebrow: 'Selected software',
      title: 'Evidence before adjectives.',
      lead: 'Each project starts with a concrete problem, keeps its boundary visible, and leaves behind something another person can inspect.',
      featuredTier: 'Primary · current product',
      featuredAudience: 'Built for individuals and technical users who need browser identities kept visibly separate.',
      featuredLabel: '01 · Current focus',
      featuredTitle: 'Browser state, visibly separated.',
      featuredBody: 'Every Silo launches Chrome or Edge with its own managed data directory. Cookies, storage, cache, service workers, permissions, and history stay inside that environment rather than the default profile.',
      featuredBoundary: 'The v0.1.0-rc4 installer is unsigned and remains a pre-release. VeriSilo does not claim device impersonation, fraud bypass, TLS or QUIC modification, hardware isolation, or undetectability.',
      featuredProduct: 'Visit product site',
      featuredSource: 'Inspect source',
      image: '/assets/evidence/verisilo-site-en.png',
      imageHeight: 710,
      imageAlt: 'VeriSilo evidence view comparing declared and observed configuration, marked Matched with the caveat that a match is not an unlimited guarantee',
      listAria: 'Other public software',
    },
    projects: [
      {
        key: 'meal-circuit',
        name: 'MealCircuit',
        tier: 'Public software',
        status: 'Available · v0.3.0',
        type: 'Local-first nutrition feedback workbench',
        summary: 'Connects meal photos, daily state, trends, and corrections into a feedback history that can improve the next decision.',
        audience: 'Built for individuals who want long-horizon diet feedback without handing their history to a cloud service.',
        decision: 'The application keeps facts, schemas, and correction history local, and v0.3.0 shares one encrypted data model with a native Android client. It does not call an external model API itself.',
        primaryLabel: 'GitHub repository',
        primaryHref: links.mealCircuit,
        secondaryLabel: 'Project notes',
        secondaryHref: `${links.personalEn}projects/#project-meal-circuit`,
      },
      {
        key: 'crewlight',
        name: 'Crewlight',
        tier: 'Public software',
        status: 'v0.5.0 released · Windows-first candidate',
        type: 'Local-first AI agent activity radar',
        summary: 'Brings running, waiting, permission-request, completed, and failed states from parallel Claude Code, Codex, and other tools into read-only Desktop, Companion, Dashboard, and CLI views.',
        audience: 'Built for developers running parallel AI coding agents who need to see which task needs attention.',
        decision: 'Windows x64 artifacts shipped as a pre-release and are unsigned; Linux and macOS publish no native binaries. Crewlight stores no prompts, transcripts, tool I/O, or complete platform payloads.',
        primaryLabel: 'GitHub repository',
        primaryHref: links.crewlight,
        secondaryLabel: 'Project notes',
        secondaryHref: `${links.personalEn}projects/#project-crewlight`,
      },
      {
        key: 'docker-hadoop-cluster',
        name: 'Hadoop Lab',
        tier: 'Teaching · not a product',
        status: 'Teaching · local experimentation',
        type: 'Repeatable local Hadoop laboratory',
        summary: 'Connects environment setup, service observation, MapReduce, and three-node failure and recovery into a guided learning path across seven labs.',
        audience: 'Built for classroom teaching, self-study, and local experimentation with Hadoop.',
        decision: 'A lifecycle CLI plus doctor, status, WordCount, safe reset, and redacted diagnostics keep the lab reproducible without presenting it as a production platform.',
        primaryLabel: 'GitHub repository',
        primaryHref: links.hadoop,
        secondaryLabel: 'Project notes',
        secondaryHref: `${links.personalEn}projects/#project-docker-hadoop-cluster`,
      },
    ],
    studio: {
      eyebrow: 'Studio',
      title: 'Q Studio, stated plainly.',
      lead: 'An independent, self-funded software studio founded and operated by Qian Qiu.',
      body: 'One studio, one founder, public evidence. Q Studio builds local-first and inspectable software: user data stays with the user, capability boundaries are written down, and setup and recovery can be repeated by someone else. The current focus is VeriSilo; Crewlight and MealCircuit are public, inspectable software; Hadoop Lab is a teaching lab, not a product.',
      facts: [
        { term: 'Studio', detail: 'Q Studio · independent software studio' },
        { term: 'Founder', detail: 'Qian Qiu' },
        { term: 'Model', detail: 'Independent · self-funded' },
        { term: 'Focus', detail: 'Local-first software · developer tools · inspectable privacy systems' },
        { term: 'Current focus', detail: 'VeriSilo', href: links.verisilo, linkLabel: 'Visit product site' },
        { term: 'Contact', detail: 'qstudio@qiu.works', href: 'mailto:qstudio@qiu.works', linkLabel: 'qstudio@qiu.works' },
        { term: 'Public source', detail: 'GitHub', href: links.github, linkLabel: 'github.com/QianQIUlp' },
      ],
      factsAria: 'Studio facts',
    },
    approach: {
      eyebrow: 'How I build',
      title: 'The boundary is part of the product.',
      lead: 'I am most interested in software that stays understandable after the first demo—where data lives, what changed, and what the tool refuses to promise.',
      principles: [
        { title: 'Local-first', body: 'Keep useful work and private state on the user’s machine by default.' },
        { title: 'Inspectable systems', body: 'Expose evidence, history, and capability state instead of hiding judgment behind a score.' },
        { title: 'Explicit boundaries', body: 'Say what the software does not solve before marketing fills in the blank.' },
        { title: 'Reproducible infrastructure', body: 'Turn setup and recovery into paths another person can repeat and verify.' },
        { title: 'User-controlled data', body: 'Prefer deliberate export, correction, and deletion over silent synchronization.' },
      ],
    },
    writing: {
      eyebrow: 'Selected writing',
      title: 'How the judgment gets made.',
      lead: 'Technical guides, model criticism, and a few rules I use to keep tools from deciding the work for me.',
      action: 'Read article',
      items: [
        {
          date: '2026/05/26',
          title: 'The Metacognitive Blind Spot of LLMs',
          description: 'Whether model self-correction is genuine doubt or another learned performance.',
          href: `${links.personalEn}blog/posts/2026-05-26-llm-metacog-blindspot/`,
        },
        {
          date: '2026/05/20',
          title: 'Hardening a New Linux Server',
          description: 'A practical path from closing unsafe defaults to maintaining a recoverable system.',
          href: `${links.personalEn}blog/posts/2026-05-20-linux-security-setup/`,
        },
        {
          date: '2026/06/18',
          title: 'I Do Not Owe a Resource One Use',
          description: 'Why unused capacity should not be allowed to invent work on my behalf.',
          href: `${links.personalEn}blog/posts/2026-06-18-resource-usage-rule/`,
        },
      ],
    },
    personal: {
      eyebrow: 'Beyond work · me.qiu.works',
      title: '千秋, beyond the studio.',
      body: 'The person behind Q Studio. Pick up my guitar, make a little music, turn a page, or leave a line. This is 千秋’s personal space.',
      action: 'Meet 千秋',
      image: '/assets/evidence/me-en.jpg',
      imageAlt: '千秋’s personal site with the Chinese name and a wine-red Potbelly guitar',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'A focused problem is a good place to start.',
      body: 'Open to product feedback, technical collaboration, and focused software work.',
      emailLabel: 'Email qstudio@qiu.works',
      githubLabel: 'Continue on GitHub',
    },
    footer: '© 2026 Q Studio · Founded and operated by Qian Qiu · Built as a static, inspectable site.',
  },
  zh: {
    meta: {
      title: 'Q Studio · 由 Qian Qiu 创建的独立软件工作室',
      description: 'Q Studio 是由 Qian Qiu 独立创建和运营的自筹软件工作室，构建本地优先、可检查的软件，包括已可下载的 VeriSilo 公开预发布版本。',
      image: '/assets/og/developer-zh.png',
      imageAlt: 'Q Studio by Qian Qiu —— 本地优先、边界清楚的软件',
    },
    skip: '跳到主要内容',
    brandAria: 'Q Studio 开发者主页',
    navAria: '主导航',
    nav: { work: '作品', studio: '工作室', approach: '方法', writing: '写作', contact: '联系' },
    languageLabel: 'EN',
    languageAria: 'Switch to English',
    themeAria: '切换深浅色模式',
    day: '昼',
    night: '夜',
    interaction: {
      projectIndex: '项目索引',
      inspect: '近看证据',
      evidenceTitle: '把证据放到眼前。',
      evidenceCaption: '取自 VeriSilo 产品网站 · 页面截图，并非实时审计。',
      close: '关闭证据视图',
      actualSize: '按原尺寸查看',
      fitImage: '适应视窗',
      details: '展开档案',
      audience: '为谁而做',
      decision: '一项设计取舍',
      copyEmail: '复制邮箱',
      copied: '邮箱已复制。',
      copyFailed: '暂时无法复制，请选中上方地址，或点击地址发送邮件。',
    },
    hero: {
      eyebrow: '独立软件工作室',
      studio: 'Q Studio',
      studioLead: '由 Qian Qiu 独立创建和运营 · 学生开发者与独立构建者',
      headline: '聚焦的软件，边界明确。',
      body: '一家独立、自筹的软件工作室。构建本地优先、可供检视的软件，让用户掌握数据，让能力边界清晰，让系统可以被他人复现。',
      workAction: '查看代表作品',
      githubAction: 'GitHub',
      personalAction: '认识千秋',
      nowLabel: '当前重点',
      nowProject: 'VeriSilo',
      nowStatus: '公开预发布 · v0.1.0-rc4',
      nowBody: '分开浏览器拥有的状态，同时不假装普通浏览器软件可以改变它无法控制的部分。',
      nowEvidence: 'Windows x64 安装包已开放下载，并附校验和、SBOM、provenance、公开的威胁模型与明确的能力状态。',
    },
    work: {
      eyebrow: '代表软件',
      title: '先给证据，再给形容词。',
      lead: '每个项目都从一个具体问题出发，保留可检查的边界，也留下别人能够打开、复现或继续接手的东西。',
      featuredTier: '主要 · 当前产品',
      featuredAudience: '面向需要把浏览器身份清楚分开的个人与技术用户。',
      featuredLabel: '01 · 当前重点',
      featuredTitle: '让浏览器状态真正分开，也让边界看得见。',
      featuredBody: '每个 Silo 都以独立、受管理的数据目录启动 Chrome 或 Edge。Cookie、存储、缓存、Service Worker、权限和历史记录留在自己的环境里，而不是默认 Profile。',
      featuredBoundary: 'v0.1.0-rc4 安装包未签名，且仍是预发布版本。VeriSilo 不承诺设备伪装、欺诈绕过、TLS/QUIC 修改、硬件隔离或不可检测性。',
      featuredProduct: '前往产品网站',
      featuredSource: '检查源代码',
      image: '/assets/evidence/verisilo-site-zh.png',
      imageHeight: 710,
      imageAlt: 'VeriSilo 证据视图对比配置声明与实测结果，状态为「匹配」，并注明一致并不代表对整个身份的无限保证',
      listAria: '其他公开软件',
    },
    projects: [
      {
        key: 'meal-circuit',
        name: 'MealCircuit',
        tier: '公开软件',
        status: '可用 · v0.3.0',
        type: '本地优先饮食反馈工作台',
        summary: '把餐食照片、每日状态、趋势和纠错接进一段会累积的反馈历史，让下一次判断不必重新猜。',
        audience: '面向希望保留长期饮食反馈、但不把历史交给云服务的个人。',
        decision: '应用在本地保存事实、schema 与纠错历史，v0.3.0 起与原生 Android 客户端共用同一套加密数据模型；它本身不调用外部模型 API。',
        primaryLabel: 'GitHub 仓库',
        primaryHref: links.mealCircuit,
        secondaryLabel: '项目记录',
        secondaryHref: `${links.personalZh}projects/#project-meal-circuit`,
      },
      {
        key: 'crewlight',
        name: 'Crewlight',
        tier: '公开软件',
        status: 'v0.5.0 已发布 · Windows 优先候选版本',
        type: '本地优先的 AI Agent 活动雷达',
        summary: '把并行 Claude Code、Codex 等工具中的运行、等待、权限请求、完成与失败状态汇总到只读的 Desktop、Companion、Dashboard 和 CLI。',
        audience: '面向同时运行多个 AI 编程 Agent、需要一眼看出哪个任务在等待的开发者。',
        decision: 'Windows x64 产物已作为预发布提供且未签名，Linux 与 macOS 不发布原生二进制；Crewlight 不保存 prompt、transcript、tool I/O 或完整平台载荷。',
        primaryLabel: 'GitHub 仓库',
        primaryHref: links.crewlight,
        secondaryLabel: '项目记录',
        secondaryHref: `${links.personalZh}projects/#project-crewlight`,
      },
      {
        key: 'docker-hadoop-cluster',
        name: 'Hadoop Lab',
        tier: '教学 · 非产品',
        status: '教学 · 本地实验环境',
        type: '可重复搭建的本地 Hadoop 实验室',
        summary: '把环境准备、服务观察、MapReduce 与三节点故障恢复接成一条引导式学习路径，并用七个实验把结果接到原理。',
        audience: '面向课堂、自学与本地 Hadoop 实验的学习者。',
        decision: '生命周期 CLI、doctor、status、WordCount、安全重置和脱敏诊断让实验可重复，同时明确它不是生产平台。',
        primaryLabel: 'GitHub 仓库',
        primaryHref: links.hadoop,
        secondaryLabel: '项目记录',
        secondaryHref: `${links.personalZh}projects/#project-docker-hadoop-cluster`,
      },
    ],
    studio: {
      eyebrow: '工作室',
      title: '把 Q Studio 说清楚。',
      lead: '由 Qian Qiu 独立创建和运营的自筹软件工作室。',
      body: '一个工作室，一个人，一套公开证据。Q Studio 构建本地优先、可检查的软件：用户数据留在用户手里，能力边界写在纸面上，安装、检查与恢复可以被别人重复验证。当前重点是 VeriSilo；Crewlight 与 MealCircuit 是公开、可检查的软件；Hadoop Lab 是教学实验，不是产品。',
      facts: [
        { term: '工作室', detail: 'Q Studio · 独立软件工作室' },
        { term: '创建与运营', detail: 'Qian Qiu' },
        { term: '模式', detail: '独立 · 自筹' },
        { term: '方向', detail: '本地优先软件 · 开发者工具 · 可检查的隐私系统' },
        { term: '当前重点', detail: 'VeriSilo', href: links.verisilo, linkLabel: '访问产品站' },
        { term: '联系', detail: 'qstudio@qiu.works', href: 'mailto:qstudio@qiu.works', linkLabel: 'qstudio@qiu.works' },
        { term: '公开源码', detail: 'GitHub', href: links.github, linkLabel: 'github.com/QianQIUlp' },
      ],
      factsAria: '工作室信息',
    },
    approach: {
      eyebrow: '构建方法',
      title: '边界本身就是产品的一部分。',
      lead: '我更在意软件在第一次演示之后是否仍然可以理解：数据在哪里、什么发生了变化，以及工具拒绝承诺什么。',
      principles: [
        { title: '本地优先', body: '默认把有价值的工作与私人状态留在用户自己的设备上。' },
        { title: '可检查系统', body: '展示证据、历史与能力状态，不用一个分数遮住判断。' },
        { title: '明确边界', body: '在营销替软件补全幻想之前，先说清楚它不解决什么。' },
        { title: '可复现基础设施', body: '把安装、检查与恢复做成别人能够重复验证的路径。' },
        { title: '用户控制数据', body: '优先使用明确的导出、纠错和删除，而不是静默同步。' },
      ],
    },
    writing: {
      eyebrow: '精选写作',
      title: '这些判断是怎样形成的。',
      lead: '这里有技术指南、对模型的质疑，也有几条防止工具替我决定工作的个人规则。',
      action: '阅读文章',
      items: [
        {
          date: '2026/05/26',
          title: 'LLM 元认知盲点：为什么我不会主动质疑自己的框架',
          description: '模型的自我修正究竟是真正的怀疑，还是另一种学习到的表演。',
          href: `${links.personalZh}blog/posts/2026-05-26-llm-metacog-blindspot/`,
        },
        {
          date: '2026/05/20',
          title: '新服务器加固的三阶段心智模型',
          description: '从关闭不安全默认值，到建立一条可恢复、可持续维护的路径。',
          href: `${links.personalZh}blog/posts/2026-05-20-linux-security-setup/`,
        },
        {
          date: '2026/06/18',
          title: '我不欠资源一次使用',
          description: '为什么闲置的能力不应该反过来替我创造任务。',
          href: `${links.personalZh}blog/posts/2026-06-18-resource-usage-rule/`,
        },
      ],
    },
    personal: {
      eyebrow: '工作之外 · me.qiu.works',
      title: '工作之外，是千秋。',
      body: 'Q Studio 背后的那个人。拿起我的吉他，拨几根弦，翻一张散页，或者随手留一笔。这是属于千秋的私人一隅。',
      action: '认识千秋',
      image: '/assets/evidence/me-zh.jpg',
      imageAlt: '千秋个人站：中文姓名与酒红色 Potbelly 吉他',
    },
    contact: {
      eyebrow: '联系',
      title: '一个边界清楚的问题，就是很好的开始。',
      body: '欢迎提供产品反馈、讨论技术合作，也可以联系工作室处理边界明确的软件问题。',
      emailLabel: '发送邮件到 qstudio@qiu.works',
      githubLabel: '前往 GitHub',
    },
    footer: '© 2026 Q Studio · 由 Qian Qiu 创建和运营 · 一个静态、可检查的网站。',
  },
};

export { links };
