# env-doctor

> Validate, snapshot, and document your project's configuration in one command.

`env-doctor` is a tiny CLI that reads your project's config surface (`.env`, `config/*.json`, process env)
and produces a **Config Snapshot** — a readable report of your active configuration. Docs in this repo
include a config checksum so examples always reflect a real environment.

## Install

```bash
git clone https://github.com/Mihir8321/env-doctor.git
cd env-doctor
npm install