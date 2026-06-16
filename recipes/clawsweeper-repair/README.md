# Recipe: ClawSweeper repair

Narrow path for ClawSweeper integration:
- ClawSweeper remains Codex-first.
- ClawSweeper does not bundle this runtime.
- ClawSweeper may optionally call an external command socket for repair edit/review steps.
- The adapter receives only job-scoped context and returns schema-valid JSON.

Example host config:
  CLAWSWEEPER_REPAIR_ADAPTER_CMD="openai-compatible-tool-adapter exec --json -"

Example recipe input fields:
- task: repair_edit.
- target_dir: temporary checkout.
- fix_artifact.likely_files.
- fix_artifact.validation_commands.
- repair_contract.must_touch.
- repair_contract.must_not_touch.
- repair_contract.must_prove.
- allowed_files.
- allowed_pr_refs.
- validation_commands.

Upstream PR framing should be: external repair adapter hook, not OpenAI-compatible backend.
