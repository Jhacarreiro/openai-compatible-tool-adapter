# Source map

Extracted into generic core:
- OpenAI-compatible chat-completions runner.
- Local read/write/shell/git tool loop.
- Textual/pseudo tool-call normalization.
- Result normalization and schema repair/finalization logic.
- Provider retry, request timeout, max-turn handling, max-token controls.

Not kept in host project core:
- Provider selection inside host projects.
- Bundled OpenAI-compatible runtime inside host projects.
- Broad model-controlled GitHub context helpers.
- Deployment-specific model backend config paths.

From later repair hardening, candidate generic concepts for recipes and host sockets:
- Repair contract: must_touch, must_not_touch, must_prove.
- Deterministic post-edit gates before review/commit.
- Review JSON normalization for near-schema provider output.
- Dedicated rebase-conflict mode before feature repair.
- Final schema synthesis when tool budget is exhausted.

These are documented in recipes first; host projects can adopt them narrowly without adopting this runtime.
