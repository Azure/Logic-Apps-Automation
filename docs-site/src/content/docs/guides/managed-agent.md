---
title: Managed Agent
description: Configure a managed agent for repository and file-oriented tasks.
---

## Overview

Choose **Managed agent** when your workflow task needs code, repository, or file-oriented work through a managed harness and sandbox-capable setup.

## Setup requirements

Before you run a Managed agent action:

- Add an agent action and select **Managed agent**.
- Review the available model and harness options in the designer.
- Configure sandbox and repository settings offered by your environment.
- Provide any required input files and skills configuration.

For current setup guidance, see [Sandbox setup overview](/guides/create-sandboxes/).

## Build path

Use this sequence:

1. Add the Managed agent action.
1. Configure **System message** and **User message** for the exact task.
1. Review **Harness** settings, including execution environment, sandbox, and repository skills.
1. Add only the tools needed for the task.
1. Save and run, then inspect run details.

## Output and controls

Managed agent outputs can feed later deterministic workflow actions. Use run settings and run history to control and audit behavior before broad rollout.

## Related content

- [The options and how to choose](/guides/agent-options/)
- [Ways of orchestrating agents](/guides/orchestrate-agents/)
- [Sandbox setup overview](/guides/create-sandboxes/)
