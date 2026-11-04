---
title: Foundry Prompt Agent
description: Use a declarative Foundry prompt agent from the workflow designer.
---

## Overview

Choose **Foundry prompt agent** when you want to use an agent configured in Microsoft Foundry through a Foundry Agent Service connection.

## Setup requirements

Before you run a Foundry prompt agent action:

- Add an agent action and select **Foundry prompt agent**.
- Select or create a compatible Foundry Agent Service connection.
- Choose the target Foundry agent and review its configuration.
- Validate the tools and behavior offered for that agent in the designer.

## Build path

Use this sequence:

1. Add the Foundry prompt agent action.
1. Configure the connection on the **Connect** or **Connection** path shown in the designer.
1. Provide the task input in **User message** and any required context.
1. Save and run the workflow, then review run details.

## Choosing prompt versus hosted

Use **Foundry prompt agent** when the declarative Foundry connection flow is sufficient.

Use **Foundry Hosted agent** when you need the hosted-agent lifecycle and diagnostics managed from the app's **Agents** page.

## Related content

- [The options and how to choose](/guides/agent-options/)
- [Foundry Hosted Agents](/features/foundry-hosted-agents/)
- [Create and use a Foundry Hosted Agent](/guides/create-foundry-hosted-agents/)
