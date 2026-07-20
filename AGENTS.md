# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro static site. Source files live in `src/`, with route pages under `src/pages/`, shared layout in `src/layouts/BaseLayout.astro`, reusable UI in `src/components/`, and global styles in `src/styles/`. Blog posts are Markdown files in `src/content/posts/` and must match the schema in `src/content.config.ts`. Images and OG assets belong in `src/assets/`. Build output is generated into `dist/` and should not be committed.

## Build, Test, and Development Commands
Use `npm install` to restore dependencies. Use `npm run dev` to start the local Astro dev server. Use `npm run build` to generate the production site into `dist/`. Use `npm run preview` to serve the built output locally for a final check. GitHub Pages deploys from `main` through [`.github/workflows/deploy.yml`](/workspaces/qianqiulp.github.io/.github/workflows/deploy.yml).

## Coding Style & Naming Conventions
Follow the existing Astro style: ES modules, 2-space indentation, and simple component props with explicit names. Keep page and asset names lowercase and URL-safe. Blog posts should use dated slugs such as `YYYY-MM-DD-topic.md`. Match the existing frontmatter keys exactly: `title`, `date`, `tags`, `description`, and optional OG/license fields. Prefer editing shared styles in `src/styles/global.css` or `src/styles/blog.css` instead of adding inline CSS.

## Testing Guidelines
There is no automated test suite configured yet. Treat `npm run build` as the required validation step for every content or layout change because it verifies Astro routes, content collections, and static generation. For UI changes, also run `npm run preview` and manually check the home page, `/blog/`, `/projects/`, and any changed post route.

## Commit & Pull Request Guidelines
Recent history uses Conventional Commits with an optional scope, for example `fix(seo): ...` or `refactor(astro): ...`. Keep that format and write concise, imperative summaries; Chinese summaries are already used in this repository and are acceptable. Agents must start code changes on a dedicated non-`main` branch, make the smallest coherent commits that preserve a meaningful state, and open or update a pull request themselves after pushing. Pull requests should include a short description, affected routes or content paths, screenshots for visible UI changes, and any manual verification performed, especially `npm run build`.

## Content & Configuration Notes
Do not commit `node_modules/`, `.astro/`, `dist/`, `.playwright-cli/`, or `scripts/.signature-font-source.ttf`. Keep site-wide metadata aligned with `astro.config.mjs`, and update OG assets or canonical URLs when adding new top-level sections.

## Visual Design Contract
All visual changes are governed by `docs/uiux/ink-and-light-study.md`（墨光书房：界画四原则、昼宣/夜墨双主题、朱砂印章、QiuBrush 书体、显影动效）. Read it before touching styles or components, follow the manual checks in `docs/qa/visual-checklist.md`, and update the contract plus `.agents/skills/qiu-site-frontend-design/` when changing any system it describes. Scene asset regeneration prompts live in `docs/asset-prompts/`. The brush font subset is regenerated with `scripts/subset-signature-font.py` after editing `scripts/signature-font-chars.txt`.

## Project Copy Notes
Before editing `/projects/` or project showcase copy, read `src/data/projects.ts` and `docs/project-briefs/docker-hadoop-cluster.md` so project names, URLs, evidence, and positioning stay consistent.
