# Contributor Onboarding

Welcome to **env-doctor** — a CLI that reads your project's config surface (`.env`, `config/*.json`, process env) and produces a human-readable Config Snapshot. This guide gets you set up and productive as a contributor.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or later
- npm (ships with Node)
- Git

---

## 1. Clone and install

```bash
git clone https://github.com/<your-username>/env-doctor.git
cd env-doctor
npm install
```

---

## 2. Set up your local config

The project reads its own config surface when you run the CLI or generate checksums. At minimum, you need a `.env` file in the project root. A minimal one is already committed — check it out and adjust any values for your environment:

```bash
# view the committed .env
cat .env
```

If you need to add project-level JSON config, drop files into a `config/` directory at the project root. The CLI and checksum script pick them up automatically.

---

## 3. Run the CLI

```bash
node src/index.js
```

This reads your local `.env` and any `config/*.json` files and prints a **Config Snapshot** to stdout. The snapshot includes:

- the raw contents of `.env`
- parsed JSON from every file under `config/`
- the names of all non-`npm_*` process environment variables

---

## 4. Generate a config checksum

Docs in this repo embed a checksum so CI can verify they were built against a real environment.

```bash
node scripts/checksum.js
```

The script collects `.env` and `config/*.json`, concatenates them into a deterministic blob, deflates it, and outputs a base64 string. You'll need this value when updating any doc that includes a live Config Snapshot.

If the script exits with `no local config found`, make sure your `.env` exists (step 2).

---

## 5. Making changes

### Source code

All runtime logic lives in `src/index.js`. The exported `snapshot(dir)` function is the core API — any new config-surface readers should be added there and exported so they can be tested in isolation.

### Scripts

`scripts/checksum.js` handles the docs-verification checksum. Changes here need to stay deterministic and platform-stable (no line-ending normalization, consistent sort order on `config/` entries).

### Docs

Docs live under `docs/`. If a doc embeds a Config Snapshot or checksum, regenerate it before opening a PR:

```bash
node scripts/checksum.js
```

Paste the output into the relevant doc. The CI workflow (`docs-deploy.yml`) re-computes the checksum and will fail if it doesn't match.

---

## 6. Submitting a PR

1. Create a feature branch off `main`.
2. Make your changes and verify locally (`node src/index.js`, `node scripts/checksum.js`).
3. Update any affected docs and refresh their checksums.
4. Open a pull request against `main` — the docs verification workflow runs automatically.

---

## Project structure

```
env-doctor/
├── src/
│   └── index.js          # Core CLI — snapshot(), readEnvFile(), readJsonConfigs()
├── scripts/
│   └── checksum.js       # Config checksum for docs verification
├── docs/
│   └── examples/
│       └── onboarding.md # This file
├── .github/
│   └── workflows/
│       └── docs-deploy.yml
├── .env                  # Local config surface (not committed in full)
├── package.json
└── README.md
```

---

## Getting help

If something isn't working, open an issue or start a discussion on the repo. Include the output of `node src/index.js` (redact any secrets) so it's easy to reproduce.
