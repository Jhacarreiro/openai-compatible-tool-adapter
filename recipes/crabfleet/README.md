# Recipe: Crabfleet / Gallivanter

Operational profile for Gallivanter/Crabfleet automation.

This recipe can choose stronger local execution posture than a reusable upstream integration, including supervised danger-full-access workflows, local model/provider routing, and project-specific repair policies.

Recommended separation:
- Keep provider/runtime code in this repo.
- Keep production secrets and local paths outside git.
- Keep ClawSweeper upstream integration to a small external-command socket.
- Keep Crabfleet-specific policy in this recipe/profile.

Example local environment:
  OPENAI_COMPATIBLE_ADAPTER_BASE_URL=https://api.pioneer.ai/v1
  OPENAI_COMPATIBLE_ADAPTER_MODEL=deepseek-ai/DeepSeek-V4-Pro
  OPENAI_COMPATIBLE_ADAPTER_API_KEY_ENV=PIONEER_API_KEY
  OPENAI_COMPATIBLE_ADAPTER_MAX_TURNS=25
  OPENAI_COMPATIBLE_ADAPTER_MAX_TOKENS=0
