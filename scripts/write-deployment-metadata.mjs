import { writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
const sha = process.env.GITHUB_SHA;
if (!sha || !/^[0-9a-f]{40}$/.test(sha))
  throw new Error("GITHUB_SHA must identify the exact build commit.");
if (!existsSync("out/index.html"))
  throw new Error("Build the Pages export before writing deployment metadata.");
writeFileSync(
  "out/deployment.json",
  JSON.stringify(
    {
      product: "Kenny AI Business Studio",
      milestone: "M6",
      commit: sha,
      sourceTree: execFileSync("git", ["rev-parse", "HEAD:src"], {
        encoding: "utf8",
      }).trim(),
      repository: process.env.GITHUB_REPOSITORY,
      branch: process.env.GITHUB_REF_NAME,
      builtAt: new Date().toISOString(),
    },
    null,
    2,
  ) + "\n",
);
console.log(`Pages metadata written for M6 commit ${sha}.`);
