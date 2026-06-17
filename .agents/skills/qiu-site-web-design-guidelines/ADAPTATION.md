# Adaptation

## Local Name

- Upstream name: `web-design-guidelines`
- Local repo-specific name: `qiu-site-web-design-guidelines`

## Local Scope

Adapted for Qiu's Astro static site and PR #52 review:

- Static Astro pages and Markdown content.
- Shared CSS design system.
- Long-form Chinese reading experience.
- Home, blog archive, projects, and article routes.

## Behavior Changes

- Removed the upstream instruction to fetch fresh remote guidelines before each review.
- Added `references/web-interface-guidelines.md` as the local audit checklist.
- Added explicit no-runtime-remote-fetch policy.
- Adapted audit output to include severity and fix recommendations for PR documentation.
- Removed React/Next-specific assumptions from recommendations.

## Non-Goals

- This skill does not install frontend packages.
- This skill does not authorize package, route, schema, or framework changes.
- This skill does not require Playwright or browser dependencies.
