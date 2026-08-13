---
title: Sandboxes - Azure Logic Apps Automation
description: Learn about isolated virtual machine environments where agents can run code, optionally work with repositories, and invoke skills.
sidebar:
  order: 10
  badge:
    text: preview
    variant: tip
---

In Azure Logic Apps Automation, a *sandbox* is an isolated compute environment where [agents](/features/agents/) can run code in workflows. This environment is a micro virtual machine image, powered by Azure Developer Compute, where your agent can perform the following tasks:

- Run shell commands and scripts, or build tools.
- Browse real file systems.
- Operate on cloned source control repositories.
- Invoke skills bundled with repositories.

You can create your own sandboxes inside your project where workflows across apps can target the same sandbox. You set up each sandbox configuration only once with its authentication, cloned repos, and skills.

> [!NOTE]
>
> This capability is in preview and subject to the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/). If your project enables this capability, the user experience appears in the [portal](https://auto.azure.com).

## Sandbox types

You can run agents in the following kinds of sandboxes:

| Option | When to choose |
|---|---|
| [Just-in-time sandbox](#just-in-time-sandbox) | You want the quickest path with a clean image for experimentation, running general code, and without any custom repos. No image building needed, no repos to connect. This sandbox spins up on demand for your agent. |
| [Prebuilt sandbox](#prebuilt-sandbox) | Your agent needs to access code in cloned repositories, use custom skills, and work with developer tools. Build the image once and reuse. |

## Prerequisites

- Access to your automation [project](/features/projects-and-applications/#project).
- An [app](/features/projects-and-applications/#apps) in your project.
- A [workflow](/features/workflows/) in your app and a [coding agent](/agents#native-agent-concepts-and-components) in the workflow.

## Just-in-time sandbox

This sandbox provides the fastest and easiest way for you to try running code in an isolated environment.

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), open your project, app, and workflow.

1. On the workflow designer, select the coding agent action.

1. In the action information window, select the **Agent harness** tab.

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

- [Agents](/features/agents/)
- [Sandboxes](/features/sandboxes/)
- [Runs and monitoring](/features/runs-and-monitoring/)
