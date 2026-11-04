---
title: The options and how to choose
description: Compare the four agent choices and pick the right setup path.
---

## Overview

Use this page as the decision entry point for the agent choices in the workflow designer.

The **Choose an Agent** picker can show four choices: **Workflow agent**, **Managed agent**, **Foundry prompt agent**, and **Foundry Hosted agent**. Other quick-add menus can show a subset and different labels, and availability can vary by environment.

## Compare the four choices

| Option | When to use | Setup and requirements | Type-specific entry |
|---|---|---|---|
| **Workflow agent** | You want to define prompts and tools directly in the workflow. | Add a Workflow agent action and select a supported model connection in the designer. | [Workflow Agent](/guides/workflow-agent/) |
| **Managed agent** | You need code and file tasks with sandbox and repository capabilities. | Configure the managed harness, sandbox settings, repositories, and any required files. | [Managed Agent](/guides/managed-agent/) |
| **Foundry prompt agent** | You want a declarative Foundry agent configured with prompts, model, and tools. | Select or create a compatible Foundry Agent Service connection, then choose the Foundry agent in the designer. | [Foundry Prompt Agent](/guides/foundry-prompt-agent/) |
| **Foundry Hosted agent** | You need a hosted container-based Foundry agent with setup and diagnostics managed from the app's **Agents** page. | Create the hosted agent first, finish setup until status is **Connected**, then select it in the workflow. | [Foundry Hosted Agent](/features/foundry-hosted-agents/) |

## Decision path

Use these questions in order:

1. Do you need a Foundry-hosted container agent managed on the app's **Agents** page? If yes, use [Foundry Hosted Agent](/features/foundry-hosted-agents/).
1. Do you need sandbox and repository-oriented code/file work? If yes, use [Managed Agent](/guides/managed-agent/).
1. Do you already have a declarative Foundry agent and connection flow? If yes, use [Foundry Prompt Agent](/guides/foundry-prompt-agent/).
1. Otherwise, start with [Workflow Agent](/guides/workflow-agent/) for in-workflow prompts and tools.

## Related content

- [Ways of orchestrating agents](/guides/orchestrate-agents/)
- [Agents](/features/agents/)
- [Create and use a Foundry Hosted Agent](/guides/create-foundry-hosted-agents/)
