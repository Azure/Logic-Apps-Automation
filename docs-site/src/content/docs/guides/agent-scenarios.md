---
title: Agent scenarios
description: Plan workflows that use an agent with a sandbox and knowledge.
---

## Overview

These scenarios show how to organize an agent workflow. Use fictional or approved test data, and confirm the available agent, sandbox, knowledge, and connection options in your environment before you begin.

## Review code with an agent and sandbox

Use this pattern when an agent needs to inspect a repository as part of a larger workflow.

1. Prepare an authorized test repository and the input you want the agent to inspect. Use a connection with the minimum access needed.
1. Create a workflow and add a **Managed agent**. Review its managed model and configure the available sandbox and repository settings.
1. Give the agent a specific task, such as summarizing a small code change and identifying questions for a reviewer.
1. Add a later workflow action to use the agent's output, and review the workflow before testing it.
1. Inspect the agent and tool details in [run history](/features/runs-and-monitoring/). Check the output and any external effects before using the result.

For setup guidance, see [Choose an agent](/features/agents/#managed-agent) and [Sandbox setup overview](/guides/create-sandboxes/).

## Use knowledge and a sandbox

Use this pattern when a task needs both reference material and a code-capable environment. First confirm that an agent in your environment offers the knowledge and sandbox settings needed for the task.

1. Prepare a knowledge source and confirm that its owner permits the agent to use the information.
1. Configure the agent's available knowledge and sandbox settings. Give it only the access and files needed for the task.
1. Ask a specific question that identifies the expected result and the information the agent should use.
1. Review the agent's output and the available run details. Check the answer against the source before acting on it.

For setup guidance, see [Knowledge setup overview](/guides/create-knowledge-bases/) and [Sandbox setup overview](/guides/create-sandboxes/).

## Related content

- [Agents](/features/agents/)
- [Tools for agents](/guides/agent-tools/)
- [Knowledge bases](/features/knowledge-bases/)
