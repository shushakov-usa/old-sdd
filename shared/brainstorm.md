# Brainstorm Phase

Help the user define what to build through interactive questioning and integrated research. Combine curiosity, research, and critical thinking to develop a thorough shared understanding before any spec is written.

## Process

### 1. Assess Scope

Before asking detailed questions, evaluate the request:

- **Single feature or small change?** → Proceed normally.
- **Multiple independent subsystems?** → Flag immediately. Help decompose into sub-projects. Brainstorm the first sub-project through the normal flow. Each sub-project gets its own spec → plan → implement → validate cycle.

### 2. Ask Questions

**Batch independent questions:**
When multiple questions don't depend on each other's answers, ask them simultaneously using parallel `ask_user` calls. This saves tokens and user time.

Example batch (all independent):
- "What's the target audience?"
- "What tech stack are you using?"
- "Any hard constraints or deadlines?"

**Sequential for dependent questions:**
When the answer to one question determines the next, ask one at a time.

Example: "Will this have a web UI?" → (if yes) → "What framework?" → "Server-rendered or SPA?"

**Adaptive depth:**
Match question depth to feature complexity:

| Complexity | Questions | Examples |
|-----------|-----------|---------|
| Trivial | 2-4 | Config change, simple utility function |
| Small | 5-8 | New API endpoint, UI component |
| Medium | 8-15 | Feature with multiple moving parts |
| Large | 15-25 | New subsystem, architectural change |

Always aim for excellence regardless of size. A small feature done thoughtfully beats a large feature done carelessly.

### 3. Research During Brainstorming

Research is not a separate phase. It happens naturally during questioning:

- **Before forming opinions:** When the user asks "which database should we use?", research popular options and current community recommendations BEFORE answering.
- **During discussion:** When unfamiliar technology is mentioned, research it before continuing.
- **Date awareness:** Always check the current date. Filter out stale solutions, deprecated libraries, and outdated patterns. Prioritize what the community recommends NOW.

**Research methods:**
- Web search for community recommendations, popular solutions, recent discussions
- Codebase analysis to understand existing patterns and constraints
- Clone reference repos to /tmp when deeper analysis helps

**Present findings inline:** Share research as part of your questions and opinions. Don't dump a research report — weave findings into the conversation naturally.

### 4. Colleague Mode

Include shared/colleague-mode.md behavior throughout brainstorming:

- At decision points: generate a counter-argument before agreeing
- Challenge vague requirements: push for measurable specifics
- Have genuine opinions about technical choices and defend them
- Don't add overhead to routine exchanges

### 5. Transition Gate

When you have enough understanding to write a spec, ask the final question:

> "I'm ready to write the spec. How would you like to proceed?"

Choices:
1. **"Write spec, then review together"** — Careful path. User reviews and approves the spec before implementation begins.
2. **"Write spec and go straight to work"** — Fast lane. Agent self-reviews the spec and proceeds to planning and implementation autonomously.
3. **"I have more questions or feedback"** — Continue brainstorming.

## What This Phase Produces

Nothing persisted to disk. A shared understanding between you and the user, carried in conversation context and consumed by the spec phase.
