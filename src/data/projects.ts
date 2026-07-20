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
  homeFeature?: {
    title: string;
    blurb: string;
  };
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
  heroLead: '这里收着那些已经长出形状、可以被打开、复现或继续接手的公开产物；尚未成形的学习，只先留下几枚路标。',
  heroNote: '比起陈列一个名字，我更想记下它因何而生、在哪些岔路作过取舍，也替后来者留一扇可以推开的门。',
  infrastructure: {
    eyebrow: '站点基础',
    title: '站点与写作基础',
    description: '这些入口支撑公开写作和作品展示，本身不是独立作品。',
  },
  playbooks: {
    eyebrow: '指南手册',
    title: '公开指南',
    description: '这些文章更像可复用的操作指南或 playbook，是写作产物，不是工程项目。',
  },
};

export const featuredProjects: FeaturedProject[] = [
  {
    displayName: 'MealCircuit',
    repoSlug: 'meal-circuit',
    status: '可用 / v0.2.0 已发布',
    type: '本地优先饮食反馈工作台',
    repoUrl: 'https://github.com/QianQIUlp/meal-circuit',
    summary:
      '它最有意思的地方，不是帮你记每顿饭，而是把照片、状态、趋势和纠错接成一条会累积的判断链，让你慢慢看清什么真正适合自己。',
    positioning:
      '用于保存餐食照片、原材料、每日状态、食品营养库与用户更正，并把这些事实组织成可供 Agent 分析的上下文；MealCircuit 本身不调用外部模型 API，而是承担本地数据、结构校验与历史保留层。',
    homeFeature: {
      title: '把每一顿饭，接回更长的上下文',
      blurb:
        'MealCircuit 想留下的不是一堆零散记录，而是一次次更稳、更贴近自己的饮食判断：照片、状态、趋势和纠错都会被真正带到下一次建议里。',
    },
    caseStudy: {
      problem:
        '多数饮食记录工具只能记下一顿吃了什么，却很难让人真正收获更好的下一次判断：照片、体感、趋势和用户纠错彼此分散，结果是每次分析都像重新猜一遍，复盘留不下能继承的经验。',
      design:
        '以本地优先工作台组织餐食照片、原材料、每日问答、营养库和用户更正；由 Web UI 与 CLI 提供录入、待办和回顾入口，再用 JSON Schema 校验 Agent 结果，并以追加历史而非静默覆盖的方式保留修正。',
      start:
        '从 GitHub README 按 `init`、`doctor` 和 `start.ps1` 启动，先填写私人 `profile.md` 与 `settings.json`，再通过本地 Web UI 和 CLI 体验记录与回顾流程。',
      boundary:
        'MealCircuit 自身不调用外部模型 API，也不要求 API Key；当前没有账户、默认云同步、移动端、包装 OCR 或外部营养数据库，且不构成医疗建议。',
      nextStep:
        '当前公开仓库已提供 v0.2.0、规则、模板、CLI、测试与发布检查，可从 README、rules 和 tests 继续接手这条本地优先的饮食反馈回路。',
    },
    confirmedFacts: [
      'README 将 MealCircuit 定义为本地优先、Agent-in-the-loop 的长期饮食反馈工作台。',
      '项目自身不调用外部模型 API，也不要求 API Key；它负责保存事实、组装上下文和校验结果。',
      '系统把餐食照片、原材料、每日状态问答、食品营养库和用户更正串成可追溯的反馈回路。',
      'Agent 判断会结合个人总纲、近 14 天趋势、长期记忆和当前调整，生成结构化判断与次日菜单。',
      '所有分析结果写入前都经过 JSON Schema 级别结构校验；原始输入和既有结果不会被静默覆盖，用户更正以新历史追加。',
      '运行数据默认保存在仓库外的本地 SQLite 私人目录，可通过环境变量覆盖目录、数据库路径和端口。',
      'Web UI 默认只监听回环地址；`--allow-remote` 不会增加认证或 TLS，不建议暴露到公网。',
      '当前没有用户账户、云同步、移动端、包装 OCR 或外部营养数据库；项目提供一般性记录与决策支持，不构成医疗诊断或治疗建议。',
    ],
    highlights: [
      '把今日建议、今日状态、食物照片、原材料分析、食品营养库与记录记忆放进同一条本地反馈链路里。',
      '每日状态支持逐题作答、单题草稿、跳过和版本历史，避免把缺失信息伪装成结论。',
      'Agent 工作流通过 CLI 待办、上下文导出、schema 校验和结果提交串起来，而不是后台自动分析。',
      '运行数据保存在源码仓库之外，默认无账户、无遥测、无默认云同步，强调数据主权。',
      '以 JSON Schema 校验和追加式更正保护结果边界，避免静默覆盖原始输入和既有判断。',
    ],
    limitations: [
      '上传只会创建待办，不会在后台自动识别照片或直接生成菜单。',
      '当前没有账户、默认云同步、移动端、包装 OCR 或外部营养数据库。',
    ],
    tags: [
      'Local-first',
      'Agent-in-the-loop',
      'Python 3.11+',
      'SQLite',
      'Web UI',
      'CLI',
      'JSON Schema',
      'Nutrition Tracking',
    ],
    links: [
      {
        label: 'GitHub 仓库',
        href: 'https://github.com/QianQIUlp/meal-circuit',
        external: true,
      },
      {
        label: 'README',
        href: 'https://github.com/QianQIUlp/meal-circuit/blob/main/README.md',
        external: true,
      },
      {
        label: 'v0.2.0 Release',
        href: 'https://github.com/QianQIUlp/meal-circuit/releases/tag/v0.2.0',
        external: true,
      },
    ],
  },
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
      start: '可从 GHCR 公共镜像直接拉取体验，也可进入 GitHub README 查看快速启动脚本和节点角色说明。',
      boundary: '定位是学习、实验和教学演示工具，不声明生产环境 Hadoop 平台能力。',
      nextStep: '继续补强文档、脚本提示和学习路径，让排障流程更适合课堂演示与自学复盘。',
    },
    confirmedFacts: [
      '项目说明面向教学场景下快速搭建 Hadoop 3.4.1 三节点完全分布式集群。',
      '三节点角色包含 NameNode、ResourceManager、SecondaryNameNode、DataNode、NodeManager 和 JobHistoryServer。',
      '配置外置到 conf/，并使用 .env、命名卷和共享 SSH 密钥卷组织本地环境。',
      '仓库提供 up.sh、status.sh、shell.sh、run-wordcount.sh 等启动、检查和演示脚本。',
      '项目发布公开 GHCR 镜像 ghcr.io/qianqiulp/hadoop-cluster-3.4.1，可直接拉取使用。',
      'GHCR 发布流程包含漏洞扫描、镜像签名与 SBOM/Provenance。',
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
      {
        label: 'GHCR 镜像',
        href: 'https://github.com/QianQIUlp/dockder-hadoop-cluster/pkgs/container/hadoop-cluster-3.4.1',
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
