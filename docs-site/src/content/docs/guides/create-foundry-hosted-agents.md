---
title: Create and use a Foundry Hosted Agent
description: Create a Foundry Hosted Agent, finish its setup, and use it in an Azure Logic Apps Automation workflow.
sidebar:
  order: 3
---

This guide shows how to create a Foundry Hosted Agent in an Azure Logic Apps Automation app and use the agent in a workflow.

:::note
Foundry Hosted Agents are currently in preview.
:::

## Prerequisites

To create and use a Foundry Hosted Agent, you need:

- An Azure Logic Apps Automation environment and app.
- A workflow in the app.
- A Microsoft Foundry AI account and project.
- A ready chat-completion model deployment in the selected AI account.
- A system-assigned managed identity on the automation app.
- Permission to manage hosted agents and assign the required Azure roles on the selected AI account.

## Create the hosted agent

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), open your environment and app.

1. On the app sidebar, select **Agents**.

1. Select **Create agent**.

1. Provide the following information:

   | Setting | Description |
   |---|---|
   | **Subscription** | The Azure subscription that contains the Foundry resources. |
   | **AI account** | The Microsoft Foundry AI Services account where the agent runs. |
   | **Project** | The Foundry project that contains the model deployment. |
   | **Model deployment** | A ready chat-completion deployment for the agent to use. |
   | **Agent name** | A name that contains 2-63 lowercase letters, numbers, or hyphens. |

1. Select **Create agent**.

   Azure Logic Apps Automation creates the hosted agent container and saves the agent configuration.

1. When creation finishes, select **Open agent**.

## Finish agent setup

Opening a newly created agent starts the setup process. Keep the page open while Azure Logic Apps Automation completes the following steps:

1. **Verify agent is active**
1. **Discover identities**
1. **Assign permissions**
1. **Verify container readiness**

When all steps finish, the page shows that the agent is fully configured and ready to use.

If setup fails:

- Select **Retry from failed step** to continue from the failed step.
- Select **Re-run all steps** to check the complete setup again.
- Select **Recreate agent** if the hosted container couldn't be provisioned.
- Use **Diagnostics** to check the agent container, workflow app access, agent model access, and end-to-end health.

## Add the agent to a workflow

1. Open a workflow in the app.

1. On the workflow designer, add an agent and select **Foundry Hosted agent**.

1. Select the Foundry Hosted Agent action.

1. On the **Connect** tab, for **Foundry Hosted Agent**, select an agent with the **Connected** status.

   To create another agent, select **Create New**. Azure Logic Apps Automation opens the app's **Agents** page in a separate browser tab so that your workflow stays open.

   If the selected agent is still provisioning, open its setup page and wait for setup to finish before running the workflow.

1. On the **Parameters** tab, configure the agent:

   | Setting | Description |
   |---|---|
   | **System message** | Instructions that define the agent's role, behavior, and constraints. |
   | **User message** | The task for the current run. You can use workflow expressions to pass data from the trigger or earlier actions. |
   | **Input Files** | Optional files to upload before the agent runs. Provide a file name and content from an earlier workflow action. |
   | **Use as skill** | Makes an input file available as a GitHub Copilot skill instead of a regular input file. |

1. Add workflow actions as agent tools when the agent needs to call other services or workflows.

1. Save and run the workflow.

## Use the agent outputs

Use the following expression to get the final assistant response in a downstream action:

```text
@outputs('<foundry-hosted-agent-name>')?['lastAssistantMessage']
```

Use the following expression to get the files generated during the hosted agent session:

```text
@outputs('<foundry-hosted-agent-name>')?['fileOutputs']
```

Each item in `fileOutputs` contains:

| Property | Description |
|---|---|
| `path` | The generated file's relative path. |
| `content` | The file content. Text files return a string, while binary files can return a content envelope with base64-encoded data. |
| `size` | The file size in bytes. |

## Manage hosted agents

From the app's **Agents** page, you can:

- Review an agent's status, model deployment, project, and creation time.
- Open an agent to review setup progress and configuration.
- Run diagnostics and fix missing permissions.
- Reverify the complete setup.
- Delete an agent that you no longer need.

Deleting a Foundry Hosted Agent removes the agent from Microsoft Foundry and its configuration from the automation app. Azure Logic Apps Automation also attempts to remove the role assignments created for the agent and shows a warning if any assignments remain.

## Troubleshoot problems

| Problem | Try |
|---|---|
| No model deployments appear | Create a chat-completion model deployment in the selected AI account, wait until the deployment is ready, and then select **Refresh model deployments**. |
| The portal reports insufficient permissions | Confirm that you can manage agents and assign roles on the selected AI account. |
| Setup stops while discovering identities | Wait for the hosted agent to finish starting, and then retry from the failed step. |
| Setup fails while assigning permissions | Confirm that the app has a system-assigned managed identity and that your account can create role assignments. |
| The agent doesn't appear in the workflow dropdown | Finish the agent setup, return to the workflow tab, and reopen the dropdown to refresh the list. |
| The agent reports an authentication or health error | Open the agent from the **Agents** page, run **Diagnostics**, and fix any missing permissions. |

## Related content

- [Foundry Hosted Agents](/features/foundry-hosted-agents/)
- [Agents](/features/agents/)
- [Runs and monitoring](/features/runs-and-monitoring/)
