# Crewlight Project Brief

## Naming

- Display name: `Crewlight`
- Repository slug: `Crewlight`
- Repository URL: `https://github.com/QianQIUlp/Crewlight`
- Release used as the portfolio reference: `v0.4.0`

## Current Status

Crewlight v0.4.0 is an archived prototype / reference release, not an actively maintained production product.

The upstream README describes v0.4.0 as a known-bug, no-longer-maintained prototype preserved for reference. GitHub's repository metadata does not currently mark the repository itself as archived, so portfolio copy must keep this status scoped to the prototype and reference release.

## Confirmed Facts

- Crewlight is described as a local activity radar for AI coding agents and a local-first visibility layer for concurrent agent work.
- Crewlight Desktop is the primary v0.4.0 user experience on Windows x64.
- The floating companion is a secondary persistent surface, the browser dashboard is a secondary developer and inspection surface, and the CLI is the advanced setup, ingest, scripting, diagnostics, and standalone surface.
- The desktop app includes Home, Doctor, Agents, Companion, Demo, Appearance, Settings, and About surfaces.
- Documented integration levels cover Claude Code hooks, Codex hooks, Codex `notify`, OpenCode, a Cursor manual / experimental bridge, and manual / custom ingest.
- OpenCode is implemented with verification pending. Cursor support is explicit-command-only and does not claim automatic lifecycle observation.
- Crewlight is local-first and read-only with respect to agent control.
- Its stated boundaries include no cloud service, no private API scraping, no automatic permission approval, no prompt, transcript, or tool I/O retention, and no persisted session history in v0.4.0.
- The browser dashboard is loopback-only and does not expose a mutation API.

## Portfolio Positioning

Present Crewlight as a local-first developer tool for seeing which AI coding agents are active, need attention, failed, or may be stale.

Keep the surface hierarchy explicit: Windows Desktop first, floating companion second, browser dashboard for developer inspection, and CLI for advanced or automated workflows.

Do not present Crewlight as a generic dashboard, cloud observability service, agent orchestrator, permission approver, transcript archive, or mature long-term product.

## Display Copy Guidance

- Keep the archived prototype / reference-only status visible in the project metadata and case-study boundary.
- Describe integration maturity precisely instead of saying Crewlight supports every AI coding tool.
- Keep privacy claims limited to the documented v0.4.0 boundaries.
- Do not claim active maintenance, production readiness, cloud sync, automatic permission approval, complete agent control, or persistent session history.
- Do not make release artifact availability part of the portfolio copy because the upstream README and release notes differ on one desktop archive.
- Use `summary`, `positioning`, `caseStudy`, `highlights`, and `limitations` from `src/data/projects.ts` for the visible page copy.

## Links

- Repository: `https://github.com/QianQIUlp/Crewlight`
- English README: `https://github.com/QianQIUlp/Crewlight/blob/main/README.md`
- Chinese README: `https://github.com/QianQIUlp/Crewlight/blob/main/README.zh-CN.md`
- Product positioning: `https://github.com/QianQIUlp/Crewlight/blob/main/docs/product/positioning.md`
- Integration boundaries: `https://github.com/QianQIUlp/Crewlight/blob/main/docs/integration-boundaries.md`
- Browser dashboard: `https://github.com/QianQIUlp/Crewlight/blob/main/docs/dashboard.md`
- v0.4.0 release: `https://github.com/QianQIUlp/Crewlight/releases/tag/v0.4.0`
