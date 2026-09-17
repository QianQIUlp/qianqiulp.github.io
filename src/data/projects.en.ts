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

const projectTranslations: Array<Pick<FeaturedProject, 'status' | 'type' | 'summary' | 'caseStudy' | 'caseStudyLabels' | 'caseStudySideAria' | 'highlights' | 'limitations' | 'links'>> = [
  {
    status: 'Public pre-release · v0.1.0-rc4',
    type: 'Browser environment isolation and privacy-auditing platform',
    summary: 'VeriSilo gives every Silo a separate, managed Chrome or Edge data directory, so cookies, storage, cache, permissions, and history stay in that environment while controllable, observable, and impossible capabilities remain visibly distinct.',
    caseStudy: {
      problem: 'People managing several web identities can easily mix browser-owned cookies, storage, service workers, permissions, and history inside a default profile. Many tools then overstate environment separation as device impersonation or undetectability, obscuring the real boundary.',
      design: 'The desktop app launches Chrome or Edge with a dedicated `--user-data-dir` per Silo and keeps VeriSilo metadata and seeds in a local encrypted vault. The optional Companion observes and explains the current environment only after an explicit user action, with local redacted report storage by default.',
      start: 'v0.1.0-rc4 ships a public pre-release Windows x64 installer from the release page, with per-file verification against `SHA256SUMS`. The product site also offers an interactive sample workspace that demonstrates the isolation and evidence model with simulated data and never touches your machine.',
      boundary: 'The outer installer has no Authenticode signature yet, so Windows may show an Unknown publisher or SmartScreen prompt, and strict non-admin install, reinstall, and uninstall semantics remain unproven. A pre-release makes no undetectability, absolute-anonymity, or universal-compatibility claim, and it does not rewrite TLS, QUIC, or hardware-level identifiers.',
      nextStep: 'Complete publisher signing and verification of strict standard-user install semantics, and turn the currently inconclusive automated installed-smoke test into a reproducible acceptance result.',
    },
    highlights: [
      'Uses a dedicated browser data directory per Silo so browser-owned cookies, storage, cache, service workers, permissions, and history separate naturally.',
      'Distinguishes reliable control, best-effort observation, and unavailable capabilities instead of hiding evidence behind an anonymous score.',
      'Keeps Native Messaging, page messages, and report export explicitly validated, user-triggered, local, and redacted by default.',
      'Ships checksums, SBOMs, provenance, and third-party license material so a download can be verified item by item instead of merely trusted.',
    ],
    limitations: [
      'Still a public pre-release (v0.1.0-rc4), not a stable release, and the outer installer is unsigned.',
      'Strict non-admin install, reinstall, and uninstall semantics remain unproven.',
      'Does not provide device impersonation, anti-detection guarantees, fraud bypass, TLS or QUIC modification, or hardware-level isolation.',
    ],
    links: featuredProjects[0].links.map((link) => ({
      ...link,
      label: link.label === '产品网站'
        ? 'Product site'
        : link.label === 'GitHub 仓库'
          ? 'GitHub repository'
          : link.label === 'v0.1.0-rc4 Release'
            ? 'v0.1.0-rc4 release'
            : 'Product scope',
    })),
  },
  {
    status: 'Available / v0.3.0 released',
    type: 'Local-first nutrition feedback workbench',
    summary: 'Its most interesting job is not logging every meal. It connects photos, daily state, trends, and corrections into a judgment loop that accumulates, helping you learn what actually works for you.',
    caseStudy: {
      problem: 'Most food logs can record what you ate, but rarely improve the next decision. Photos, physical feedback, trends, and corrections stay scattered, so each analysis starts from guesswork and leaves little reusable experience behind.',
      design: 'A local-first workbench organizes meal photos, ingredients, daily questions, nutrition data, and user corrections. A Web UI and CLI handle capture, tasks, and review; JSON Schema validates agent output; corrections append history instead of silently overwriting it. v0.3.0 adds a native Android client and optional end-to-end encrypted sync that share the same encrypted, versioned data model.',
      start: 'Follow the GitHub README through `init`, `doctor`, and `start.ps1`; fill in the private `profile.md` and `settings.json`, then use the local Web UI and CLI to try the capture and review flow. The v0.3.0 release also provides Windows, Linux, macOS, and Android packages.',
      boundary: 'MealCircuit does not call an external model API or require an API key. Sync is off by default and there is no official hosted service. Package OCR, an external nutrition database, and medical advice remain out of scope. The cryptography has cross-language vectors and negative tamper tests but has not received an independent third-party audit.',
      nextStep: 'Continue improving multi-device consistency and recovery while keeping sync optional and keeping keys and recovery credentials out of Domain data and portable archives.',
    },
    highlights: [
      'Connects recommendations, daily state, food photos, ingredient analysis, nutrition data, and memory in one local feedback path.',
      'Supports question-by-question daily check-ins, per-question drafts, skipping, and version history without turning missing information into conclusions.',
      'Uses CLI tasks, context export, schema validation, and explicit result submission instead of opaque background analysis.',
      'Shares one versioned data model with explicit migrations across devices, plus an encrypted `.mcx` backup and restore path.',
    ],
    limitations: [
      'Uploading only creates a task; nothing recognizes photos or generates a menu in the background.',
      'Sync is off by default with no official hosted service, and the cryptography has no independent third-party audit.',
      'Desktop and AppImage builds are unsigned and the macOS build is not notarized, so an unknown-publisher prompt is expected.',
      'There is no package OCR or external nutrition database.',
    ],
    links: featuredProjects[1].links.map((link) => ({ ...link, label: link.label === 'GitHub 仓库' ? 'GitHub repository' : link.label === 'v0.3.0 Release' ? 'v0.3.0 release' : link.label })),
  },
  {
    status: 'v0.5.0 released / Windows-first candidate',
    type: 'Local-first AI agent activity radar',
    summary: 'A local activity radar for parallel AI coding agents: it brings running, waiting, permission-request, completed, and failed states from Claude Code, Codex, and other tools into read-only Desktop, Companion, Dashboard, and CLI surfaces.',
    caseStudy: {
      problem: 'When several coding agents run at once, running, waiting, permission-request, completed, and failed states are scattered across terminals and tools. Developers cannot quickly tell which task needs attention without reading the full work contents.',
      design: 'Crewlight uses a local-first, read-only event aggregation model. It receives status events through allowlisted adapters, organizes current sessions in Desktop, a floating Companion, a browser Dashboard, and a CLI, and avoids storing prompts, transcripts, tool I/O, or complete platform payloads.',
      start: 'v0.5.0 ships Windows x64 artifacts as a pre-release: a Desktop portable ZIP, an NSIS installer, and a standalone CLI ZIP. The frozen portable artifact passed launch, local service start/stop, Codex-shaped event ingestion, onboarding, read-only integration inspection, and companion-view acceptance on a Windows Server 2025 host.',
      boundary: 'Every v0.5.0 artifact is unsigned, and the NSIS installer\'s graphical install path was not manually accepted in this candidate. Linux and macOS remain source-validation targets with no native binaries, and Remote remains Beta.',
      nextStep: 'Add signing and graphical installer-path acceptance for the Windows artifacts, and move Linux and macOS from source validation to repeatable hands-on verification before publishing native binaries.',
    },
    caseStudySideAria: 'Current status and boundaries',
    highlights: [
      'Collapses many agent states into one Inbox with a single priority order that answers which agent needs you, which is still running, and which failed.',
      'Runs on the local loopback by default, needs no cloud service, and neither controls agents nor automatically approves permissions.',
      'Sets explicit safety boundaries for event size, timeouts, duplicate notifications, malformed input, SSH host verification, and notifier failures.',
      'Keeps sessions in memory only, retaining at most the latest 1,000 by default; stable events are exactly deduplicated during their retention period.',
      'Inspects integration configuration read-only and requires a manual snippet merge, so the tool never rewrites your editor or agent config.',
    ],
    limitations: [
      'Every v0.5.0 artifact is unsigned, so Windows may show an unknown-publisher prompt.',
      'The NSIS installer\'s graphical install path was not manually accepted, and Linux and macOS publish no native v0.5 binaries.',
    ],
    links: featuredProjects[2].links.map((link) => ({ ...link, label: link.label === 'GitHub 仓库' ? 'GitHub repository' : link.label === '中文 README' ? 'Chinese README' : link.label === 'v0.5.0 Release' ? 'v0.5.0 release' : link.label })),
  },
  {
    status: 'Teaching / local experimentation',
    type: 'Local Hadoop learning lab',
    summary: 'A repeatable local Hadoop laboratory that turns environment setup, service observation, MapReduce execution, node failure and recovery into a guided learning path, with seven labs that connect results back to principles.',
    caseStudy: {
      problem: 'Beginners often lose an entire lesson to downloads, ports, configuration, and opaque daemon failures before they can observe HDFS or YARN.',
      design: 'One lifecycle CLI wraps a single-node first-run mode and a three-node role mode. Preflight checks, explicit health evidence, namespaced labs, safe resets, and redacted diagnostics keep the environment understandable and recoverable.',
      start: 'Clone the repository and run `./hadoop-lab init`, `doctor`, `up standalone`, and `demo wordcount` to bring up six Hadoop daemons in one container and see a first MapReduce result.',
      boundary: 'This is a teaching and local experimentation environment, not a production Hadoop platform. It explicitly excludes Kerberos, NameNode HA, multi-host orchestration, backup, capacity planning, and operational SLAs, and web and RPC ports bind to `127.0.0.1` by default.',
      nextStep: 'Continue filling in expected evidence and automated checks across the seven labs as a reusable teaching path, and keep `doctor`, `status`, and `lesson check` exit codes reusable by teacher scripts and CI.',
    },
    highlights: [
      'One lifecycle CLI covers a single-node first run and a three-node role mode, carrying the learning path naturally into node failure and recovery.',
      'Preflight checks, explicit health evidence, namespaced labs, safe resets, and redacted diagnostics keep the environment understandable and recoverable.',
      'Uses a passing `doctor`, healthy `status` service map, WordCount result, and its lesson check as reviewable learning evidence instead of treating “containers started” as success.',
      'Supports observing a three-node downgrade and recovery so failures become part of the learning path instead of a dead end.',
      'Safe resets and redacted diagnostics help beginners recover from mistakes without deleting the whole environment.',
      'Diagnostic bundles contain only versions, condensed container state, check results, and recent logs — never `.env` or the full container environment.',
    ],
    limitations: [
      'This is a teaching and local experimentation environment, not a production Hadoop platform.',
      'It explicitly excludes Kerberos, NameNode HA, multi-host orchestration, backup, capacity planning, and operational SLAs, and it shows no invented metrics, adoption, or benchmarks.',
    ],
    links: featuredProjects[3].links.map((link) => ({ ...link, label: link.label === 'GitHub 仓库' ? 'GitHub repository' : link.label === 'GHCR 镜像' ? 'GHCR image' : link.label === '项目介绍站' ? 'Project site' : link.label })),
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
  {
    ...secondaryProjects[2],
    title: 'Hadoop Lab project site',
    status: 'Live',
    tags: ['Cloudflare Pages', 'Static site', 'Teaching'],
    description: 'The zero-dependency bilingual project site for Hadoop Lab, built and deployed separately from this site.',
    linkLabel: 'View project site',
  },
];

export const secondaryProjectsEn = secondaryTranslations;
