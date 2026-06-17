export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FeaturedProject = {
  displayName: string;
  repoSlug: string;
  status: string;
  type: string;
  repoUrl: string;
  summary: string;
  positioning: string;
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
  {
    title: 'GitHub Learning 计划',
    status: '进行中',
    tags: ['GitHub', '工作流'],
    description: '4 周从零搭建 GitHub 工作流，产出当前这个个人网站并沉淀协作习惯。',
    href: 'https://github.com/qianqiulp/qianqiulp.github.io',
    linkLabel: '查看仓库',
    external: true,
  },
  {
    title: '统计理论笔记',
    status: '已完成',
    tags: ['统计', '学习'],
    description: '系统整理概率论与数理统计的核心概念与推导，作为后续学习的索引。',
  },
  {
    title: '慢思与折腾',
    status: '酝酿中',
    tags: ['想法', '实验'],
    description: '留给还没完全成形的想法、实验项目和之后想慢慢补上的内容。',
  },
];
