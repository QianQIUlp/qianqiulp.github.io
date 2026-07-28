import {
  featuredProjects,
  secondaryProjects,
  type FeaturedProject,
  type ProjectsPageCopy,
  type SecondaryProject,
} from './projects';

export const projectsPageCopyEn: ProjectsPageCopy = {
  heroLead: 'This is where I keep public work that has taken shape—things others can open, reproduce, or carry forward. Learning that is still taking shape remains a set of signposts for now.',
  heroNote: 'More than displaying a name, I want to record why each project began, the trade-offs made at its forks, and a door the next person can still push open.',
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

const projectTranslations: Array<Pick<FeaturedProject, 'status' | 'type' | 'summary' | 'caseStudy' | 'caseStudyLabels' | 'caseStudySideAria' | 'highlights' | 'links'>> = [
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
    status: 'Stabilizing / v0.5.0 release candidate',
    type: 'Local-first AI agent activity radar',
    summary: 'A local activity radar for parallel AI coding agents: it brings running, waiting, permission-request, completed, and failed states from Claude Code, Codex, and other tools into read-only Desktop, Companion, Dashboard, and CLI surfaces.',
    caseStudy: {
      problem: 'When several coding agents run at once, running, waiting, permission-request, completed, and failed states are scattered across terminals and tools. Developers cannot quickly tell which task needs attention without reading the full work contents.',
      design: 'Crewlight uses a local-first, read-only event aggregation model. It receives status events through allowlisted adapters, organizes current sessions in Desktop, a floating Companion, a browser Dashboard, and a CLI, and avoids storing prompts, transcripts, tool I/O, or complete platform payloads.',
      start: 'v0.5.0 is under stabilization. This round completed Linux x64 build, standalone, daemon, dashboard, ingest, status, and doctor smoke verification; all 55 test files and 690 tests passed.',
      boundary: 'Windows x64 and macOS x64/arm64 have not yet completed hands-on fixes and verification. v0.5.0 has no release yet; the newest public release remains v0.4.0. This page does not describe unverified platforms as available or complete.',
      nextStep: 'Continue verifying desktop installers, native notifications, SSH, signing, and end-to-end workflows on Windows and macOS. Decide on v0.5.0\'s release date only after the relevant platform fixes are complete.',
    },
    caseStudyLabels: {
      start: 'Current',
    },
    caseStudySideAria: 'Current status and boundaries',
    highlights: [
      'Runs on the local loopback by default, needs no cloud service, and neither controls agents nor automatically approves permissions.',
      'Sets explicit safety boundaries for event size, timeouts, duplicate notifications, malformed input, SSH host verification, and notifier failures.',
      'Keeps sessions in memory only, retaining at most the latest 1,000 by default; stable events are exactly deduplicated during their retention period.',
      'Existing adapters have been data-minimized and protocol-corrected; unreliable automatic setup for MiMo, Pi Agent, OpenClaw, and Reasonix is temporarily disabled.',
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
    title: "Qiu's Room",
    status: 'Maintained',
    tags: ['Astro', 'Personal site', 'Writing'],
    description: 'This static site organizes technical practice, learning notes, and personal reflections.',
    href: '/en/',
    linkLabel: 'Back to home',
  },
  {
    ...secondaryProjects[1],
    title: 'Writing archive',
    status: 'Updated',
    tags: ['Reading', 'Notes'],
    description: 'A reverse-chronological archive spanning technology, AI, psychology, games, and learning paths.',
    href: '/en/blog/',
    linkLabel: 'View writing',
  },
];

export const secondaryProjectsEn = secondaryTranslations;
