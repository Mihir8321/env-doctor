# env-doctor

> Validate, snapshot, and document your project's configuration in one command.

`env-doctor` is a tiny CLI that reads your project's config surface (`.env`, `config/*.json`, process env)
and produces a **Config Snapshot** — a human-readable, copy-pastable report of your active configuration.
Every doc in this repo embeds a real Config Snapshot so examples always reflect a live environment.

## Install

```bash
git clone https://github.com/<your-username>/env-doctor.git
cd env-doctor
npm install

## Documentation standards

Docs in this repo include a config checksum (`node scripts/checksum.js`)
so CI can verify they were built against a real environment. All docs
changes go through PRs to main — see the docs verification workflow.
```