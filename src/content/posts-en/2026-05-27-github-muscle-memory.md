---
title: From Zero to Shipping — Four Weeks to Make GitHub Muscle Memory
date: 2026-05-27
tags: [Tech, Git]
toc: true
description: A four-week, project-based path through Git, GitHub, branches, pull requests, Actions, releases, and the basic habits of an open-source repository.
ogImage: ../../assets/posts/github-muscle-memory/cover.webp
ogImageAlt: Cover image for a four-week beginner's guide to GitHub
license: CC BY-NC-ND 4.0
---

<aside>
<h3>About this piece</h3>

This is the four-week route I would give someone opening GitHub for the first time. Instead of memorising vocabulary, you build one real project and repeat the small loops—commit, push, pull request, review, merge—until they stop feeling ceremonial.

<h3>Who it is for</h3>

- Someone who has heard of GitHub but still wants to close the tab on sight
- A beginner who would rather learn through a real project than isolated commands
- Anyone building a first repository, published site, and basic collaboration workflow

<h3>How to read it</h3>

- To get one full loop working, follow Week 0 through Week 2
- For automation, jump to Week 3
- For repository polish, use Week 4 and the reference sections
- When one command is blocking you, go directly to the command, commit, or glossary tables

<h3>Copyright and note</h3>

This is a practical learning route I completed and then rewrote for beginners. GitHub interfaces, permissions, and product behaviour change; verify details against the current environment when they matter.

<h3>First publication and sharing</h3>

- First published in Qiu's Room
- Licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/). Non-commercial redistribution is welcome with attribution and a link to the original; adaptations and commercial use are not permitted.
</aside>

I did not want to write another GitHub tutorial that feels clear while it is open and leaves you afraid to touch anything after the tab closes. I wanted to walk through the same motions often enough that they begin to belong to the body: create a repository, commit, branch, open a pull request, watch a workflow run, and publish a version someone else can see.

Two or three hours a week is enough. After four weeks you may still look up commands, but a conflict, review, or red CI check should no longer feel like a message from somebody else's profession.

## Why four weeks?

GitHub learning often fails in two directions. A thirty-minute “complete course” feels productive and vanishes the next day. A giant curriculum lasts long enough to become another abandoned purchase.

I prefer one small, complete loop each week:

| Week | Focus | Something you can show | Time |
| --- | --- | --- | --- |
| **0** | Environment | Git, editor, identity, and SSH working together | 1 hour |
| **1** | First repository and site | A live GitHub Pages project | 2–3 hours |
| **2** | Branches and pull requests | A merged PR and one resolved conflict | 2–3 hours |
| **3** | Actions and release | A green workflow and a tagged release | 2–3 hours |
| **4** | Open-source basics | A repository another person can understand | 2 hours |

The visible result at the end of each week is fuel. You are not waiting four weeks to feel progress.

## Week 0 · Make the tools talk to one another

Before the project begins, separate two names that beginners often merge:

> **Git** is the local history engine. **GitHub** is a hosted collaboration service built around Git repositories.

Configure the identity attached to commits:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

Then complete this minimum setup:

- Create a GitHub account
- Install Git and verify `git --version`
- Generate a device-specific SSH key and register the public key with GitHub
- Install an editor you are willing to spend four weeks in
- Run `ssh -T git@github.com` and confirm GitHub recognises the account

SSH is the part most likely to block the rest. If the authentication test fails, stop and fix it now; otherwise every later week will keep tripping over the same unfinished foundation.

## Week 1 · Put something online

The first loop is:

```text
edit locally → git add → git commit → git push → site updates
```

Create a repository named `YOUR_USERNAME.github.io`, clone it, and add a small `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My first GitHub project</title>
  </head>
  <body>
    <h1>Hello, GitHub.</h1>
    <p>I shipped this page instead of waiting for it to become perfect.</p>
  </body>
</html>
```

Commit and push it:

```bash
git status
git add index.html
git commit -m "feat: add first homepage"
git push -u origin main
```

Open `https://YOUR_USERNAME.github.io`. The page can be ugly. This week's purpose is not design; it is proving that a local file can travel through Git and appear on the public web.

Before moving on, be able to explain these in your own words: repository, commit, working tree, staging area, remote, push, pull, `.gitignore`, and README.

## Week 2 · Stop treating `main` as a workbench

A branch is not an advanced feature. It is a safe place to make one coherent change before asking to merge it into the main line.

```bash
git switch -c feat/about-section
# edit files
git add .
git commit -m "feat(home): add about section"
git push -u origin feat/about-section
```

Open a pull request on GitHub. A useful PR answers three things:

- What changed?
- Why was it needed?
- How can another person verify it?

Review the diff before merging. Then merge the PR and update the local `main` branch:

```bash
git switch main
git pull --ff-only
git branch -d feat/about-section
```

### Resolve one conflict on purpose

Conflicts become less frightening after one controlled encounter. Create two branches that edit the same line, merge one, then try to merge the other. Git marks the competing text:

```text
<<<<<<< HEAD
the current branch
=======
the incoming branch
>>>>>>> other-branch
```

Choose the final text, remove the markers, stage the file, and commit the resolution. Do not reach for `git reset --hard` simply because the file looks alarming. A conflict is Git asking for a human decision, not reporting that the repository is broken.

I recommend four small PRs during this week rather than one large one. Repetition is the point.

## Week 3 · Let the repository check itself

GitHub Actions runs work in response to repository events. The simplest useful model is:

```text
event → workflow → job → steps
```

Create `.github/workflows/check.yml`:

```yaml
name: Check

on:
  push:
    branches: [main]
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check required files
        run: |
          test -f README.md
          test -f index.html
```

Push the workflow on a branch and open a PR. Read the Actions log whether it is green or red. A red workflow is most useful when you can answer: which step failed, what command returned a non-zero exit code, and what changed when it passed again?

### Connect an issue to the change

Create an issue describing a small improvement, assign it to a milestone, and mention it in the PR:

```text
Closes #1
```

When the PR merges, GitHub closes the issue. This is the first taste of a project leaving a trace of *why* work happened, not only *what* files changed.

### Publish a release

Use semantic versions as a communication tool:

```text
v1.2.3
 │ │ └─ patch: compatible fix
 │ └─── minor: compatible feature
 └───── major: incompatible change
```

For this project, `v0.1.0` is enough. Write a short release note that tells a reader what exists and where to try it.

## Week 4 · Make the repository legible to a stranger

At this stage, the project works. Now make it possible for someone else—or your future self—to enter without guessing.

### README

A useful README answers:

1. What is this?
2. Why does it exist?
3. How do I run or view it?
4. What is deliberately out of scope?
5. Where should a bug or contribution go?

### Pull-request template

`.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## What changed

- A short summary

## Why

- The problem or motivation

## How to verify

- [ ] Concrete command, page, or behaviour to check

## Screenshots

Before → After, when the change is visual
```

### Issue templates

A bug report should ask for the problem, reproduction steps, expected and actual behaviour, environment, and relevant logs. A feature request should ask what problem needs solving before it asks for a preferred implementation.

### CONTRIBUTING and licence

Keep `CONTRIBUTING.md` short enough to follow. Explain the branch and PR flow, local verification, commit style, and code of conduct. Choose a licence intentionally; without one, “the code is public” does not automatically mean other people may reuse it.

### `.gitignore`

Start with the things that should never become repository history:

```text
.env
.env.*
!.env.example
node_modules/
dist/
.DS_Store
*.log
```

If a secret is ever committed, removing it from the latest file is not enough. Revoke or rotate the credential because Git history may still contain it.

## Ten mistakes I made early

1. **Committing passwords or API keys.** Ask whether a file is safe to show a stranger before staging it.
2. **Working directly on `main`.** Use a branch as the buffer for each change.
3. **Putting unrelated work in one commit.** A commit should tell one understandable story.
4. **Writing messages such as `update`.** Future you will need more context.
5. **Using force push without understanding the remote history.** Prefer `--force-with-lease` only when rewriting is intentional and coordinated.
6. **Ignoring remote changes until push fails.** Fetch and inspect before integrating; do not merge blindly.
7. **Committing dependencies and build output.** Establish `.gitignore` on day one.
8. **Forgetting the licence.** Public visibility is not permission to reuse.
9. **Opening a PR with no why or how-to-test.** Make review possible.
10. **Using destructive recovery commands in a panic.** Inspect `git status`, make a backup branch, and understand what will be discarded first.

## Commands I actually reach for

```bash
# Inspect
git status
git log --oneline --decorate --graph
git diff
git diff --staged

# Commit
git add path/to/file
git commit -m "feat: describe the change"
git commit --amend

# Synchronise
git fetch
git pull --ff-only
git push

# Branches
git switch -c branch-name
git switch main
git merge branch-name
git branch -d branch-name

# Undo deliberately
git restore path/to/file
git reset --soft HEAD~1
git revert <commit>
```

## Conventional Commits, in brief

```text
<type>(<scope>): <description>
```

| Type | Use it for |
| --- | --- |
| `feat` | A user-visible capability |
| `fix` | A bug fix |
| `docs` | Documentation only |
| `style` | Formatting with no behaviour change |
| `refactor` | Structural change without a feature or fix |
| `perf` | Performance work |
| `test` | Test coverage or test infrastructure |
| `chore` | Maintenance and tooling |

The convention is useful because it makes history scannable. It is not a substitute for a clear sentence.

## A small glossary

- **Repository**: a project plus its Git history
- **Clone**: a local copy connected to a remote repository
- **Fork**: a server-side copy under another account
- **Origin**: the conventional name of the primary remote
- **HEAD**: the reference to the commit currently checked out
- **Staging area**: the proposed contents of the next commit
- **Working tree**: the files as they currently exist on disk
- **Upstream**: the remote branch a local branch tracks
- **Pull request**: a proposal to review and merge changes
- **CI/CD**: automated integration, testing, delivery, or deployment
- **SemVer**: a versioning convention shaped like `major.minor.patch`

## What I hope remains after four weeks

If you complete the four weeks, you will have a live site, several pull requests, an Actions workflow, and a release. Those are not trophies. They are evidence that you have personally travelled through `commit → push → PR → review → merge`.

The first HTML can be ugly. The first commit message can be clumsy. The first PR can have two lines. In my experience, one complete imperfect loop teaches more than polishing the first step until the project never moves.

At the end of each week, write one sentence: where did I get stuck, and how did I get out? Months later, that unremarkable note may be the part that saves you.

After Week 4, do not immediately invent a larger curriculum. Put the project in a profile, fix a typo in an open-source repository, or build one more small tool. Choose something you already want to make and keep the same rhythm.

The feeling I want this guide to leave is not “I have finished learning GitHub.” It is quieter and more useful: the next time I want to build something, I know where to begin, and I know a mistake does not mean I cannot find my way back.
