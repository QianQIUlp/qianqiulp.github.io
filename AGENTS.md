# Repository Guidelines

## Project Structure & Module Organization
This repository contains two independent Astro static sites. Qiu's Room stays at the repository root; its source files live in `src/`, with routes under `src/pages/`, shared layout in `src/layouts/BaseLayout.astro`, reusable UI in `src/components/`, and global styles in `src/styles/`. The English-first developer profile lives in `developer/` with its own package, Astro config, styles, and public assets. Blog posts are Markdown files in `src/content/posts/` and must match the schema in `src/content.config.ts`. Build output is generated into `dist/` and `developer/dist/`; neither should be committed.

## Build, Test, and Development Commands
Use `npm install` to restore Room dependencies and `npm --prefix developer install` for the developer profile. Use `npm run dev` or `npm run dev:developer` to start the respective local site. Use `npm run build:all` to build both sites, or `npm run build` / `npm run build:developer` separately. GitHub Actions only verifies both builds. Cloudflare Pages deploys `room.qiu.works` from the repository root and `qiu.works` from `developer/`, both from `main` with Node `22.23.1`.

## Coding Style & Naming Conventions
Follow the existing Astro style: ES modules, 2-space indentation, and simple component props with explicit names. Keep page and asset names lowercase and URL-safe. Blog posts should use dated slugs such as `YYYY-MM-DD-topic.md`. Match the existing frontmatter keys exactly: `title`, `date`, `tags`, `description`, and optional OG/license fields. Prefer editing shared styles in `src/styles/global.css` or `src/styles/blog.css` instead of adding inline CSS.

## Testing Guidelines
There is no automated test suite configured yet. Treat `npm run build:all` as the required validation step for cross-site changes. For Room-only work, `npm run build` remains sufficient; for developer-profile-only work, use `npm run build:developer`. For UI changes, preview the affected site and manually check its localized routes, theme, responsive layouts, and changed links.

## Commit & Pull Request Guidelines
Recent history uses Conventional Commits with an optional scope, for example `fix(seo): ...` or `refactor(astro): ...`. Keep that format and write concise, imperative summaries; Chinese summaries are already used in this repository and are acceptable. Agents must start code changes on a dedicated non-`main` branch, make the smallest coherent commits that preserve a meaningful state, and open or update a pull request themselves after pushing. Pull requests should include a short description, affected routes or content paths, screenshots for visible UI changes, and any manual verification performed, especially `npm run build`.

## Content & Configuration Notes
Do not commit `node_modules/`, `.astro/`, `dist/`, or `.playwright-cli/`. Keep site-wide metadata aligned with `astro.config.mjs`, and update OG assets or canonical URLs when adding new top-level sections.

## Visual Design Contract
Room visual changes follow the modern, person-first direction documented in `docs/uiux/homepage-art-direction.md`, `docs/uiux/person-first-intent.md`, and `docs/uiux/ink-and-light-study.md`. Preserve the real room, guitar, three distinct project effects units, warm light, restrained red accent, progressive discovery, Light/Dark themes, and comfortable long-form reading. The user-approved dual-homepage additions are limited to the documented identity anchor, developer/contact links, VeriSilo project entry, stable project anchors, and localized Room social cards; historical quotes remain untouched. Developer-profile changes follow `docs/uiux/developer-workbench.md`: editorial workbench, warm neutral palette, clear grid, restrained serif/mono accents, and no room-scene background, terminal skin, logo wall, or generic SaaS cards. Read the applicable contracts before touching styles or components, follow `docs/qa/visual-checklist.md`, and update the contract plus `.agents/skills/qiu-site-frontend-design/` when changing a governed system. Scene asset regeneration prompts live in `docs/asset-prompts/`.

## Project Copy Notes
Before editing `/projects/` or project showcase copy, read `src/data/projects.ts` and `docs/project-briefs/docker-hadoop-cluster.md` so project names, URLs, evidence, and positioning stay consistent.
