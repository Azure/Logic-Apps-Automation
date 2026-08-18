---
title: Create a knowledge base - Azure Logic Apps Automation
description: Create and attach external knowledge sources so agents can ground their answers in your data.
sidebar:
  order: 2
  badge:
    text: preview
    variant: tip
---

In Azure Logic Apps Automation, create a *knowledge base* as an external context source that an [agent](../features/agents/) can search during reasoning. Rather than rely only on a model's training, the agent gets the relevant information from your files, docs, code, and data to ground its answers.

## Prerequisites



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

To debug problems related to agent responses based on stale data or not finding the correct information, open the [workflow run history](runs-and-monitoring/) so you can examine the query and retrieved information. Each time that the agent retrieves information is a step in the agent's iterations. These steps appear as entries under the agent action's inputs and outputs:

- **Inputs**: Shows the query used by the runtime. The model often rewrites the agent's instructions.
- **Outputs**: Shows the retrieved information with a relevance score per result.

Usually, these problems arise due to chunking or queries with rewritten instructions.

## Related content

- [Agents](../features/agents/)
- [Sandboxes](../features/sandboxes/)
- [Connectors](../features/connectors/../features/)
- [Runs and monitoring](../features/runs-and-monitoring/)