#!/bin/bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_SRC="$REPO_DIR/skills"
SHARED_DIR="$REPO_DIR/shared"
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
  echo "Compiles skill templates with shared content inlined."
  echo "Re-run after 'git pull' to update installed skills."
}

# Compile a SKILL.md template:
# 1. Expand <!-- include: shared/file.md --> markers
# 2. Keep/remove <!-- platform: X --> blocks based on target
compile_skill() {
  local src_file="$1"
  local target_platform="$2"
  local content
  content=$(cat "$src_file")

  # Expand include markers
  local line
  while IFS= read -r line; do
    if [[ "$line" =~ ^'<!-- include: '(.+)' -->'$ ]]; then
      local inc_path="${BASH_REMATCH[1]}"
      local full_path="$REPO_DIR/$inc_path"
      if [ -f "$full_path" ]; then
        cat "$full_path"
        echo ""
      else
        echo "<!-- WARNING: $inc_path not found -->"
      fi
    else
      echo "$line"
    fi
  done <<< "$content" | {
    # Process platform blocks: keep matching, remove non-matching
    local in_block=""
    local keep_block=""
    while IFS= read -r line; do
      if [[ "$line" =~ ^'<!-- platform: '(.+)' -->'$ ]]; then
        in_block="yes"
        local block_platform="${BASH_REMATCH[1]}"
        if [ "$block_platform" = "$target_platform" ]; then
          keep_block="yes"
        else
          keep_block=""
        fi
        continue
      fi
      if [[ "$line" =~ ^'<!-- /platform: ' ]]; then
        in_block=""
        keep_block=""
        continue
      fi
      if [ -n "$in_block" ]; then
        if [ -n "$keep_block" ]; then
          echo "$line"
        fi
      else
        echo "$line"
      fi
    done
  }
}

install_platform() {
  local platform="$1"
  local cli_dir="$HOME/.$platform"

  mkdir -p "$cli_dir/skills"

  local count=0
  for skill_dir in "$SKILLS_SRC"/osd-*; do
    local skill_name
    skill_name=$(basename "$skill_dir")
    local src_file="$skill_dir/SKILL.md"

    if [ ! -f "$src_file" ]; then
      continue
    fi

    local dest_dir="$cli_dir/skills/$skill_name"
    mkdir -p "$dest_dir"

    # Compile template → self-contained SKILL.md
    compile_skill "$src_file" "$platform" > "$dest_dir/SKILL.md"
    count=$((count + 1))
  done

  echo "  ✓ $platform: $count skills → $cli_dir/skills/"
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
echo "Done! Run 'git pull && ./install.sh' in $REPO_DIR to update."

