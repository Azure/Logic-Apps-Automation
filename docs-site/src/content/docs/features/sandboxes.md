---
title: Sandboxes
description: Learn about isolated virtual machine environments where agents can run code, optionally work with repositories, and invoke skills.
sidebar:
  order: 10
  badge:
    text: preview
    variant: tip
---

:::note
This capability is in preview and subject to the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/). If your environment enables this capability, the user experience appears in the [portal](https://auto.azure.com).
:::

In Azure Logic Apps Automation, a *sandbox* is an isolated compute environment where [agents](/features/agents/) can run code in workflows. This environment is a micro virtual machine image, powered by Azure Developer Compute, where your agent can perform the following tasks:

- Run shell commands and scripts, or build tools.
- Browse real file systems.
- Operate on cloned source control repositories.
- Invoke skills bundled with repositories.

You can create reusable sandbox configurations inside your environment. Workflows across apps in the same environment can use these configurations. A configuration defines the compute size and repositories that the platform puts into the sandbox image. When a Managed Agent runs, the platform starts an isolated sandbox instance from the selected configuration and cleans up that runtime instance after the run.

You set up the configuration once, including repository authentication and cloned repositories. On the Managed Agent, you can then select the configuration, add repository skills, and pass input files from earlier workflow actions. For more information, see [Create sandboxes](/guides/create-sandboxes/).

## Sandbox types

You can run agents in the following kinds of sandboxes:

| Option | When to choose |
|---|---|
| [Default sandbox](/guides/create-sandboxes/#use-the-default-sandbox) | You want a clean base image for experimentation or general code execution without cloned repositories. You don't create a configuration or wait for an image build. The sandbox starts on demand for each Managed Agent run. |
| [Prebuilt sandbox](/guides/create-sandboxes/#create-a-prebuilt-sandbox) | Your agent needs cloned repositories, repository skills, or a specific compute size. Create the configuration and build its reusable image before selecting it on a Managed Agent. |

## Prebuilt sandbox contents

A prebuilt sandbox configuration contains the following settings:

| Setting | Description |
|---|---|
| Resource tier | The CPU, memory, and disk budget for the sandbox. Available tiers range from XS through L. |
| Repositories | One or more GitHub or Azure DevOps repositories to clone into the image. |
| Repository authentication | Managed identity, personal access token (PAT), or OAuth, depending on the repository provider. |

Repository skills aren't part of the sandbox configuration itself. After you select a prebuilt sandbox on a Managed Agent, you choose a cloned repository and provide the relative path to each folder that contains a `SKILL.md` file. Azure Logic Apps Automation copies each selected folder to `.github/skills/<skill-name>/` in the sandbox, following the [GitHub Copilot CLI agent skill placement](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills). For an example, see [How Azure Logic Apps Automation places skills for GitHub Copilot](/guides/create-sandboxes/#how-azure-logic-apps-automation-places-skills-for-github-copilot).

## Build and management lifecycle

Creating, editing, or rebuilding a prebuilt sandbox starts an image build. The portal shows one of the following states:

| State | Meaning |
|---|---|
| **In progress** | The platform is cloning repositories and creating the sandbox image. |
| **Ready** | The image is available for Managed Agent runs. |
| **Failed** | The build failed. Open the sandbox details to review the error. |

Only ready configurations normally appear as choices on a Managed Agent. From the environment's **Sandboxes** page, the sandbox creator can edit, rebuild, or delete a configuration. Azure Logic Apps Automation periodically refreshes prebuilt sandbox images to include newer repository content. To pick up repository changes immediately, manually rebuild the sandbox configuration.

## Files and workspace

Each Managed Agent run receives an isolated working directory:

- Input files that you configure on the Managed Agent are uploaded before the agent starts.
- Cloned repositories appear as directories in the workspace.
- Selected skills are made available under `.github/skills`.
- Files that the agent creates at the top level of the working directory are returned in the Managed Agent's `fileOutputs`.

Each item in `fileOutputs` includes the relative `path`, file `content`, and `size` in bytes. Text content is returned as a string. Binary content can be returned as an object containing a content type and base64-encoded content.

## Access and ownership

Environment **Contributors** and **Authors** can create sandbox configurations. Sandbox creators can edit, rebuild, and delete the configurations that they own. Environment owners can delete configurations in their environment. For the complete access model, see [Permissions](/features/permissions/#sandbox-roles).

## Related content

- [Create sandboxes](/guides/create-sandboxes/)
- [Agents](/features/agents/)
- [Knowledge bases](/features/knowledge-bases/)
- [Runs and monitoring](/features/runs-and-monitoring/)
