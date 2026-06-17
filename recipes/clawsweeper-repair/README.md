# Recipe: ClawSweeper repair

This recipe connects ClawSweeper repair/edit/review flows to the generic OpenAI-compatible tool adapter.

The goal is to keep ClawSweeper mostly Codex-first and upstream-clean. ClawSweeper should only need a small external command hook, while provider/runtime details live here.

## Files

```text
bin/clawsweeper-repair-adapter.mjs
recipes/clawsweeper-repair/adapter.example.env
```

## Host configuration

Point ClawSweeper at the wrapper command:

```bash
export CLAWSWEEPER_MODEL_BACKEND=codex-cli
export CLAWSWEEPER_MODEL_COMMAND=/path/to/openai-compatible-tool-adapter/bin/clawsweeper-repair-adapter.mjs
```

Then configure the provider using ClawSweeper-flavoured environment names:

```bash
export CLAWSWEEPER_OPENAI_COMPATIBLE_BASE_URL="https://api.example.com/v1"
export CLAWSWEEPER_OPENAI_COMPATIBLE_MODEL="provider/model"
export CLAWSWEEPER_OPENAI_COMPATIBLE_API_KEY_ENV="PROVIDER_API_KEY"
export PROVIDER_API_KEY="...real secret..."
export CLAWSWEEPER_OPENAI_COMPATIBLE_MAX_TURNS=0
export CLAWSWEEPER_OPENAI_COMPATIBLE_MAX_TOKENS=0
```

`0` for max turns means unlimited turns inside the adapter. Use the host process timeout as the real budget.

## GitHub tokens

For repair flows that inspect PRs, provide a normal GitHub token in the process environment:

```bash
export GH_TOKEN="..."
export GITHUB_TOKEN="$GH_TOKEN"
```

The wrapper preserves or fills these aliases when possible:

```text
GH_TOKEN
GITHUB_TOKEN
CLAWSWEEPER_INVENTORY_TOKEN
CLAWSWEEPER_DISPATCH_TOKEN
```

Do not commit tokens into `adapter.example.env`, recipe files, or allowlist files.

## Expected host command shape

ClawSweeper can call the wrapper using the same shape it would use for `codex exec`:

```bash
printf "$PROMPT" | \
  /path/to/openai-compatible-tool-adapter/bin/clawsweeper-repair-adapter.mjs \
    exec \
    --cd /tmp/clawsweeper-target/repo \
    --output-last-message /tmp/clawsweeper-summary.json \
    --output-schema /path/to/schema/repair/codex-result.schema.json \
    --json -
```

The wrapper maps `CLAWSWEEPER_OPENAI_COMPATIBLE_*` to `OPENAI_COMPATIBLE_ADAPTER_*` and then calls the generic adapter.

## Recipe input expectations

The prompt/job should be job-scoped and include only what the repair worker needs:

```text
task: repair_edit or review_fix
target_dir: temporary checkout
fix_artifact.likely_files
fix_artifact.validation_commands
repair_contract.must_touch
repair_contract.must_not_touch
repair_contract.must_prove
allowed_files
allowed_pr_refs
validation_commands
```

The adapter does not publish. ClawSweeper remains responsible for validation, committing, pushing, commenting, and all policy gates.
