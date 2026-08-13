---
title: Knowledge bases - Azure Logic Apps Automation
description: Learn about attaching external knowledge sources so agents can ground their answers in your data.
sidebar:
  order: 9
  badge:
    text: preview
    variant: tip
---

In Azure Logic Apps Automation, a *knowledge base* is an external context source that an [agent](/agents/) can search during reasoning. Rather than rely only on a model's training, the agent gets the relevant information from your files, docs, code, and data to ground its answers.

> [!NOTE]
>
> This capability is in preview and subject to the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/). If your project enables this capability, the user experience appears in the [portal](https://auto.azure.com).
>
> The following items are under refinement:
>
> - Document upload size and format limits.
> - Per-source token budget controls.
> - Granular permissions on which project members can attach a source.
>
> If you encounter problems, [report a bug](../support/report-a-bug/) so your feedback can help shape future releases.

## Supported source types

You can attach multiple context sources to an agent. The runtime retrieves information across these sources and merges the top results.

| Source | Description | When to choose |
|---|---|---|
| File upload | Documents that you directly upload to an agent or projects | You want the platform to chunk and embed the content. |
| [Azure AI Search](https://learn.microsoft.com/azure/search/search-what-is-azure-search) | Search indexes that you manage in Azure AI Search | You already haves search indexes or want granular control over chunking and scoring. |
| [Microsoft Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq) | Knowledge indexes in Microsoft Foundry | You already work in the Foundry ecosystem and want managed retrieval. |
| [Microsoft 365 Copilot Work IQ](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/) | Work IQ knowledge connector | Tenant-scoped knowledge surfaced through Microsoft 365 / Work IQ |

## Create a knowledge base

Before you can attach a knowledge base, other than files to upload, create the knowledge base or add an existing source to your project. 

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), open your project.

1. On the project sidebar, select **Knowledge**.

1. Select **Add file** or **Add knowledge source** > **Add file**.

   1. Enter a name and description for your knowledge base.

   1. Drag or browse and select the files you want. Select **Add file**.

## Attach a knowledge source

1. In your workflow, on the designer, select the agent action.

1. In the agent information pane, select the **Knowledge** tab.

1. Select **Add files** or **Add knowledge source**.

   - **Add files**: Enter a name and description for your knowledge base. Drag or browse and select the files you want. Select **Add file**.
   - **Add knowledge source**: Select the knowledge sources you want.

1. When you're done, close the pane.

At the next run time, the agent retrieves related information from the source before calling the model. The agent queries each attached source by using agent's instructions and inputs. The agent adds the top results to the model's context. The model chooses which results to cite, if any.

## Troubleshoot information retrieval problems

To debug problems related to agent responses based on stale data or not finding the correct information, open the [workflow run history](/features/runs-and-monitoring/) so you can examine the query and retrieved information. Each time that the agent retrieves information is a step in the agent's iterations. These steps appear as entries under the agent action's inputs and outputs:

- **Inputs**: Shows the query used by the runtime. The model often rewrites the agent's instructions.
- **Outputs**: Shows the retrieved information with a relevance score per result.

Usually, these problems arise due to chunking or queries with rewritten instructions.

## Related content

- [Agents](/features/agents/)
- [Sandboxes](/features/sandboxes/)
- [Connectors](/features/connectors)
- [Runs and monitoring](/features/runs-and-monitoring/)
