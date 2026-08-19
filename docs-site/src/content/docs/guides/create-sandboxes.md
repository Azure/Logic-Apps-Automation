---
title: Create sandboxes - Azure Logic Apps Automation
description: Create isolated virtual machine environments where agents can run code, optionally work with repositories, and invoke skills.
sidebar:
  order: 3
  badge:
    text: preview
    variant: tip
---

# Create sandboxes for your project

In Azure Logic Apps Automation, create a [*sandbox*](/features/sandboxes/) as an isolated compute environment where [agents](/features/agents/) can run code in workflows. 

> [!NOTE]
>
> This capability is in preview and subject to the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/). If your project enables this capability, the user experience appears in the [portal](https://auto.azure.com).

## Requirements

- A Microsoft work or school account in the same Microsoft Entra tenant as the project creator-owner.

  Your account must exist in the same tenant so the project creator-owner can add you to the project. You don't need an Azure subscription to create apps and workflows in an automation project.

- Access to the [Azure Logic Apps Automation portal](https://auto.azure.com).

- Access to your automation [project](/features/projects-and-applications/#project).

- **Contributor** or **Author** role on the [project resource](/features/projects-and-applications/#project) to create sandboxes.

  > [!NOTE]
  >
  > The project **Reader** role doesn't have enough permissions to create sandboxes.

  If you don't have project access, contact the project creator-owner so they can add you with the required permissions.

- An [app](/features/projects-and-applications/#apps) in your project.

- A [workflow](/features/workflows/) in your app and a [coding agent](/features/agents#native-agent-concepts-and-components) in the workflow.

## Just-in-time sandbox

This sandbox provides the fastest and easiest way for you to try running code in an isolated environment.

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), open your project, app, and workflow.

1. On the workflow designer, select the coding agent action.

1. In the action information window, select the **Agent harness** tab.

   :::image type="content" source="media/create-sandboxes/agent-harness.png" alt-text="Screenshot shows the automation portal with an open project, app, and workflow in the designer. The coding agent is selected so the information pane is open and the Agent Harness tab is selected." lightbox="media/create-sandboxes/agent-harness.png":::

1. Under **Execution environment**, for **Harness type**, select **GHCP (GitHub Copilot)** as the harness runtime to use for agent execution.

   **GHCP (GitHub Copilot)** is the default harness and the only available option at this time.

1. Under **Sandbox configuration**, for **Sandbox**, keep the default base image.

   To create and use your own sandbox, see [Prebuilt sandbox](#prebuilt-sandbox).

1. To optionally add files from upstream actions for the agent to process, follow these steps:

   1. In the coding agent information window, select the **Parameters** tab.

   1. In the **Input files** section, select **Add item**.
   
   1. For **Name**, enter a name for the item.

   1. For **Content**, enter an expression that gets the body output from an upstream action in your workflow.

      For example, the following expression gets the output from an action named **Get blob**:

      `@{body('Get_blob')}`

1. When you finish, close the action information window.

   When the workflow runs again, the agent runs code inside the sandbox.

## Prebuilt sandbox

When your agent needs to work with your code repositories, set up a prebuilt disk image that includes your cloned repositories and installed skills. You can then use this sandbox to set up your agent harness. Subsequent workflow runs spin up instances from this image to reduce cold starts.

### Step 1 - Create the sandbox

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), open your project.

1. On the project sidebar, select **Sandboxes**, and then select **Create**.

   :::image type="content" source="media/create-sandboxes/create-sandbox.png" alt-text="Screenshot shows the automation portal with an open project, Sandboxes menu item selected and Create button selected." lightbox="media/create-sandboxes/create-sandbox.png":::

1. In the sandbox setup window, provide the following information:

   | Property | Description |
   |---|---|
   | **Name** | The name for the sandbox. Use only lowercase letters, numbers, and hyphens. Workflows reference this sandbox name. |
   | **Resource tier** | The compute capacity and resources for the sandbox. |
   | **Repositories** | For each repository, provide the following information: <br><br>- **URL**: The HTTPS URL for the Azure DevOps or GitHub repository. <br>- **Branch**: The branch to clone. <br>- **Auth type**: The required authentication. |

   The following table shows the authentication that sandboxes support:

   | Authentication | Azure DevOps | GitHub |
   |---|---|---|
   | Managed identity | Yes, give repository read access to the project's managed identity | No |
   | Personal access token (PAT) | Yes | Yes |
   | OAuth | No | Yes |

1. If you specified a GitHub URL and chose **OAuth** for authentication, follow these steps:

   1. In the sandbox setup window, select **Connect GitHub**. 

   1. In the GitHub authorization window that opens, select **Authorize**.

1. To add another repository to the sandbox, select **Add repo**.

1. When you finish, select **Create**.

   The portal starts to build the sandbox, which shows the **State** property set to **Building**. The first build might take a few minutes to finish. Larger repositories can take longer.

   When the build completes, the **State** property changes from **Building** to **Ready**.

### Step 2 - Set up the agent with your sandbox

1. In your project, open your app and your workflow.

1. On the workflow designer, select the coding agent action.

1. In the action information window, select the **Agent harness** tab.

1. Under **Execution environment**, for **Harness type**, select **GHCP (GitHub Copilot)** as the harness runtime to use for agent execution.

   **GHCP (GitHub Copilot)** is the default harness and the only available option at this time.

1. Under **Sandbox configuration**, select the sandbox you created in your project.

   After you select your sandbox, the **Repository skills** section appears. If your repository has skills for your agent to use, specify those skill paths in this section.

1. To optionally point your agent at skills in your repository, provide the following information:

   | Property | Description |
   |---|---|
   | **Repository** | The repository name. |
   | **Skills folder path** | The path to the skills folder. |

1. When you finish, close the action information window.

   When the workflow runs again, the agent runs code inside the sandbox.

## Troubleshoot problems

| Problem | Try |
|---|---|
| The agent action doesn't show the agent harness tab. | Make sure you selected a coding agent, not a different action. |
| Sandbox state is stuck at `Building...` | Refresh the sandbox list. If the status for a small repository still says `Building...` for more than 10 minutes, check the repo URL and credentials. |
| Sandbox state shows `Failed` | Open the error message details for more information. Common causes: bad URL, expired PAT, managed identity needs read access. |
| Agent doesn't use your added input files. | Confirm that the file uses `.txt` or `.md` in private preview, and that the `contentType` is set in the code view if needed. |
| **GitHub OAuth dialog never finishes** | Open the dialog again, confirm you allowed access at the account level, and that the repo belongs to that account. |

## Related content

- [Sandboxes](/features/sandboxes/)
- [Agents](/features/agents/)
- [Connectors](/features/connectors/)
- [Runs and monitoring](/features/runs-and-monitoring/)