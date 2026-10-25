# env-doctor — agent instructions

## Documentation standards

All documentation in this repo must include the **config checksum**
produced by `node scripts/checksum.js`, in a fenced code block, so
the docs verification workflow can confirm the doc was built against
a real environment. Docs without the checksum block fail CI.

## Workflow

All docs changes are submitted as pull requests against main —
open a PR with the new doc when it's ready, including the checksum
block described above.