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
