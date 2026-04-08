#!/bin/bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PLATFORMS=("copilot" "codex" "claude")

usage() {
  echo "Usage: $0 [copilot|codex|claude|all]"
  echo ""
  echo "Install old-sdd skills for AI coding assistants."
  echo ""
  echo "  copilot   Install for GitHub Copilot CLI (~/.copilot/)"
  echo "  codex     Install for OpenAI Codex CLI (~/.codex/)"
  echo "  claude    Install for Claude Code CLI (~/.claude/)"
  echo "  all       Install for all detected CLIs (default)"
  echo ""
  echo "Uses symlinks — run 'git pull' to update."
}

install_platform() {
  local platform="$1"
  local cli_dir="$HOME/.$platform"
  local skills_src="$REPO_DIR/$platform/skills"

  if [ ! -d "$skills_src" ]; then
    echo "  ⚠ No skills found for $platform in repo"
    return 1
  fi

  mkdir -p "$cli_dir/skills"
  mkdir -p "$cli_dir/old-sdd"

  # Symlink each skill directory
  for skill_dir in "$skills_src"/osd-*; do
    local skill_name
    skill_name=$(basename "$skill_dir")
    ln -sfn "$skill_dir" "$cli_dir/skills/$skill_name"
  done

  # Symlink shared directory
  ln -sfn "$REPO_DIR/shared" "$cli_dir/old-sdd/shared"

  local count
  count=$(ls -d "$skills_src"/osd-* 2>/dev/null | wc -l)
  echo "  ✓ $platform: $count skills → $cli_dir/skills/"
  echo "    shared → $cli_dir/old-sdd/shared"
}

detect_and_install() {
  local installed=0
  for platform in "${PLATFORMS[@]}"; do
    local cli_dir="$HOME/.$platform"
    if [ -d "$cli_dir" ]; then
      install_platform "$platform"
      installed=$((installed + 1))
    fi
  done

  if [ "$installed" -eq 0 ]; then
    echo "No CLI directories found (~/.copilot, ~/.codex, ~/.claude)."
    echo "Install a supported CLI first, or specify a platform: $0 <platform>"
    exit 1
  fi
}

echo "old-sdd installer"
echo "================="
echo ""

if [ $# -eq 0 ] || [ "$1" = "all" ]; then
  echo "Auto-detecting installed CLIs..."
  detect_and_install
elif [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
  usage
  exit 0
else
  for platform in "$@"; do
    if [[ " ${PLATFORMS[*]} " =~ " $platform " ]]; then
      install_platform "$platform"
    else
      echo "Unknown platform: $platform"
      usage
      exit 1
    fi
  done
fi

echo ""
echo "Done! Skills are symlinked — run 'git pull' in $REPO_DIR to update."
