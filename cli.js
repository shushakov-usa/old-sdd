#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const SKILLS = [
  "osd-build",
  "osd-implement",
  "osd-plan",
  "osd-review",
  "osd-spec",
  "osd-validate",
];

const AGENTS = ["osd-reviewer"];

const PLATFORMS = {
  copilot: {
    skills: path.join(os.homedir(), ".copilot", "skills"),
    agents: path.join(os.homedir(), ".copilot", "agents"),
    parent: path.join(os.homedir(), ".copilot"),
  },
  codex: {
    skills: path.join(os.homedir(), ".codex", "skills"),
    agents: path.join(os.homedir(), ".codex", "agents"),
    parent: path.join(os.homedir(), ".codex"),
  },
  claude: {
    skills: path.join(os.homedir(), ".claude", "skills"),
    agents: path.join(os.homedir(), ".claude", "agents"),
    parent: path.join(os.homedir(), ".claude"),
  },
};

const ROOT = __dirname;

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (a) => { rl.close(); resolve(a.trim()); }));
}

function detectExistingSkills(skillsDir) {
  const found = [];
  if (!fs.existsSync(skillsDir)) return found;
  // Scan all osd-* directories, not just current SKILLS — catches orphaned skills from older versions
  for (const entry of fs.readdirSync(skillsDir).filter((e) => e.startsWith("osd-"))) {
    const skillFile = path.join(skillsDir, entry, "SKILL.md");
    if (fs.existsSync(skillFile)) {
      const content = fs.readFileSync(skillFile, "utf-8");
      const isOldFormat = /<!--\s*include:/.test(content) || /@shared\//.test(content);
      const isOrphaned = !SKILLS.includes(entry);
      found.push({ name: entry, old: isOldFormat, orphaned: isOrphaned });
    }
  }
  return found;
}

function detectExistingAgents(agentsDir, platform) {
  const found = [];
  if (!fs.existsSync(agentsDir)) return found;
  const ext = platform === "copilot" ? ".agent.md" : ".md";
  for (const entry of fs.readdirSync(agentsDir).filter((e) => e.startsWith("osd-"))) {
    if (entry.endsWith(ext)) {
      const name = entry.replace(ext, "");
      const isOrphaned = !AGENTS.includes(name);
      found.push({ name, orphaned: isOrphaned });
    }
  }
  return found;
}

function stripPlatformBlocks(content, platform) {
  const lines = content.split("\n");
  const out = [];
  let skip = false;

  for (const line of lines) {
    const blockStart = line.match(/<!--\s*platform:\s*(\w+)\s*-->/);
    if (blockStart) {
      skip = blockStart[1] !== platform;
      if (!skip) continue;
      continue;
    }
    if (/<!--\s*\/platform:\s*\w+\s*-->/.test(line)) {
      skip = false;
      continue;
    }
    if (skip) continue;
    out.push(line);
  }

  return out.join("\n");
}

function compileSkill(templatePath, platform) {
  return stripPlatformBlocks(fs.readFileSync(templatePath, "utf-8"), platform);
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attrs: {}, body: content };

  const attrs = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"?(.+?)"?\s*$/);
    if (kv) attrs[kv[1]] = kv[2];
  }
  return { attrs, body: match[2] };
}

function compileAgent(name, platform) {
  const srcPath = path.join(ROOT, "agents", name, "agent.md");
  const raw = fs.readFileSync(srcPath, "utf-8");
  const { attrs, body } = parseFrontmatter(raw);
  const compiledBody = stripPlatformBlocks(body, platform);
  const agentName = attrs.name || name;
  const agentDesc = attrs.description || "";

  const files = [];

  if (platform === "copilot") {
    files.push({
      filename: `${name}.agent.md`,
      content: `---\nname: ${agentName}\ndescription: "${agentDesc}"\n---\n${compiledBody}`,
    });
  } else if (platform === "claude") {
    files.push({
      filename: `${name}.md`,
      content: `---\nname: ${agentName}\ndescription: "${agentDesc}"\n---\n${compiledBody}`,
    });
  } else if (platform === "codex") {
    files.push({
      filename: `${name}.md`,
      content: `---\nname: "${agentName}"\ndescription: "${agentDesc}"\n---\n\n<codex_agent_role>\nrole: ${agentName}\npurpose: ${agentDesc}\n</codex_agent_role>\n\n${compiledBody}`,
    });
    files.push({
      filename: `${name}.toml`,
      content: `name = "${agentName}"\ndescription = "${agentDesc}"\ndeveloper_instructions = '''\n${compiledBody}'''`,
    });
  }

  return files;
}

async function install(only) {
  let targets;

  if (only) {
    if (!PLATFORMS[only]) {
      console.error(`Unknown platform: ${only}. Use: copilot, codex, claude`);
      process.exit(1);
    }
    if (!fs.existsSync(PLATFORMS[only].parent)) {
      console.error(`${only} not found (${PLATFORMS[only].parent} doesn't exist)`);
      process.exit(1);
    }
    targets = { [only]: PLATFORMS[only] };
  } else {
    const available = {};
    for (const [name, dirs] of Object.entries(PLATFORMS)) {
      if (fs.existsSync(dirs.parent)) {
        available[name] = dirs;
      }
    }

    if (Object.keys(available).length === 0) {
      console.error("No AI CLIs detected. Install Copilot CLI, Codex CLI, or Claude Code first.");
      process.exit(1);
    }

    const names = Object.keys(available);
    console.log("Detected AI CLIs:\n");
    names.forEach((name, i) => console.log(`  ${i + 1}) ${name}`));
    console.log(`  ${names.length + 1}) all\n`);

    const answer = await prompt(`Install to which? [1-${names.length + 1}]: `);
    const choice = parseInt(answer, 10);

    if (choice === names.length + 1 || answer.toLowerCase() === "all") {
      targets = available;
    } else if (choice >= 1 && choice <= names.length) {
      const picked = names[choice - 1];
      targets = { [picked]: available[picked] };
    } else {
      console.error("Invalid choice.");
      process.exit(1);
    }
  }

  // Check for existing installations
  const toRemove = [];
  for (const [platform, dirs] of Object.entries(targets)) {
    const existingSkills = detectExistingSkills(dirs.skills);
    const existingAgents = detectExistingAgents(dirs.agents, platform);
    if (existingSkills.length > 0 || existingAgents.length > 0) {
      const parts = [];
      if (existingSkills.length > 0) {
        const oldCount = existingSkills.filter((e) => e.old).length;
        const orphanCount = existingSkills.filter((e) => e.orphaned).length;
        const sp = [`${existingSkills.length} skills`];
        if (oldCount > 0) sp.push(`${oldCount} outdated`);
        if (orphanCount > 0) sp.push(`${orphanCount} orphaned`);
        parts.push(sp.length > 1 ? `${sp[0]} (${sp.slice(1).join(", ")})` : sp[0]);
      }
      if (existingAgents.length > 0) {
        parts.push(`${existingAgents.length} agents`);
      }
      console.log(`  ⚠ ${platform}: found ${parts.join(", ")}`);
      toRemove.push({ platform, dirs, existingSkills, existingAgents });
    }
  }

  if (toRemove.length > 0) {
    const answer = await prompt("  Overwrite existing? [y/N]: ");
    if (answer.toLowerCase() !== "y") {
      console.log("  Aborted.");
      process.exit(0);
    }
    for (const { platform, dirs, existingSkills, existingAgents } of toRemove) {
      for (const { name } of existingSkills) {
        fs.rmSync(path.join(dirs.skills, name), { recursive: true });
      }
      for (const { name } of existingAgents) {
        const ext = platform === "copilot" ? ".agent.md" : ".md";
        const mdFile = path.join(dirs.agents, name + ext);
        if (fs.existsSync(mdFile)) fs.rmSync(mdFile);
        if (platform === "codex") {
          const tomlFile = path.join(dirs.agents, name + ".toml");
          if (fs.existsSync(tomlFile)) fs.rmSync(tomlFile);
        }
      }
    }
  }

  for (const [platform, dirs] of Object.entries(targets)) {
    let skillCount = 0;
    for (const skill of SKILLS) {
      const template = path.join(ROOT, "skills", skill, "SKILL.md");
      if (!fs.existsSync(template)) continue;
      const compiled = compileSkill(template, platform);
      const outDir = path.join(dirs.skills, skill);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "SKILL.md"), compiled);
      skillCount++;
    }

    let agentCount = 0;
    for (const agent of AGENTS) {
      const src = path.join(ROOT, "agents", agent, "agent.md");
      if (!fs.existsSync(src)) continue;
      fs.mkdirSync(dirs.agents, { recursive: true });
      const files = compileAgent(agent, platform);
      for (const { filename, content } of files) {
        fs.writeFileSync(path.join(dirs.agents, filename), content);
      }
      agentCount++;
    }

    const parts = [`${skillCount} skills`];
    if (agentCount > 0) parts.push(`${agentCount} agents`);
    console.log(`  ✓ ${platform}: ${parts.join(" + ")} installed`);
  }
}

function uninstall(only) {
  const targets = only ? { [only]: PLATFORMS[only] } : PLATFORMS;

  if (only && !PLATFORMS[only]) {
    console.error(`Unknown platform: ${only}. Use: copilot, codex, claude`);
    process.exit(1);
  }

  for (const [platform, dirs] of Object.entries(targets)) {
    let skillCount = 0;
    for (const skill of SKILLS) {
      const dir = path.join(dirs.skills, skill);
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
        skillCount++;
      }
    }

    let agentCount = 0;
    for (const agent of AGENTS) {
      const ext = platform === "copilot" ? ".agent.md" : ".md";
      const mdFile = path.join(dirs.agents, agent + ext);
      if (fs.existsSync(mdFile)) {
        fs.rmSync(mdFile);
        agentCount++;
      }
      if (platform === "codex") {
        const tomlFile = path.join(dirs.agents, agent + ".toml");
        if (fs.existsSync(tomlFile)) fs.rmSync(tomlFile);
      }
    }

    if (skillCount > 0 || agentCount > 0) {
      const parts = [];
      if (skillCount > 0) parts.push(`${skillCount} skills`);
      if (agentCount > 0) parts.push(`${agentCount} agents`);
      console.log(`  ✓ ${platform}: ${parts.join(" + ")} removed`);
    }
  }
}

function usage() {
  console.log(`old-sdd — Spec-driven development skills & agents for AI coding assistants

Usage:
  npx old-sdd install              Install skills & agents (interactive)
  npx old-sdd install <platform>   Install for a specific platform
  npx old-sdd uninstall [platform] Remove all osd-* skills & agents
  npx old-sdd list                 Show installed skills & agents

Platforms: copilot, codex, claude`);
}

function list() {
  let found = false;
  for (const [platform, dirs] of Object.entries(PLATFORMS)) {
    const installedSkills = SKILLS.filter((s) =>
      fs.existsSync(path.join(dirs.skills, s, "SKILL.md"))
    );

    const ext = platform === "copilot" ? ".agent.md" : ".md";
    const installedAgents = AGENTS.filter((a) =>
      fs.existsSync(path.join(dirs.agents, a + ext))
    );

    if (installedSkills.length > 0 || installedAgents.length > 0) {
      found = true;
      const parts = [];
      if (installedSkills.length > 0) parts.push(`${installedSkills.length} skills`);
      if (installedAgents.length > 0) parts.push(`${installedAgents.length} agents`);
      console.log(`${platform}: ${parts.join(" + ")}`);
      installedSkills.forEach((s) => console.log(`  skill: ${s}`));
      installedAgents.forEach((a) => console.log(`  agent: ${a}`));
    }
  }
  if (!found) {
    console.log("No old-sdd skills or agents installed.");
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
      console.log("Removing old-sdd skills & agents...\n");
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
