---
title: Billing and pricing
description: Learn about the billing and pricing model for Azure Logic Apps Automation, including core platform meters, optional capabilities, public preview regions, and example monthly cost calculations.
sidebar:
  order: 4
  label: Pricing
---

Azure Logic Apps Automation uses consumption-based pricing, so you pay based on the resources and capabilities that your automations use. Billing meters exist in the following groups:

- Core platform meters that apply to every workflow.
- Optional capabilities that incur charges only when a workflow uses them.

:::note
- Azure Logic Apps Automation is currently in public preview. Preview pricing and availability are subject to change before general availability.

- The prices on this page are in US dollars, are only estimates, and apply only to the East US region.

  Azure prices can vary by region, agreement, purchase date, currency exchange rate, and applicable taxes. For pricing in your region and currency, see [Pricing - Azure Logic Apps | Microsoft Azure](https://azure.microsoft.com/en-us/pricing/details/logic-apps/).

- Pricing changes are rolling out in phases across [supported Azure regions](/getting-started/introduction/#public-preview-regions) and might not be available in every region at the same time.
:::

## Core platform pricing

Core platform meters cover the managed environment, workflow execution, and run history storage required to host and run your automations.

| Component | Meter | Price | How charges work |
| --- | --- | --- | --- |
| Managed environment | Environment hour | $0.042 per environment hour | This charge applies to each hour that a managed, customer-isolated environment is provisioned. |
| Workflow runtime | Execution second | $0.00008 per execution second | This charge applies to the core execution time per second for an automation app. <br><br> The default profile includes 1 virtual CPU (vCPU) of core compute and 2 gibibyte (GiB) of memory. <br><br>The runtime host is active while you author workflows in the portal. |
| Data retention | GB per month | $0.12 per GB, per month | This charge applies to the storage used for workflow run history. The platform keeps run history up to approximately 90 days. |

## Optional capability pricing

Optional capabilities extend a workflow's functionality with connectors, AI, managed knowledge bases, or isolated code execution in sandboxes. You incur these charges only when your automation uses the corresponding capability.

| Component | Meter | Price | How charges work |
| --- | --- | --- | --- |
| Standard managed connectors | Connector action | $0.000125 per action | This charge applies to each time that a workflow runs an action through a Standard managed connector. |
| Enterprise managed connectors | Connector action | $0.001 per action | This charge applies to Enterprise connector operations, including knowledge read and write transactions. |
| AI usage | Azure Agent Credits (AACs) | Charged as AACs | The platform converts AI usage to AACs. The number of AACs depends on the selected model and the tokens processed for AI-assisted authoring, agent reasoning, inference, embeddings, and other AI operations. For more information, see [Azure OpenAI Service pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/?msockid=20df8113aafb681e21499566ab416984). <br><br>**Note**: AI tokens are consumed by agents, the chat assistant, and knowledge bases. If you bring your own model, AI token usage isn't charged through the platform. |
| Knowledge storage | GB per month | 33 Azure Agent Credits (AACs) per GB, per month, <br>equivalent to $0.33 per GB per month | This charge applies to storage used by the managed knowledge layer. <br><br>**Note**: This pricing doesn't include AI processing or connector transactions. The platform separately bills embeddings, inference, and transactions through AI usage and connector actions. |
| Sandbox - isolated code execution | vCPU-second and GiB-second | - $0.000024 per vCPU-second <br><br>- $0.000003 per GiB-second | These charges apply to compute and memory usage when custom code runs in an isolated sandbox. |

## Example monthly cost

The following example shows how charges from different meters contribute to the estimated monthly cost by using East US pricing in US dollars. These usage numbers are only illustrative estimates and don't represent any recommended configuration or a typical customer workload.

Suppose an organization has the following monthly usage:

| Meter | Usage | Calculation | Estimated cost |
|---|---|---|---|
| Managed environment | 730 hours provisioned | 730 × $0.042 | $30.66 |
| Automation app execution time | 150,000 execution seconds consumed. <br><br>Includes time for workflow execution and time for an active runtime during workflow authoring in the portal. | 150,000 x $0.00008 | $12.00 |
| Standard connector actions | 1,000 actions | 1,000 x $0.000125 | $0.125 |
| Enterprise connector actions for knowledge base operations | 100 actions | 100 x $0.001 | $0.10 |
| Data retention for workflow run history | 20 GB | 20 x $0.12 | $2.40 |
| Knowledge storage | 5 GB | 5 x $0.33 | $1.65 |
| Sandbox | 100 executions <br><br>For 10 seconds, each execution uses 1 vCPU and 2 GiB of memory. | Executions: 100 x 10 seconds x 1 vCPU x $0.000024 <br><br>Memory: 100 x 10 seconds x 2 GiB x $0.000003 | Executions: $0.024 <br><br>Memory: $0.006 |
| AI usage | Excluded | Charged as AACs, based on selected model and token consumption | Additional AAC charges |

Estimated monthly total, excluding AI usage: $46.97

The final bill might be higher or lower, based on an automation app's total execution time, retained data, connector activity, AI usage, and sandbox resource consumption. For AI rates, see [Azure OpenAI Service pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/?msockid=20df8113aafb681e21499566ab416984).
