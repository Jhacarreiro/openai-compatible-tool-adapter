import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeCodexResult } from "../dist/core/normalize-result.js";

const prompt = `repo: openclaw/clawsweeper
cluster_id: repair-pr-openclaw-clawsweeper-307
mode: autonomous
https://github.com/openclaw/clawsweeper/pull/307
- check_failed: pnpm check failed because format:check reported oxfmt violations in pr-repair-intake.ts
`;

test("normalizer keeps a concrete fix_artifact with validation as planned", () => {
  const result = JSON.parse(
    normalizeCodexResult(
      JSON.stringify({
        status: "planned",
        summary: "Applied oxfmt formatting to pr-repair-intake.ts for format:check.",
        needs_human: [],
        fix_artifact: {
          summary: "Applied oxfmt formatting to src/repair/pr-repair-intake.ts to fix format:check.",
          likely_files: ["src/repair/pr-repair-intake.ts"],
          validation_commands: ["corepack pnpm run format:check"],
          repair_strategy: "repair_contributor_branch",
          source_prs: ["https://github.com/openclaw/clawsweeper/pull/307"],
          pr_title: "chore: format pr repair intake",
          pr_body: "Fix oxfmt format:check failure in pr-repair-intake.ts.",
        },
      }),
      prompt,
      true,
    ),
  );
  assert.equal(result.status, "planned");
  assert.deepEqual(result.needs_human, []);
  assert.equal(result.fix_artifact?.likely_files?.[0], "src/repair/pr-repair-intake.ts");
});

test("normalizer accepts build_fix_artifact alias", () => {
  const result = JSON.parse(
    normalizeCodexResult(
      JSON.stringify({
        result: "fix_needed",
        repair_strategy: "repair_contributor_branch",
        source_prs: ["https://github.com/openclaw/clawsweeper/pull/307"],
        build_fix_artifact: {
          summary: "Fix format:check by applying oxfmt to pr-repair-intake.ts.",
          likely_files: ["src/repair/pr-repair-intake.ts"],
          validation_commands: ["corepack pnpm run format:check"],
          pr_title: "chore: format pr repair intake",
          pr_body: "Fix oxfmt format:check failure in pr-repair-intake.ts.",
        },
      }),
      prompt,
      true,
    ),
  );
  assert.equal(result.status, "planned");
  assert.equal(result.fix_artifact?.repair_strategy, "repair_contributor_branch");
  assert.deepEqual(result.needs_human, []);
});
