export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProjectsPageCopy = {
  heroLead: string;
  heroNote: string;
  infrastructure: {
    eyebrow: string;
    title: string;
    description: string;
  };
  playbooks: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export type FeaturedProject = {
  displayName: string;
  repoSlug: string;
  status: string;
  type: string;
  repoUrl: string;
  summary: string;
  positioning: string;
  caseStudy: {
    problem: string;
    design: string;
    start: string;
    boundary: string;
    nextStep: string;
  };
  confirmedFacts: string[];
  highlights: string[];
  limitations: string[];
  tags: string[];
  links: ProjectLink[];
};

export type SecondaryProject = {
  title: string;
  status: string;
  tags: string[];
  description: string;
  href?: string;
  linkLabel?: string;
  external?: boolean;
};

export const projectsPageCopy: ProjectsPageCopy = {
  heroLead: '这里记录能被打开、复现或继续维护的公开产物；未成形的学习记录只作为线索，不和作品平级。',
  heroNote: '我更关心一个作品解决了什么问题、做过哪些设计取舍，以及别人可以从哪里开始看。',
  infrastructure: {
    eyebrow: 'Site / Writing Infrastructure',
    title: '站点与写作基础',
    description: '这些入口支撑公开写作和作品展示，本身不是独立作品。',
  },
  playbooks: {
    eyebrow: 'Selected Playbooks',
    title: '公开指南',
    description: '这些文章更像可复用的操作指南或 playbook，是写作产物，不是工程项目。',
  },
};

export const featuredProjects: FeaturedProject[] = [
  {
    displayName: 'Crewlight',
    repoSlug: 'Crewlight',
    status: '归档原型 / v0.4.0 参考版本',
    type: '本地优先开发者工具',
    repoUrl: 'https://github.com/QianQIUlp/Crewlight',
    summary: '面向 AI coding agents 的本地活动雷达，以 Windows Desktop 作为 v0.4.0 的主要用户体验。',
    positioning:
      '用于在本地观察并汇总多个 AI coding agents 的当前活动与待处理状态；桌面端是主要入口，浮动 companion、浏览器 dashboard 和 CLI 分别承担常驻概览、开发者检查与高级设置、自动化和诊断。',
    caseStudy: {
      problem: '并行使用多个 coding agents 时，活跃、等待、失败或可能停滞的状态分散在不同工具里，很难在不读取完整工作内容的前提下快速判断哪里需要关注。',
      design:
        '以本地优先、只读的事件汇总层组织状态，Windows Desktop 集中提供 Home、Doctor、Agents、Companion、Demo、Appearance、Settings 和 About；浏览器 dashboard 保留为次级检查界面，CLI 用于高级配置、ingest、脚本和诊断。',
      start: '从 GitHub 仓库或中文 README 了解桌面端、集成层级与 v0.4.0 的使用边界，并查看对应 release 说明。',
      boundary: 'v0.4.0 是已归档的原型 / 参考版本，存在已知问题，不代表持续维护或生产可用；项目只观察活动，不控制 agent 或批准权限。',
      nextStep: '当前不承诺继续维护；保留 v0.4.0 的代码、文档与 release，作为本地优先 agent 活动可视化的参考实现。',
    },
    confirmedFacts: [
      'README 将 Crewlight v0.4.0 定义为存在已知问题、不再维护、仅供参考的 archived prototype。',
      'Crewlight Desktop 是主要用户体验，浮动 companion、浏览器 dashboard 和 CLI 是不同层级的次级入口。',
      '桌面端包含 Home、Doctor、Agents、Companion、Demo、Appearance、Settings 和 About 等界面。',
      '集成资料覆盖 Claude Code hooks、Codex hooks、Codex notify、OpenCode、Cursor 手动实验 bridge，以及 manual/custom ingest。',
      'OpenCode 标注为已实现但仍待验证，Cursor 仅为手动 / 实验性 bridge，不声明自动生命周期观察。',
      '项目坚持本地优先和只读边界：无云服务、不抓取私有 API、不自动批准权限，也不保留 prompt、transcript、tool I/O 或 v0.4.0 session 历史。',
    ],
    highlights: [
      'Windows Desktop 优先，将本地服务状态、诊断、集成配置、demo 和 companion 控制收进统一桌面入口。',
      '按集成来源明确区分精确 hooks、窄范围 notify、待验证实现和手动实验 bridge，避免夸大支持范围。',
      '明确只读与数据最小化边界，不控制 agent、不批准权限，也不持久化 prompt、transcript、tool I/O 或 session 历史。',
      '浮动 companion 提供常驻概览，浏览器 dashboard 保留为 loopback-only 的次级开发者检查界面。',
      'CLI 面向高级配置、hook/notify ingest、自动化、诊断和 standalone 使用。',
    ],
    limitations: [
      'v0.4.0 是存在已知问题的归档原型 / 参考版本，不声明持续维护或生产可用。',
      'OpenCode 集成仍待真实环境验证；Cursor 仅支持显式命令驱动的手动 / 实验性 bridge。',
    ],
    tags: [
      'Local-first',
      'AI Coding Agents',
      'Windows Desktop',
      'TypeScript',
      'Electron',
      'CLI',
      'Claude Code',
      'Codex',
    ],
    links: [
      {
        label: 'GitHub 仓库',
        href: 'https://github.com/QianQIUlp/Crewlight',
        external: true,
      },
      {
        label: '中文 README',
        href: 'https://github.com/QianQIUlp/Crewlight/blob/main/README.zh-CN.md',
        external: true,
      },
      {
        label: 'v0.4.0 Release',
        href: 'https://github.com/QianQIUlp/Crewlight/releases/tag/v0.4.0',
        external: true,
      },
    ],
  },
  {
    displayName: 'Docker-Hadoop-Cluster',
    repoSlug: 'dockder-hadoop-cluster',
    status: '可用 / 继续完善中',
    type: '教学实验工具',
    repoUrl: 'https://github.com/QianQIUlp/dockder-hadoop-cluster',
    summary: '面向教学、实验和本地学习的 Hadoop 3.4.1 Docker Compose 集群环境。',
    positioning:
      '用于快速理解 HDFS、YARN、MapReduce、Docker Compose 和集群排障流程；定位上更偏学习、实验和教学演示，而不是生产环境 Hadoop 平台。',
    caseStudy: {
      problem: '本地学习和排查 Hadoop 集群时，环境、节点角色、配置和示例任务常常分散，初学者很难快速进入 HDFS/YARN/MapReduce 调试现场。',
      design:
        '用 Docker Compose 组织三节点教学集群，外置 conf/ 配置，配合 .env、命名卷、共享 SSH 密钥和 helper scripts，把启动、检查、进容器和 WordCount 演示串成可复现流程。',
      start: '从 GitHub 仓库或 README 进入，先看快速启动脚本和节点角色说明。',
      boundary: '定位是学习、实验和教学演示工具，不声明生产环境 Hadoop 平台能力。',
      nextStep: '继续补强文档、脚本提示和学习路径，让排障流程更适合课堂演示与自学复盘。',
    },
    confirmedFacts: [
      '项目说明面向教学场景下快速搭建 Hadoop 3.4.1 三节点完全分布式集群。',
      '三节点角色包含 NameNode、ResourceManager、SecondaryNameNode、DataNode、NodeManager 和 JobHistoryServer。',
      '配置外置到 conf/，并使用 .env、命名卷和共享 SSH 密钥卷组织本地环境。',
      '仓库提供 up.sh、status.sh、shell.sh、run-wordcount.sh 等启动、检查和演示脚本。',
      '项目包含 GHCR 镜像发布、漏洞扫描、镜像签名与 SBOM/Provenance 相关工作流。',
    ],
    highlights: [
      '三节点完全分布式角色设计，方便观察 HDFS、YARN 与 MapReduce 的协作关系。',
      'Hadoop XML 配置外置到 conf/，配合 .env 参数化，便于教学中解释每个配置项。',
      '用 Docker 命名卷持久化集群数据，并通过共享 SSH 密钥卷建立节点互信。',
      '提供单节点伪分布式模式，适合内存受限的本地学习和课堂演示。',
      '配套状态检查、进入容器和 WordCount 示例脚本，降低排障和演示成本。',
    ],
    limitations: [
      '这是学习、实验和教学演示取向的项目，不声明生产环境 Hadoop 平台能力。',
      '页面只展示仓库资料可支撑的设计与功能，不补写用户规模、性能指标或成熟度结论。',
    ],
    tags: [
      'Docker',
      'Docker Compose',
      'Hadoop 3.4.1',
      'HDFS',
      'YARN',
      'MapReduce',
      'Bash',
      'GHCR',
    ],
    links: [
      {
        label: 'GitHub 仓库',
        href: 'https://github.com/QianQIUlp/dockder-hadoop-cluster',
        external: true,
      },
      {
        label: 'README',
        href: 'https://github.com/QianQIUlp/dockder-hadoop-cluster#readme',
        external: true,
      },
    ],
  },
];

export const secondaryProjects: SecondaryProject[] = [
  {
    title: 'Qiu 的小屋',
    status: '维护中',
    tags: ['Astro', '个人站', '写作'],
    description: '当前这个静态站，用来整理技术实践、学习随笔和个人思考。',
    href: '/',
    linkLabel: '回到首页',
  },
  {
    title: '博客归档',
    status: '更新中',
    tags: ['阅读', '笔记'],
    description: '按时间倒序整理的文章入口，覆盖技术、AI、心理、游戏与学习路径。',
    href: '/blog/',
    linkLabel: '前往博客',
  },
];

export const selectedGuidePostIds = [
  '2026-05-27-github-muscle-memory',
  '2026-05-20-linux-security-setup',
  '2026-05-20-ssh-keys',
] as const;
