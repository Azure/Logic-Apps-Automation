---
title: Ways of orchestrating agents
description: Structure single-agent and multi-agent workflow orchestration paths.
---

## Overview

Agent orchestration is the workflow logic around an agent call: what input an agent receives, what tools it can call, and how later workflow actions use the result.

## Core orchestration loop

For each agent action in your workflow:

1. Pass structured context from the trigger or earlier actions into the agent's **User message**.
1. Limit tools to only the actions the agent needs for the task.
1. Use the agent output in later steps, including downstream agent steps when you build a multi-agent path.
1. Review run history details before relying on results in external systems.

For the full conceptual flow, see [How a native agent works](/features/agents/#how-a-native-agent-works).

## Single-agent pattern

Use one agent action when one reasoning step can produce the result:

- Trigger or prior action produces the input payload.
- Agent action executes with only required tools.
- A deterministic action validates, stores, or routes the output.

## Multi-agent pattern

Use more than one agent action when responsibilities are distinct:

- Agent A gathers or transforms information.
- Agent B performs a different reasoning task with Agent A's output.
- Deterministic workflow actions enforce final checks or side effects.

Keep each agent scoped. Avoid giving every tool to every agent.

## Orchestration checkpoints

Before production use, verify:

- Tool permissions match least-privilege expectations.
- Timeout and loop settings match task complexity.
- Output expressions are stable for downstream steps.
- Run history includes enough detail for support and troubleshooting.

## Related content

- [The options and how to choose](/guides/agent-options/)
- [Tools for agents](/guides/agent-tools/)
- [Runs and monitoring](/features/runs-and-monitoring/)
