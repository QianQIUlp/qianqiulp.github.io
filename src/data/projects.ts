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
  caseStudyLabels?: {
    start?: string;
    boundary?: string;
    next?: string;
  };
  caseStudyHighlightCount?: number;
  caseStudySideAria?: string;
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
    status: '稳定化中 / v0.5.0 候选版本',
    type: '本地优先的 AI Agent 活动雷达',
    repoUrl: 'https://github.com/QianQIUlp/Crewlight',
    summary: '面向并行 AI coding agents 的本地活动雷达：把分散在 Claude Code、Codex 等工具中的运行、等待、权限请求、完成与失败状态，汇总到只读的 Desktop、Companion、Dashboard 和 CLI。',
    positioning:
      '用于在本地观察并汇总多个 AI coding agents 的当前活动与待处理状态；Desktop、浮动 Companion、浏览器 Dashboard 和 CLI 共同提供只读视图，不控制 agent 或自动批准权限。',
    caseStudy: {
      problem: '同时运行多个 coding agents 时，运行、等待、权限请求、完成与失败状态分散在不同终端和工具中。开发者很难在不读取完整工作内容的前提下，快速判断哪个任务需要注意。',
      design:
        'Crewlight 采用本地优先、只读的事件汇总模型。它通过经过白名单约束的适配器接收状态事件，在 Desktop、浮动 Companion、浏览器 Dashboard 与 CLI 中组织当前会话，同时避免保存 prompt、transcript、tool I/O 或完整平台载荷。',
      start: 'v0.5.0 正在进行稳定化。本轮已完成 Linux x64 的构建、standalone、daemon、dashboard、ingest、status 与 doctor smoke 验证；55 个测试文件、690 个测试全部通过。',
      boundary: 'Windows x64 与 macOS x64/arm64 尚未完成实机修复和验证。v0.5.0 还没有正式 Release，当前最新公开版本仍是 v0.4.0。本页面不把未验证平台描述为可用或已完成。',
      nextStep: '在 Windows 和 macOS 上继续验证桌面安装包、原生通知、SSH、签名及完整运行流程；完成对应平台修复后，再决定 v0.5.0 的正式发布时间。',
    },
    caseStudyLabels: {
      start: '当前',
    },
    caseStudyHighlightCount: 4,
    caseStudySideAria: '当前状态与边界',
    confirmedFacts: [
      'v0.5.0 是稳定化中的候选版本，尚未发布；最新公开 Release 仍是 v0.4.0。',
      'Linux x64 已完成本地修复和验证；Windows x64 与 macOS x64/arm64 尚未完成实机修复和验证。',
      '当前稳定性工作由 PR #33 跟踪：https://github.com/QianQIUlp/Crewlight/pull/33。',
      '本轮仓库验证结果为 55 个测试文件、690 个测试全部通过。',
      '项目坚持本地优先和只读边界：无云服务、不控制 agent、不自动批准权限，也不保存 prompt、transcript、tool I/O 或完整平台载荷。',
    ],
    highlights: [
      '默认只在本机 loopback 上运行，不依赖云服务，也不控制 agent 或自动批准权限。',
      '对事件大小、超时、重复通知、异常输入、SSH 主机验证和 notifier 失败设置了明确的安全边界。',
      '会话只保存在内存中，默认最多保留最新 1,000 个；稳定事件在保留期内精确去重。',
      '现有适配器经过数据最小化和协议校正；MiMo、Pi Agent、OpenClaw、Reasonix 的不可靠自动 setup 暂时禁用。',
    ],
    limitations: [
      'Windows x64 与 macOS x64/arm64 尚未完成实机修复和验证，不能描述为可下载、可用或可用于生产。',
      'v0.5.0 尚未发布；当前最新公开 Release 仍是 v0.4.0。',
    ],
    tags: [
      'Local-first',
      'AI Coding Agents',
      'Linux Verified',
      'TypeScript',
      'Electron',
      'CLI',
      'Claude Code',
      'Codex',
      'SSH',
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
    repoSlug: 'docker-hadoop-cluster',
    status: '教学 / 本地实验环境',
    type: '本地 Hadoop 学习实验室',
    repoUrl: 'https://github.com/QianQIUlp/docker-hadoop-cluster',
    summary: '一个可重复搭建的本地 Hadoop 实验室，将环境准备、服务观察、MapReduce 执行、节点故障与恢复串成一条引导式学习路径。',
    positioning:
      '面向 Hadoop 初学者的本地教学实验：一套生命周期 CLI 覆盖单节点 first-run 与三节点角色模式；预检、明确健康证据、命名空间化实验、安全重置和脱敏诊断让环境始终可理解、可恢复。',
    caseStudy: {
      problem: '初学者往往还没来得及观察 HDFS 或 YARN，就先被下载、端口、配置和不透明的 daemon 故障消耗掉整节课。',
      design:
        '一套生命周期 CLI 包住单节点首次运行模式与三节点角色模式；预检、明确的健康证据、命名空间化实验、安全重置和脱敏诊断让环境始终可理解、可恢复。',
      start: '完成一次干净的 standalone 运行后，依次保留 `doctor` 通过、健康的 `status` 服务图、WordCount 结果及其成功的课程检查。',
      boundary: '这是教学与本地实验环境，不是生产 Hadoop 平台；它明确不包含 HA、Kerberos、多主机编排和运维 SLA。',
      nextStep: '作为案例证据，记录 9870 的 NameNode 概览、8088 的 ResourceManager 应用页，以及一组三节点降级 / 恢复的 status 对照。',
    },
    confirmedFacts: [
      '项目提供可重复搭建的本地 Hadoop 教学与实验环境。',
      '一套生命周期 CLI 覆盖单节点首次运行模式与三节点角色模式。',
      '学习路径包含环境准备、服务观察、MapReduce 执行，以及节点故障与恢复。',
      '预检与状态命令会给出明确的健康证据，便于理解当前服务是否真正可用。',
      '命名空间化实验、安全重置和脱敏诊断让环境可以恢复，同时避免诊断信息泄露敏感内容。',
      '项目公开提供 Hadoop 3.4.1 容器镜像，并明确排除生产环境能力声明。',
    ],
    highlights: [
      '一套生命周期 CLI 覆盖单节点 first-run 与三节点角色模式，让学习从第一次运行自然进入节点故障与恢复。',
      '预检、明确的健康证据、命名空间化实验、安全重置和脱敏诊断让环境始终可理解、可恢复。',
      '将 `doctor`、健康的 `status` 服务图、WordCount 结果及其课程检查作为可复核的学习证据，而不是只以“容器启动了”判断成功。',
      '支持观察三节点降级与恢复，让故障不再只是报错，而成为学习路径的一部分。',
      '安全重置与脱敏诊断帮助初学者从错误中恢复，不必靠删除整个环境重新开始。',
    ],
    limitations: [
      '这是教学与本地实验环境，不是生产 Hadoop 平台。',
      '明确不提供 HA、Kerberos、多主机编排或运维 SLA，也不展示虚构指标、采用量或基准测试。',
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
        href: 'https://github.com/QianQIUlp/docker-hadoop-cluster',
        external: true,
      },
      {
        label: 'README',
        href: 'https://github.com/QianQIUlp/docker-hadoop-cluster#readme',
        external: true,
      },
      {
        label: 'GHCR 镜像',
        href: 'https://github.com/QianQIUlp/docker-hadoop-cluster/pkgs/container/hadoop-cluster-3.4.1',
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
