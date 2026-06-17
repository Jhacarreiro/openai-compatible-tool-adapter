# OpenAI-compatible tool adapter

A recipe-based adapter for running tool-using agents through OpenAI-compatible chat-completions providers.

The project is intentionally not tied to ClawSweeper, Crabfleet, or any single automation system. Those live as recipes. The core adapter provides a provider client, local tool loop, textual-tool-call normalization, schema/result normalization, and capability boundaries that recipes can narrow for a specific workflow.

Current recipes:
- recipes/clawsweeper-repair: external-command contract for ClawSweeper repair edit/review steps, without adding a provider runtime to ClawSweeper core.
- recipes/crabfleet: Gallivanter/Crabfleet operational profile for local supervised automation.

Runtime shape:
  OPENAI_COMPATIBLE_ADAPTER_BASE_URL=https://api.example.com/v1
  OPENAI_COMPATIBLE_ADAPTER_MODEL=provider/model
  OPENAI_COMPATIBLE_ADAPTER_API_KEY_ENV=PROVIDER_API_KEY
  PROVIDER_API_KEY=...
  openai-compatible-tool-adapter exec --cd /path/to/repo --json -

Design principles:
1. Keep provider/runtime logic outside host projects.
2. Use job-scoped capability inputs: allowed files, allowed PR refs, validation commands, and output schemas.
3. Do not pass broad credentials by default.
4. Treat GitHub/token access as recipe-owned and allowlisted by construction.
5. Keep host-project PRs small: add an external command socket, not a full parallel model runtime.

Status: initial extraction from the ClawSweeper OpenAI-compatible backend experiment plus later repair-hardening work. Local-first until API and recipe contracts are stable.

## Codex-compatible command shape

The adapter accepts the command shape used by Codex-style hosts:



The  subcommand,  flag, and trailing  are accepted for compatibility. Provider selection and credentials come from  environment variables or recipe-specific wrappers.
