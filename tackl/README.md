# Tackl CLI

Scaffolds [Tackl](https://github.com/12-studio/tackl) — the animation-first Next.js starter kit — **into the current directory**. Made for the "empty git repo" workflow: create your repo, clone it, run one command.

## Usage

```bash
mkdir my-app && cd my-app   # or clone your empty repo and cd in
bunx tackl                  # or: bun create tackl / npm create tackl@latest
```

You'll be asked which CMS to use — **DatoCMS**, **Sanity**, or **None** — and the scaffold is pruned to match: only the chosen adapter, its dependencies, its docs, and its `.env.example` block survive.

Choosing **Sanity** sets the whole thing up: an embedded Studio at `/studio`, example schemas, and draft-mode preview routes ship in the scaffold, and the CLI offers to run `sanity init` for you — logging in, creating/linking a project, and writing your `.env`. Scaffold → `bun run dev` → `/studio` → start editing.

On your first `bun run dev`, a **setup wizard** greets you in the browser: it walks through every theme token (colours, spacing, motion, fonts, the type scale), writes your answers into `src/theme`, then deletes itself — skip it to keep the starter defaults. The scaffold commit the CLI makes is your restore point if you ever want to run it again.

## What it does

1. Verifies the directory is empty (an existing `.git`, `.gitignore`, `README.md` or `LICENSE` is fine — your repo's `.git` and remote are kept)
2. Downloads the latest tagged release of the template (falls back to `main` if none)
3. Prunes repo-only cargo (the CLI itself, `.github`) and the unused CMS adapter
4. Sets your package name, initialises git if needed, and runs `bun install`

## Options

```
--cms <dato|sanity|none>   Skip the CMS prompt
--name <name>              Package name (default: directory name)
--ref <tag|branch>         Template ref (default: latest release)
--no-install               Skip dependency installation
--no-git                   Skip git init (an existing .git is always kept)
```
