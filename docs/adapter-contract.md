# External adapter contract

A host project should call adapters as external commands, not link their provider runtime.

Input should include, per recipe:
- task: repair_edit, review, review_fix, or rebase_conflict_fix.
- target_dir: checkout path.
- fix_artifact: host-specific repair artifact.
- repair_contract: must_touch, must_not_touch, must_prove.
- allowed_files: job-scoped file capability list.
- allowed_pr_refs: job-scoped PR capability list.
- validation_commands: allowed validation proof commands.

Output should be structured JSON when the host supplies a schema:
- status: completed, passed, blocked, or needs_human.
- summary.
- changed_files.
- validation.
- findings.
- evidence.

Security boundary:
- The host owns the job-scoped allowlist.
- The adapter should not receive broad secrets by default.
- GitHub context, if enabled by a recipe, must be restricted to allowed_pr_refs.
- Shell commands should be local, bounded, and recipe-policy controlled.
