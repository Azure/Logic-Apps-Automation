---
title: Foundry Hosted Agents
description: Learn how Foundry Hosted Agents run container-based agents for Azure Logic Apps Automation workflows.
sidebar:
  order: 9
  badge:
    text: preview
    variant: tip
---

In Azure Logic Apps Automation, a *Foundry Hosted Agent* is an agent that runs in a hosted container in Microsoft Foundry. You create and manage the agent from an automation app, and then select the agent in one or more workflows in that app.

:::note
This capability is in preview and subject to the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/). If your environment enables this capability, the user experience appears in the [portal](https://auto.azure.com).
:::

Use a Foundry Hosted Agent when your workflow needs:

- A container-based agent hosted by Microsoft Foundry.
- A model deployment from your Foundry project.
- System instructions and user prompts that can change for each workflow run.
- Files or skills uploaded before the agent starts.
- Workflow actions that the agent can call as tools.
- Generated files that later workflow actions can use.

## How Foundry Hosted Agents work

Azure Logic Apps Automation separates agent setup from workflow authoring:

1. In your app, create a Foundry Hosted Agent by selecting a subscription, AI account, Foundry project, and model deployment.
1. Azure Logic Apps Automation creates the hosted agent and completes its identity, permission, and readiness setup.
1. In the workflow designer, add a **Foundry Hosted agent** action and select the hosted agent.
1. For each run, the workflow sends the system message, user message, input files, and available tools to the hosted agent.
1. The hosted agent runs in Microsoft Foundry and returns its final response and generated files to the workflow.

The workflow app uses its system-assigned managed identity when it invokes the hosted agent. The agent uses its own identity when it accesses the selected model deployment.

## Foundry agent options

Foundry Hosted Agents are different from Foundry prompt agents:

| Foundry Hosted Agent | Foundry prompt agent |
|---|---|
| Runs in a hosted container. | Uses a declarative agent configured through prompts, a model, and tools. |
| Supports input files, skills, workflow tools, and generated file outputs. | Uses the capabilities configured on the Foundry agent. |
| Requires agent provisioning and readiness setup before use. | Uses a Foundry Agent Service connection. |
| Appears on the app's **Agents** page for management and diagnostics. | Is configured directly in the workflow designer. |

## Agent lifecycle

The app's **Agents** page shows the Foundry Hosted Agents that belong to the app. An agent can have one of the following states:

| State | Meaning |
|---|---|
| **Connected** | Setup completed and the agent is ready for workflow runs. |
| **Provisioning** | The agent container or its identity and permissions are still being prepared. |
| **Authentication failed** | A required identity doesn't have access to the Foundry resources. |
| **Agent error** | The hosted agent reported an error. |
| **Update available** | The hosted container version doesn't match the expected version. |
| **Unreachable** | Azure Logic Apps Automation couldn't reach the hosted agent. |
| **Status unknown** | The current status couldn't be determined. |

Open an agent to review its setup progress, configuration, identities, and diagnostics. The setup process performs the following checks:

1. Verifies that the hosted agent is active.
1. Discovers the hosted agent identities.
1. Assigns the required permissions.
1. Verifies that the container is ready.

If a step fails, you can retry from that step, rerun all setup steps, or recreate the agent.

## Workflow inputs and outputs

A Foundry Hosted Agent action accepts:

- A system message that defines the agent's role and constraints.
- A user message that describes the task for the current run.
- Input files from the trigger or earlier workflow actions.
- Files marked as skills for GitHub Copilot skill discovery.
- Workflow actions that the agent can call as tools.

The action returns:

| Output | Description |
|---|---|
| `lastAssistantMessage` | The agent's final response. |
| `fileOutputs` | Files generated during the hosted agent session. Each item includes `path`, `content`, and `size`. |

For setup instructions and output expressions, see [Create and use a Foundry Hosted Agent](/guides/create-foundry-hosted-agents/).

## Related content

- [Agents](/features/agents/)
- [Create and use a Foundry Hosted Agent](/guides/create-foundry-hosted-agents/)
- [Runs and monitoring](/features/runs-and-monitoring/)
