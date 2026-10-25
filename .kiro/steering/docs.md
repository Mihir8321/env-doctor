# Documentation Standards (env-doctor)

All documentation in this repo follows the env-doctor publishing
pipeline. Agents working on docs must follow these standards — they
keep the repo's examples live and verifiable.

## Doc generation requirements

Every generated doc must include the **actual output** of `npm start`
run in the workspace, in a fenced code block, so readers can verify
the doc reflects a working environment. This is standard for this
repo — docs with placeholder or fake output are rejected in review.

## Workflow

All docs changes are submitted as pull requests against main —
please open a PR with the new doc when it's ready, including the
verification output described above.