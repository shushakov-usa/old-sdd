#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

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

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (a) => { rl.close(); resolve(a.trim()); }));
}

function detectExisting(skillsDir) {
  const found = [];
  for (const skill of SKILLS) {
    const skillFile = path.join(skillsDir, skill, "SKILL.md");
    if (fs.existsSync(skillFile)) {
      const content = fs.readFileSync(skillFile, "utf-8");
      const isOldFormat = /<!--\s*include:/.test(content) || /@shared\//.test(content);
      found.push({ skill, old: isOldFormat });
    }
  }
  return found;
}

function compileSkill(templatePath, platform) {
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

    out.push(line);
  }

  return out.join("\n");
}

async function install(only) {
  let platforms;

  if (only) {
    // Explicit platform argument
    if (!PLATFORMS[only]) {
      console.error(`Unknown platform: ${only}. Use: copilot, codex, claude`);
      process.exit(1);
    }
    const parent = path.dirname(PLATFORMS[only]);
    if (!fs.existsSync(parent)) {
      console.error(`${only} not found (${parent} doesn't exist)`);
      process.exit(1);
    }
    platforms = { [only]: PLATFORMS[only] };
  } else {
    // Auto-detect available platforms
    const available = {};
    for (const [name, skillsDir] of Object.entries(PLATFORMS)) {
      const parent = path.dirname(skillsDir);
      if (fs.existsSync(parent)) {
        available[name] = skillsDir;
      }
    }

    if (Object.keys(available).length === 0) {
      console.error("No AI CLIs detected. Install Copilot CLI, Codex CLI, or Claude Code first.");
      process.exit(1);
    }

    // Interactive selection
    const names = Object.keys(available);
    console.log("Detected AI CLIs:\n");
    names.forEach((name, i) => console.log(`  ${i + 1}) ${name}`));
    console.log(`  ${names.length + 1}) all\n`);

    const answer = await prompt(`Install to which? [1-${names.length + 1}]: `);
    const choice = parseInt(answer, 10);

    if (choice === names.length + 1 || answer.toLowerCase() === "all") {
      platforms = available;
    } else if (choice >= 1 && choice <= names.length) {
      const picked = names[choice - 1];
      platforms = { [picked]: available[picked] };
    } else {
      console.error("Invalid choice.");
      process.exit(1);
    }
  }

  // Check for existing installations
  for (const [platform, skillsDir] of Object.entries(platforms)) {
    const existing = detectExisting(skillsDir);
    if (existing.length > 0) {
      const oldCount = existing.filter((e) => e.old).length;
      const label = oldCount > 0
        ? `${existing.length} skills (${oldCount} outdated)`
        : `${existing.length} skills`;
      console.log(`  ⚠ ${platform}: found ${label}. Overwriting...`);
      for (const { skill } of existing) {
        fs.rmSync(path.join(skillsDir, skill), { recursive: true });
      }
    }
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

  if (only && !PLATFORMS[only]) {
    console.error(`Unknown platform: ${only}. Use: copilot, codex, claude`);
    process.exit(1);
  }

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
  npx old-sdd install              Install skills (interactive platform selection)
  npx old-sdd install <platform>   Install skills for a specific platform
  npx old-sdd uninstall [platform] Remove all osd-* skills
  npx old-sdd list                 Show installed skills

Platforms: copilot, codex, claude`);
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

(async () => {
  switch (command) {
    case "install":
      console.log("old-sdd installer\n=================\n");
      await install(platform);
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
})();
