# Recipe: local supervised automation

Generic profile for local supervised automation.

This recipe is intentionally more operational than the reusable core adapter. It can choose stronger execution posture, local provider routing, and project-specific policy while keeping the generic provider/tool-loop code in this repository.

## Typical local environment

```bash
export OPENAI_COMPATIBLE_ADAPTER_BASE_URL="https://api.example.com/v1"
export OPENAI_COMPATIBLE_ADAPTER_MODEL="provider/model"
export OPENAI_COMPATIBLE_ADAPTER_API_KEY_ENV="PROVIDER_API_KEY"
export PROVIDER_API_KEY="...real secret..."
export OPENAI_COMPATIBLE_ADAPTER_MAX_TURNS=0
export OPENAI_COMPATIBLE_ADAPTER_MAX_TOKENS=0
```

GitHub access, when needed:

```bash
export GH_TOKEN="..."
export GITHUB_TOKEN="$GH_TOKEN"
```

Keep those values in the process manager or local secret store, not in this repository.

## Separation of concerns

- Provider/runtime code lives in this repo.
- Runtime secrets and deployment-specific paths live outside git.
- Host projects should expose small external-command hooks.
- Local allowlists decide which recipes may run and with which arguments.
- Publish/push/comment/merge steps remain host-controlled, not adapter-controlled.
