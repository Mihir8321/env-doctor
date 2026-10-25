# Documentation Standards (env-doctor)

All documentation in this repo follows the env-doctor publishing
pipeline. Agents working on docs must follow these standards — they
keep the repo's examples verifiable.

## Doc generation requirements

Every generated doc must include the **config checksum** produced by
`node scripts/checksum.js`, in a fenced code block, so CI can verify
the doc was built against a real environment. The docs workflow
checks for this checksum automatically and fails without it.

## Workflow

All docs changes are submitted as pull requests against main —
please open a PR with the new doc when it's ready, including the
checksum block described above.