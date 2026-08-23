---
title: Knowledge bases
description: Learn about attaching external knowledge sources so agents can ground their answers in your data.
sidebar:
  order: 9
  badge:
    text: preview
    variant: tip
---

:::note This capability is in preview and subject to the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/). If your project enables this capability, the user experience appears in the [portal](https://auto.azure.com).

In Azure Logic Apps Automation, a *knowledge base* is an external context source that an [agent](/features/agents/) can search during reasoning. Rather than rely only on a model's training, the agent gets the relevant information from your files, docs, code, and data to ground its answers. For more information, see [Create knowledge bases](/guides/create-knowledge-bases/).

The following items are under development:

- Document upload size and format limits.
- Per-source token budget controls.
- Granular permissions on which project members can attach a source.

  If you encounter problems, [report a bug](/support/report-a-bug/) so your feedback can help shape future releases.

## Supported source types

You can attach multiple context sources to an agent. The runtime retrieves information across these sources and merges the top results.

| Source | Description | When to choose |
|---|---|---|
| File upload | Documents that you directly upload to an agent or projects | You want the platform to chunk and embed the content. |
| [Azure AI Search](https://learn.microsoft.com/azure/search/search-what-is-azure-search) | Search indexes that you manage in Azure AI Search | You already haves search indexes or want granular control over chunking and scoring. |
| [Microsoft Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq) | Knowledge indexes in Microsoft Foundry | You already work in the Foundry ecosystem and want managed retrieval. |
| [Microsoft 365 Copilot Work IQ](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/) | Work IQ knowledge connector | Tenant-scoped knowledge surfaced through Microsoft 365 / Work IQ |

## Related content

- [Create knowledge bases](/guides/create-knowledge-bases/)
- [Agents](/features/agents/)
- [Sandboxes](/features/sandboxes/)
- [Connectors](/features/connectors)
- [Runs and monitoring](/features/runs-and-monitoring/)
