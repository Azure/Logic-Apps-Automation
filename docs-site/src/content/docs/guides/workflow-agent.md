---
title: Workflow Agent
description: Configure and use a workflow-defined agent.
---

## Overview

Choose **Workflow agent** when you want to define the agent directly in the workflow designer, including prompts and tool access.

## Setup requirements

Before you run a Workflow agent action:

- Add an agent action and select **Workflow agent**.
- Configure or select a supported model connection.
- Prepare the system and user messages.
- Add only the tools needed for the task.

For detailed field references, see [Native agent concepts and components](/features/agents/#native-agent-concepts-and-components).

## Build path

Use this sequence:

1. Add the Workflow agent action.
1. Configure **System message** and **User message** with task-specific instructions.
1. Add built-in and custom tools as needed.
1. Configure timeout and loop settings for expected task duration.
1. Save and run the workflow, then inspect run history.

## Output usage

Use Workflow agent outputs in downstream actions by referencing action outputs. For expression patterns, see [How a native agent works](/features/agents/#how-a-native-agent-works).

## Related content

- [The options and how to choose](/guides/agent-options/)
- [Ways of orchestrating agents](/guides/orchestrate-agents/)
- [Tools for agents](/guides/agent-tools/)
