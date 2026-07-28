# Crewlight Project Brief

## Naming

- Display name: `Crewlight`
- Repository slug: `Crewlight`
- Repository URL: `https://github.com/QianQIUlp/Crewlight`
- Current stabilization candidate: `v0.5.0`
- Latest public release: `v0.4.0`

## Current Status

Crewlight is a local activity radar for AI coding agents. The current development line is the `v0.5.0` stabilization candidate; it has not been released. The newest public release remains `v0.4.0`.

Linux x64 has completed local fixes and verification. Windows x64 and macOS x64/arm64 have not completed hands-on fixes and verification, so the portfolio must not describe those platforms as fixed, verified, downloadable, production-ready, or complete.

This stabilization round completed Linux x64 build, standalone, daemon, dashboard, ingest, status, and doctor smoke verification. All 55 test files and 690 tests passed. The active stability work is tracked in PR #33.

## Confirmed Facts

- Crewlight is local-first and read-only with respect to agent control.
- It gathers running, waiting, permission-request, completed, and failed states from concurrent AI coding work without retaining prompts, transcripts, tool I/O, or complete platform payloads.
- Current sessions can be organized in Desktop, floating Companion, browser Dashboard, and CLI surfaces.
- The default network boundary is the local loopback; it does not depend on a cloud service, control agents, or automatically approve permissions.
- Explicit safety boundaries cover event size, timeouts, duplicate notifications, malformed input, SSH host verification, and notifier failures.
- Sessions remain in memory only, retaining at most the latest 1,000 by default; stable events are exactly deduplicated during their retention period.
- Existing adapters have been data-minimized and protocol-corrected. Unreliable automatic setup for MiMo, Pi Agent, OpenClaw, and Reasonix is temporarily disabled.

## Portfolio Positioning

Present Crewlight as a local-first activity radar for developers running parallel AI coding agents. Its read-only Desktop, Companion, Dashboard, and CLI surfaces help show which task is running, waiting, requesting permission, complete, or failed without exposing complete work contents.

Do not present it as a cloud observability service, agent orchestrator, permission approver, transcript archive, complete cross-platform release, or production-ready product.

## Display Copy Guidance

- Use the visible status `稳定化中 / v0.5.0 候选版本` and the subtitle `本地优先的 AI Agent 活动雷达`.
- State that only Linux x64 has completed local fixes and verification; name Windows x64 and macOS x64/arm64 as pending hands-on repair and verification.
- Keep the public-release boundary explicit: `v0.5.0` has no Release and the newest public Release is `v0.4.0`.
- Keep the 55 test files / 690 tests result scoped to this validation round; do not infer unverified platform support from it.
- Limit visible project actions to the repository, Chinese README, and the real `v0.4.0` Release URL. Never invent a `v0.5.0` download link.
- Use `summary`, `positioning`, `caseStudy`, `highlights`, and `limitations` from `src/data/projects.ts` for the visible page copy.

## Links

- Repository: `https://github.com/QianQIUlp/Crewlight`
- Stability PR: `https://github.com/QianQIUlp/Crewlight/pull/33`
- Chinese README: `https://github.com/QianQIUlp/Crewlight/blob/main/README.zh-CN.md`
- Latest public release (`v0.4.0`): `https://github.com/QianQIUlp/Crewlight/releases/tag/v0.4.0`
