import {
  featuredProjects,
  secondaryProjects,
  type FeaturedProject,
  type ProjectsPageCopy,
  type SecondaryProject,
} from './projects';

export const projectsPageCopyEn: ProjectsPageCopy = {
  heroLead: 'This page presents public projects that can be run or reproduced, along with work that is still being tested and developed.',
  heroNote: 'Each project explains the problem it addresses, its main design, how to use it, its boundaries, and what comes next.',
  infrastructure: {
    eyebrow: 'Site foundations',
    title: 'Site and writing foundations',
    description: 'These entries support public writing and project presentation; they are not standalone projects.',
  },
  playbooks: {
    eyebrow: 'Field guides',
    title: 'Public guides',
    description: 'These articles are reusable guides or playbooks—writing artifacts rather than engineering projects.',
  },
};

const projectTranslations: Array<Pick<FeaturedProject, 'status' | 'type' | 'summary' | 'caseStudy' | 'highlights' | 'links'>> = [
  {
    status: 'Available / v0.2.0 released',
    type: 'Local-first nutrition feedback workbench',
    summary: 'Its most interesting job is not logging every meal. It connects photos, daily state, trends, and corrections into a judgment loop that accumulates, helping you learn what actually works for you.',
    caseStudy: {
      problem: 'Most food logs can record what you ate, but rarely improve the next decision. Photos, physical feedback, trends, and corrections stay scattered, so each analysis starts from guesswork and leaves little reusable experience behind.',
      design: 'A local-first workbench organizes meal photos, ingredients, daily questions, nutrition data, and user corrections. A Web UI and CLI handle capture, tasks, and review; JSON Schema validates agent output; corrections append history instead of silently overwriting it.',
      start: 'Follow the GitHub README through `init`, `doctor`, and `start.ps1`; fill in the private `profile.md` and `settings.json`, then use the local Web UI and CLI to try the capture and review flow.',
      boundary: 'MealCircuit does not call an external model API or require an API key. It currently has no accounts, default cloud sync, mobile app, package OCR, or external nutrition database, and it is not medical advice.',
      nextStep: 'The public repository includes v0.2.0, rules, templates, a CLI, tests, and release checks. The README, rules, and tests are the entry points for continuing this local-first feedback loop.',
    },
    highlights: [
      'Connects recommendations, daily state, food photos, ingredient analysis, nutrition data, and memory in one local feedback path.',
      'Supports question-by-question daily check-ins, per-question drafts, skipping, and version history without turning missing information into conclusions.',
      'Uses CLI tasks, context export, schema validation, and explicit result submission instead of opaque background analysis.',
    ],
    links: featuredProjects[0].links.map((link) => ({ ...link, label: link.label === 'GitHub 仓库' ? 'GitHub repository' : link.label })),
  },
  {
    status: 'Archived prototype / v0.4.0 reference',
    type: 'Local-first developer tool',
    summary: 'A local activity radar for AI coding agents, with Windows Desktop as the primary v0.4.0 experience.',
    caseStudy: {
      problem: 'When several coding agents run in parallel, active, waiting, failed, and possibly stalled states are scattered across tools. It is hard to see what needs attention without reading the underlying work.',
      design: 'A local-first, read-only event layer aggregates activity. Windows Desktop provides Home, Doctor, Agents, Companion, Demo, Appearance, Settings, and About; the browser dashboard remains a secondary inspection surface, while the CLI handles advanced configuration, ingest, automation, and diagnostics.',
      start: 'Use the GitHub repository or Chinese README to understand the desktop app, integration tiers, and v0.4.0 boundaries, then review the matching release notes.',
      boundary: 'v0.4.0 is an archived prototype and reference release with known issues, not a promise of maintenance or production readiness. It observes activity but does not control agents or approve permissions.',
      nextStep: 'No continued maintenance is promised. The v0.4.0 code, documentation, and release remain available as a reference implementation for local-first agent activity visualization.',
    },
    highlights: [
      'Makes Windows Desktop the main surface for local service state, diagnostics, integrations, demos, and companion controls.',
      'Distinguishes exact hooks, narrow notify support, unverified implementations, and manual experimental bridges instead of overstating coverage.',
      'Keeps a read-only, data-minimizing boundary: no agent control, permission approval, or persistence of prompts, transcripts, tool I/O, or session history.',
    ],
    links: featuredProjects[1].links.map((link) => ({ ...link, label: link.label === 'GitHub 仓库' ? 'GitHub repository' : link.label === '中文 README' ? 'Chinese README' : link.label })),
  },
  {
    status: 'Available / teaching lab',
    type: 'Local Hadoop learning lab',
    summary: 'A reproducible local Hadoop lab that joins environment setup, service observation, MapReduce execution, and node failure and recovery into a guided learning path.',
    caseStudy: {
      problem: 'Beginners often lose an entire lesson to downloads, ports, configuration, and opaque daemon failures before they can observe HDFS or YARN.',
      design: 'One lifecycle CLI covers both a single-node first run and a three-node role-based mode. Preflight checks, explicit health evidence, namespaced labs, safe resets, and redacted diagnostics keep the environment understandable and recoverable.',
      start: 'Follow the README through a clean standalone run: execute `doctor` and `status`, complete the WordCount lesson check, then move on to the three-node failure and recovery lab.',
      boundary: 'This is a teaching and local experimentation environment, not a production Hadoop platform. It explicitly excludes HA, Kerberos, multi-host orchestration, and operational SLAs.',
      nextStep: 'Reproduce the full path from the repository README and use NameNode, ResourceManager, WordCount, and three-node degraded/recovered states as verifiable outcomes.',
    },
    highlights: [
      'Starts with a low-friction single-node first run, then moves naturally into a three-node role-based experiment.',
      'Turns `doctor`, the health graph, and lesson checks into explicit evidence instead of treating “containers started” as success.',
      'Connects WordCount results to lesson checks, making the example a verifiable MapReduce learning milestone.',
    ],
    links: featuredProjects[2].links.map((link) => ({ ...link, label: link.label === 'GitHub 仓库' ? 'GitHub repository' : link.label === 'GHCR 镜像' ? 'GHCR image' : link.label })),
  },
];

export const featuredProjectsEn: FeaturedProject[] = featuredProjects.map((project, index) => ({
  ...project,
  ...projectTranslations[index],
}));

const secondaryTranslations: SecondaryProject[] = [
  {
    ...secondaryProjects[0],
    title: "Qianqiu's personal site",
    status: 'Maintained',
    tags: ['Astro', 'Personal site', 'Writing'],
    description: 'This static site organizes technical practice, learning notes, and personal reflections.',
    href: '/en/',
    linkLabel: 'Back to home',
  },
  {
    ...secondaryProjects[1],
    title: 'Writing',
    status: 'Updated',
    tags: ['Reading', 'Notes'],
    description: 'Reverse-chronological writing about technology, AI, psychology, games, and learning.',
    href: '/en/blog/',
    linkLabel: 'View writing',
  },
];

export const secondaryProjectsEn = secondaryTranslations;
