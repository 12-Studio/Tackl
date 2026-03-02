# Bun setup export – replicate in another project

This document describes how Bun is used in this project so you can mirror the same setup elsewhere.

---

## 1. Install Bun (one-time, per machine)

```bash
# Official install script
curl -fsSL https://bun.sh/install | bash
```

Or with Homebrew (macOS):

```bash
brew install oven-sh/bun/bun
```

Verify:

```bash
bun --version
```

---

## 2. Node version

- **This project:** `package.json` has `"engines": { "node": ">=24.0.0" }`. Root `.nvmrc` contains `20` (legacy); prefer the engines field.
- **In the other project:** Set `engines.node` in `package.json` (e.g. `">=20.0.0"` or `">=24.0.0"`) and optionally add `.nvmrc` with the same major (e.g. `20` or `24`).

---

## 3. package.json changes

### Scripts that use Bun

All scripts are run with **`bun run <script>`**. No change to script bodies; only the runner is Bun.

| Script        | Command / purpose                         |
|---------------|--------------------------------------------|
| `dev`         | `bun run dev` – start dev server           |
| `build`       | `bun run build` – production build         |
| `start`       | `bun run start` – run production build    |
| `lint`        | `bun run lint` – run linter                |
| `lint:fix`    | `bun run lint:fix` – lint + fix            |
| `format`      | `bun run format` – format code             |
| `format:check`| `bun run format:check` – check only        |
| `type-check`  | `bun run type-check` – TypeScript check    |
| `outdated`    | `bun run outdated` – see outdated deps     |

### One-off commands (no script): use `bunx`

```bash
bunx npm-check-updates     # list outdated (or use bun run outdated if you add the script)
bunx npm-check-updates -u  # update package.json to latest, then run bun install
```

### Husky pre-commit

So the pre-commit hook uses Bun to run the commit script:

```json
"husky": {
  "hooks": {
    "pre-commit": "bun run commit"
  }
}
```

Replace any `npm run commit` or `pnpm run commit` with `bun run commit`.

### Outdated packages: workaround for `bun outdated`

**Issue:** `bun outdated` often returns no output even when newer versions exist (known Bun behaviour). Don’t rely on it for a full list.

**Fix:** Add a script that uses `npm-check-updates` so you get a proper report:

```json
"outdated": "bunx npm-check-updates"
```

Then run **`bun run outdated`** to see which packages are outdated. To upgrade and reinstall:

```bash
bunx npm-check-updates -u
bun install
```

Include this script in the other project so “check for updates” works reliably.

---

## 4. Lockfile: `bun.lock`

- **File:** `bun.lock` at the project root (text format in current Bun).
- **Commit it** so everyone and CI get the same dependency tree.
- **Do not** put `bun.lock` in `.gitignore`.

After the first `bun install`, you’ll have `bun.lock`. Add and commit it.

---

## 5. First-time setup in the other project

1. **Install Bun** (see section 1).

2. **Remove other package manager artifacts** (if migrating):
   ```bash
   rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock
   ```

3. **Install dependencies:**
   ```bash
   bun install
   ```
   This creates `bun.lock` and `node_modules`.

4. **Update `package.json`:**
   - Set `engines.node` if you care about Node version.
   - If you use Husky, set `"pre-commit": "bun run <your-commit-script>"` (e.g. `bun run commit`).
   - Optionally add the `outdated` script (section 3).

5. **Commit:**
   ```bash
   git add bun.lock package.json
   git commit -m "Switch to Bun; add bun.lock"
   ```

---

## 6. Day-to-day commands (cheat sheet)

```bash
bun install              # install deps (or just: bun)
bun add <pkg>            # add dependency
bun add -d <pkg>         # add devDependency
bun remove <pkg>         # remove package
bun run <script>         # run script from package.json
bun run dev              # typical dev
bun run build            # typical build
bun run start            # typical start
bunx <pkg> [args]        # run package binary once (like npx)
bun update               # update within semver in package.json
bun run outdated         # if you added the script; else bunx npm-check-updates
bun --version            # Bun version
bun pm cache rm          # clear Bun cache if needed
```

---

## 7. CI / Netlify (and similar)

So CI and Netlify use the same install and build as locally:

- **Install:** `bun install` (or `bun install --frozen-lockfile` in CI to fail if lockfile is out of date).
- **Build:** `bun run build`.

**Netlify example** (`netlify.toml`):

```toml
[build]
  command = "bun run build"

[build.environment]
  NODE_VERSION = "24"
```

Set `NODE_VERSION` to match the Node version you support (e.g. `20` or `24`). Leave **Publish directory** empty if you use the Next.js plugin.

**GitHub Actions example** (install + build):

```yaml
- uses: oven-sh/setup-bun@v2
  with:
    bun-version: latest
- run: bun install --frozen-lockfile
- run: bun run build
```

---

## 8. What not to do

- Don’t add `bun.lock` to `.gitignore`.
- Don’t run `npm install` or `pnpm install` in the same repo; use one package manager (Bun).
- Don’t rely on `bun outdated` for “what’s outdated”—it often shows nothing. Use the `outdated` script (`bun run outdated` / npm-check-updates) instead.

---

## 9. Optional: project docs

In the other project you can add a short `docs/bun.md` (or similar) that points to this export and summarizes:

- This project uses Bun for installs and running scripts.
- Install: `curl -fsSL https://bun.sh/install | bash`
- Install deps: `bun install`
- Run app: `bun run dev` / `bun run build` / `bun run start`
- Lockfile: commit `bun.lock`

---

## 10. Quick checklist for the other project

- [ ] Bun installed (`bun --version` works).
- [ ] Old lockfiles and `node_modules` removed (if migrating).
- [ ] `bun install` run; `bun.lock` created.
- [ ] `package.json`: `husky.hooks.pre-commit` uses `bun run <script>`.
- [ ] `package.json`: add `"outdated": "bunx npm-check-updates"` so you can run `bun run outdated` (since `bun outdated` is unreliable).
- [ ] `bun.lock` committed.
- [ ] CI/Netlify: build command = `bun run build`, install = `bun install` (and `NODE_VERSION` set if needed).
- [ ] README or docs updated to say “use Bun” and list the main commands above.

After this, the other project will use Bun the same way as this one.
