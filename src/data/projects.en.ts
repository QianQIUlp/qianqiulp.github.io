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
    status: 'Pre-release engineering',
    type: 'Browser environment isolation and privacy-auditing platform',
    summary: 'VeriSilo gives every Silo a separate, managed Chrome or Edge data directory, so cookies, storage, cache, permissions, and history stay in that environment while controllable, observable, and impossible capabilities remain visibly distinct.',
    caseStudy: {
      problem: 'People managing several web identities can easily mix browser-owned cookies, storage, service workers, permissions, and history inside a default profile. Many tools then overstate environment separation as device impersonation or undetectability, obscuring the real boundary.',
      design: 'The desktop app launches Chrome or Edge with a dedicated `--user-data-dir` per Silo and keeps VeriSilo metadata and seeds in a local encrypted vault. The optional Companion observes and explains the current environment only after an explicit user action, with local redacted report storage by default.',
      start: 'The project is being built in public before its first signed Windows release. The product site explains the isolation model; GitHub exposes the source, product scope, capability matrix, threat model, and development guide.',
      boundary: 'VeriSilo provides browser-state separation and transparent privacy controls. It does not claim device impersonation, fraud bypass, TLS or QUIC modification, hardware isolation, or universal Worker fingerprint modification, and the site does not offer an installer before release gates are complete.',
      nextStep: 'Complete the signed Windows build, release checks, and real-environment verification while keeping every public claim tied to source, capability state, and inspectable boundaries.',
    },
    highlights: [
      'Uses a dedicated browser data directory per Silo so browser-owned cookies, storage, cache, service workers, permissions, and history separate naturally.',
      'Distinguishes reliable control, best-effort observation, and unavailable capabilities instead of hiding evidence behind an anonymous score.',
      'Keeps Native Messaging, page messages, and report export explicitly validated, user-triggered, local, and redacted by default.',
    ],
    links: featuredProjects[0].links.map((link) => ({
      ...link,
      label: link.label === '产品网站'
        ? 'Product site'
        : link.label === 'GitHub 仓库'
          ? 'GitHub repository'
          : 'Product scope',
    })),
  },
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
    links: featuredProjects[1].links.map((link) => ({ ...link, label: link.label === 'GitHub 仓库' ? 'GitHub repository' : link.label })),
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
    links: featuredProjects[2].links.map((link) => ({ ...link, label: link.label === 'GitHub 仓库' ? 'GitHub repository' : link.label === '中文 README' ? 'Chinese README' : link.label })),
  },
  {
    status: 'Teaching / local experimentation',
    type: 'Local Hadoop learning lab',
    summary: 'A repeatable local Hadoop laboratory that turns environment setup, service observation, MapReduce execution, node failure and recovery into a guided learning path.',
    caseStudy: {
      problem: 'Beginners often lose an entire lesson to downloads, ports, configuration, and opaque daemon failures before they can observe HDFS or YARN.',
      design: 'One lifecycle CLI wraps a single-node first-run mode and a three-node role mode. Preflight checks, explicit health evidence, namespaced labs, safe resets, and redacted diagnostics keep the environment understandable and recoverable.',
      start: 'After a clean standalone run, retain a passing `doctor` terminal, a healthy `status` service map, the WordCount result, and its successful lesson check.',
      boundary: 'This is a teaching and local experimentation environment, not a production Hadoop platform. It explicitly excludes HA, Kerberos, multi-host orchestration, and operational SLAs.',
      nextStep: 'For case-study evidence, capture the NameNode overview at 9870, the ResourceManager application page at 8088, and one three-node degraded/recovered status pair.',
    },
    highlights: [
      'One lifecycle CLI covers a single-node first run and a three-node role mode, carrying the learning path naturally into node failure and recovery.',
      'Preflight checks, explicit health evidence, namespaced labs, safe resets, and redacted diagnostics keep the environment understandable and recoverable.',
      'Uses a passing `doctor`, healthy `status` service map, WordCount result, and its lesson check as reviewable learning evidence instead of treating “containers started” as success.',
    ],
    links: featuredProjects[3].links.map((link) => ({ ...link, label: link.label === 'GitHub 仓库' ? 'GitHub repository' : link.label === 'GHCR 镜像' ? 'GHCR image' : link.label })),
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
