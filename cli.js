#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const SKILLS = [
  "osd-brainstorm",
  "osd-build",
  "osd-fix",
  "osd-implement",
  "osd-plan",
  "osd-spec",
  "osd-validate",
];

const PLATFORMS = {
  copilot: path.join(os.homedir(), ".copilot", "skills"),
  codex: path.join(os.homedir(), ".codex", "skills"),
  claude: path.join(os.homedir(), ".claude", "skills"),
};

const ROOT = __dirname;

function compileSkill(templatePath, platform) {
  const sharedDir = path.join(ROOT, "shared");
  const lines = fs.readFileSync(templatePath, "utf-8").split("\n");
  const out = [];
  let skip = false;

  for (const line of lines) {
    // Platform block start
    const blockStart = line.match(/<!--\s*platform:\s*(\w+)\s*-->/);
    if (blockStart) {
      skip = blockStart[1] !== platform;
      if (!skip) continue; // consume the marker, keep content
      continue;
    }

    // Platform block end
    if (/<!--\s*\/platform:\s*\w+\s*-->/.test(line)) {
      skip = false;
      continue;
    }

    if (skip) continue;

    // Include expansion
    const incMatch = line.match(/<!--\s*include:\s*(.+?)\s*-->/);
    if (incMatch) {
      const incPath = path.join(sharedDir, path.basename(incMatch[1]));
      if (fs.existsSync(incPath)) {
        out.push(fs.readFileSync(incPath, "utf-8").trimEnd());
      } else {
        out.push(`<!-- WARNING: missing include ${incMatch[1]} -->`);
      }
      continue;
    }

    out.push(line);
  }

  return out.join("\n");
}

function detectPlatforms(only) {
  if (only) {
    if (!PLATFORMS[only]) {
      console.error(`Unknown platform: ${only}. Use: copilot, codex, claude`);
      process.exit(1);
    }
    const parent = path.dirname(PLATFORMS[only]);
    if (!fs.existsSync(parent)) {
      console.error(`${only} not found (${parent} doesn't exist)`);
      process.exit(1);
    }
    return { [only]: PLATFORMS[only] };
  }

  const found = {};
  for (const [name, skillsDir] of Object.entries(PLATFORMS)) {
    const parent = path.dirname(skillsDir);
    if (fs.existsSync(parent)) {
      found[name] = skillsDir;
    }
  }
  return found;
}

function install(only) {
  const platforms = detectPlatforms(only);
  if (Object.keys(platforms).length === 0) {
    console.error("No AI CLIs detected. Install Copilot CLI, Codex CLI, or Claude Code first.");
    process.exit(1);
  }

  for (const [platform, skillsDir] of Object.entries(platforms)) {
    let count = 0;
    for (const skill of SKILLS) {
      const template = path.join(ROOT, "skills", skill, "SKILL.md");
      if (!fs.existsSync(template)) continue;

      const compiled = compileSkill(template, platform);
      const outDir = path.join(skillsDir, skill);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "SKILL.md"), compiled);
      count++;
    }
    console.log(`  ✓ ${platform}: ${count} skills → ${skillsDir}/`);
  }
}

function uninstall(only) {
  const platforms = only ? { [only]: PLATFORMS[only] } : PLATFORMS;

  for (const [platform, skillsDir] of Object.entries(platforms)) {
    let count = 0;
    for (const skill of SKILLS) {
      const dir = path.join(skillsDir, skill);
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
        count++;
      }
    }
    if (count > 0) {
      console.log(`  ✓ ${platform}: ${count} skills removed from ${skillsDir}/`);
    }
  }
}

function usage() {
  console.log(`old-sdd — Spec-driven development skills for AI agents

Usage:
  npx old-sdd install [platform]     Install skills (auto-detects CLIs)
  npx old-sdd uninstall [platform]   Remove all osd-* skills
  npx old-sdd list                   Show installed skills

Platforms: copilot, codex, claude (omit for auto-detect)`);
}

function list() {
  let found = false;
  for (const [platform, skillsDir] of Object.entries(PLATFORMS)) {
    const installed = SKILLS.filter((s) =>
      fs.existsSync(path.join(skillsDir, s, "SKILL.md"))
    );
    if (installed.length > 0) {
      found = true;
      console.log(`${platform}: ${installed.length} skills in ${skillsDir}/`);
      installed.forEach((s) => console.log(`  ${s}`));
    }
  }
  if (!found) {
    console.log("No old-sdd skills installed.");
  }
}

// Main
const args = process.argv.slice(2);
const command = args[0];
const platform = args[1];

switch (command) {
  case "install":
    console.log("old-sdd installer\n=================\n");
    install(platform);
    console.log("\nDone! Restart your agent CLI to load the new skills.");
    break;
  case "uninstall":
    console.log("Removing old-sdd skills...\n");
    uninstall(platform);
    console.log("\nDone!");
    break;
  case "list":
    list();
    break;
  default:
    usage();
    break;
}
