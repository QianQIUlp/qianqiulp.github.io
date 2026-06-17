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
Recent history uses Conventional Commits with an optional scope, for example `fix(seo): ...` or `refactor(astro): ...`. Keep that format and write concise, imperative summaries; Chinese summaries are already used in this repository and are acceptable. Pull requests should include a short description, affected routes or content paths, screenshots for visible UI changes, and any manual verification performed, especially `npm run build`.

## Content & Configuration Notes
Do not commit `node_modules/`, `.astro/`, or `dist/`. Keep site-wide metadata aligned with `astro.config.mjs`, and update OG assets or canonical URLs when adding new top-level sections.
