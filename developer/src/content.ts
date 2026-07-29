export type Locale = 'en' | 'zh';

type Project = {
  key: string;
  name: string;
  status: string;
  type: string;
  summary: string;
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
  nav: { work: string; approach: string; writing: string; contact: string };
  languageLabel: string;
  languageAria: string;
  themeAria: string;
  day: string;
  night: string;
  hero: {
    eyebrow: string;
    name: string;
    headline: string;
    body: string;
    workAction: string;
    githubAction: string;
    roomAction: string;
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
  approach: { eyebrow: string; title: string; lead: string; principles: Principle[] };
  writing: { eyebrow: string; title: string; lead: string; items: Writing[]; action: string };
  room: { eyebrow: string; title: string; body: string; action: string; image: string; imageAlt: string };
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
  roomEn: 'https://room.qiu.works/en/',
  roomZh: 'https://room.qiu.works/',
} as const;

export const copy: Record<Locale, DeveloperCopy> = {
  en: {
    meta: {
      title: 'Qiu · CS student and indie developer',
      description: 'Qiu builds local-first software with explicit boundaries, including VeriSilo and other inspectable developer tools.',
      image: '/assets/og/developer-en.png',
      imageAlt: 'Qiu developer profile — local-first software with explicit boundaries',
    },
    skip: 'Skip to main content',
    brandAria: 'Qiu developer home',
    navAria: 'Primary navigation',
    nav: { work: 'Work', approach: 'Approach', writing: 'Writing', contact: 'Contact' },
    languageLabel: '中文',
    languageAria: '切换到中文',
    themeAria: 'Switch color theme',
    day: 'Day',
    night: 'Night',
    hero: {
      eyebrow: 'CS student · indie developer',
      name: 'Qiu',
      headline: 'I build local-first software with explicit boundaries.',
      body: 'Currently building VeriSilo, a Windows-first, open-source browser environment isolation and privacy-auditing project for Chrome and Edge.',
      workAction: 'View selected work',
      githubAction: 'GitHub',
      roomAction: "Enter Qiu's Room",
      nowLabel: 'Now building',
      nowProject: 'VeriSilo',
      nowStatus: 'Pre-release engineering',
      nowBody: 'Separate browser-owned state without pretending to change what ordinary browser software cannot control.',
      nowEvidence: 'Source, capability states, threat model, and release gates are open for inspection.',
    },
    work: {
      eyebrow: 'Selected work',
      title: 'Evidence before adjectives.',
      lead: 'Each project starts with a concrete problem, keeps its boundary visible, and leaves behind something another person can inspect.',
      featuredLabel: '01 · Current focus',
      featuredTitle: 'Browser state, visibly separated.',
      featuredBody: 'Every Silo launches Chrome or Edge with its own managed data directory. Cookies, storage, cache, service workers, permissions, and history stay inside that environment rather than the default profile.',
      featuredBoundary: 'VeriSilo does not claim device impersonation, fraud bypass, TLS or QUIC modification, hardware isolation, or undetectability.',
      featuredProduct: 'Visit product site',
      featuredSource: 'Inspect source',
      image: '/assets/evidence/verisilo-site-en.png',
      imageHeight: 910,
      imageAlt: 'VeriSilo capability evidence model distinguishing reliable, best-effort, and unsupported browser controls',
      listAria: 'Selected software projects',
    },
    projects: [
      {
        key: 'meal-circuit',
        name: 'MealCircuit',
        status: 'Available · v0.2.0',
        type: 'Local-first nutrition feedback workbench',
        summary: 'Connects meal photos, daily state, trends, and corrections into a feedback history that can improve the next decision.',
        decision: 'The application keeps facts, schemas, and correction history local; it does not call an external model API itself.',
        primaryLabel: 'GitHub repository',
        primaryHref: links.mealCircuit,
        secondaryLabel: 'Room case study',
        secondaryHref: `${links.roomEn}projects/#project-meal-circuit`,
      },
      {
        key: 'crewlight',
        name: 'Crewlight',
        status: 'Stabilizing · v0.5.0 candidate',
        type: 'Local-first AI agent activity radar',
        summary: 'Brings running, waiting, permission-request, completed, and failed states from parallel Claude Code, Codex, and other tools into read-only Desktop, Companion, Dashboard, and CLI views.',
        decision: 'Linux x64 has completed hands-on verification; Windows and macOS remain pending. Crewlight stores no prompts, transcripts, tool I/O, or complete platform payloads.',
        primaryLabel: 'GitHub repository',
        primaryHref: links.crewlight,
        secondaryLabel: 'Room case study',
        secondaryHref: `${links.roomEn}projects/#project-crewlight`,
      },
      {
        key: 'docker-hadoop-cluster',
        name: 'Docker-Hadoop-Cluster',
        status: 'Teaching · local experimentation',
        type: 'Repeatable local Hadoop laboratory',
        summary: 'Connects environment setup, service observation, MapReduce, and three-node failure and recovery into a guided learning path.',
        decision: 'A lifecycle CLI plus doctor, status, WordCount, safe reset, and redacted diagnostics keep the lab reproducible without presenting it as a production platform.',
        primaryLabel: 'GitHub repository',
        primaryHref: links.hadoop,
        secondaryLabel: 'Room case study',
        secondaryHref: `${links.roomEn}projects/#project-docker-hadoop-cluster`,
      },
    ],
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
          href: `${links.roomEn}blog/posts/2026-05-26-llm-metacog-blindspot/`,
        },
        {
          date: '2026/05/20',
          title: 'Hardening a New Linux Server',
          description: 'A practical path from closing unsafe defaults to maintaining a recoverable system.',
          href: `${links.roomEn}blog/posts/2026-05-20-linux-security-setup/`,
        },
        {
          date: '2026/06/18',
          title: 'I Do Not Owe a Resource One Use',
          description: 'Why unused capacity should not be allowed to invent work on my behalf.',
          href: `${links.roomEn}blog/posts/2026-06-18-resource-usage-rule/`,
        },
      ],
    },
    room: {
      eyebrow: 'Beyond work',
      title: 'The projects are only one part of the room.',
      body: 'Writing, guitar, games, relationships, and questions that have not turned into software live in a slower, more personal space.',
      action: "Enter Qiu's Room",
      image: '/assets/evidence/qius-room-en.png',
      imageAlt: "Qiu's personal room with a guitar under warm light",
    },
    contact: {
      eyebrow: 'Contact',
      title: 'A focused problem is a good place to start.',
      body: 'Open to technical conversations, project feedback, and focused software help.',
      emailLabel: 'Email qstudio@qiu.works',
      githubLabel: 'Continue on GitHub',
    },
    footer: '© 2026 Qiu · Built as a static, inspectable site.',
  },
  zh: {
    meta: {
      title: 'Qiu · 学生开发者与独立构建者',
      description: 'Qiu 构建本地优先、边界清楚的软件，目前正在开发 VeriSilo。',
      image: '/assets/og/developer-zh.png',
      imageAlt: 'Qiu 开发者主页——本地优先、边界清楚的软件',
    },
    skip: '跳到主要内容',
    brandAria: 'Qiu 开发者主页',
    navAria: '主导航',
    nav: { work: '作品', approach: '方法', writing: '写作', contact: '联系' },
    languageLabel: 'EN',
    languageAria: 'Switch to English',
    themeAria: '切换深浅色模式',
    day: '昼',
    night: '夜',
    hero: {
      eyebrow: '学生开发者 · 独立构建者',
      name: 'Qiu / 千秋',
      headline: '我构建本地优先、边界清楚的软件工具。',
      body: '目前正在开发 VeriSilo：一个面向 Windows、开源的 Chrome 与 Edge 浏览器环境隔离和隐私审计项目。',
      workAction: '查看代表作品',
      githubAction: 'GitHub',
      roomAction: '进入 Qiu 的小屋',
      nowLabel: '当前构建',
      nowProject: 'VeriSilo',
      nowStatus: '发布前工程阶段',
      nowBody: '分开浏览器拥有的状态，同时不假装普通浏览器软件可以改变它无法控制的部分。',
      nowEvidence: '源码、能力状态、威胁模型与发布门槛都可公开检查。',
    },
    work: {
      eyebrow: '代表作品',
      title: '先给证据，再给形容词。',
      lead: '每个项目都从一个具体问题出发，保留可检查的边界，也留下别人能够打开、复现或继续接手的东西。',
      featuredLabel: '01 · 当前重点',
      featuredTitle: '让浏览器状态真正分开，也让边界看得见。',
      featuredBody: '每个 Silo 都以独立、受管理的数据目录启动 Chrome 或 Edge。Cookie、存储、缓存、Service Worker、权限和历史记录留在自己的环境里，而不是默认 Profile。',
      featuredBoundary: 'VeriSilo 不承诺设备伪装、欺诈绕过、TLS/QUIC 修改、硬件隔离或不可检测性。',
      featuredProduct: '前往产品网站',
      featuredSource: '检查源代码',
      image: '/assets/evidence/verisilo-site-zh.png',
      imageHeight: 843,
      imageAlt: 'VeriSilo 产品站的能力证据模型，区分可靠、尽力而为与不支持的浏览器控制',
      listAria: '代表软件项目',
    },
    projects: [
      {
        key: 'meal-circuit',
        name: 'MealCircuit',
        status: '可用 · v0.2.0',
        type: '本地优先饮食反馈工作台',
        summary: '把餐食照片、每日状态、趋势和纠错接进一段会累积的反馈历史，让下一次判断不必重新猜。',
        decision: '应用在本地保存事实、schema 与纠错历史；它本身不调用外部模型 API。',
        primaryLabel: 'GitHub 仓库',
        primaryHref: links.mealCircuit,
        secondaryLabel: 'Room 案例',
        secondaryHref: `${links.roomZh}projects/#project-meal-circuit`,
      },
      {
        key: 'crewlight',
        name: 'Crewlight',
        status: '稳定化中 · v0.5.0 候选版本',
        type: '本地优先的 AI Agent 活动雷达',
        summary: '把并行 Claude Code、Codex 等工具中的运行、等待、权限请求、完成与失败状态汇总到只读的 Desktop、Companion、Dashboard 和 CLI。',
        decision: 'Linux x64 已完成实机验证，Windows 与 macOS 仍待验证；Crewlight 不保存 prompt、transcript、tool I/O 或完整平台载荷。',
        primaryLabel: 'GitHub 仓库',
        primaryHref: links.crewlight,
        secondaryLabel: 'Room 案例',
        secondaryHref: `${links.roomZh}projects/#project-crewlight`,
      },
      {
        key: 'docker-hadoop-cluster',
        name: 'Docker-Hadoop-Cluster',
        status: '教学 · 本地实验环境',
        type: '可重复搭建的本地 Hadoop 实验室',
        summary: '把环境准备、服务观察、MapReduce 与三节点故障恢复接成一条引导式学习路径。',
        decision: '生命周期 CLI、doctor、status、WordCount、安全重置和脱敏诊断让实验可重复，同时明确它不是生产平台。',
        primaryLabel: 'GitHub 仓库',
        primaryHref: links.hadoop,
        secondaryLabel: 'Room 案例',
        secondaryHref: `${links.roomZh}projects/#project-docker-hadoop-cluster`,
      },
    ],
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
          href: `${links.roomZh}blog/posts/2026-05-26-llm-metacog-blindspot/`,
        },
        {
          date: '2026/05/20',
          title: '新服务器加固的三阶段心智模型',
          description: '从关闭不安全默认值，到建立一条可恢复、可持续维护的路径。',
          href: `${links.roomZh}blog/posts/2026-05-20-linux-security-setup/`,
        },
        {
          date: '2026/06/18',
          title: '我不欠资源一次使用',
          description: '为什么闲置的能力不应该反过来替我创造任务。',
          href: `${links.roomZh}blog/posts/2026-06-18-resource-usage-rule/`,
        },
      ],
    },
    room: {
      eyebrow: '工作之外',
      title: '项目只是这个房间的一部分。',
      body: '写作、吉他、游戏、关系和那些还没有长成软件的问题，留在一个更慢、更个人的空间里。',
      action: '进入 Qiu 的小屋',
      image: '/assets/evidence/qius-room-zh.png',
      imageAlt: '暖光下摆放着吉他的 Qiu 个人房间',
    },
    contact: {
      eyebrow: '联系',
      title: '一个边界清楚的问题，就是很好的开始。',
      body: '欢迎讨论技术、交流项目反馈，也可以联系我处理边界明确的软件问题。',
      emailLabel: '发送邮件到 qstudio@qiu.works',
      githubLabel: '前往 GitHub',
    },
    footer: '© 2026 Qiu · 一个静态、可检查的网站。',
  },
};

export { links };
