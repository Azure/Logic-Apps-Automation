---
title: Knowledge setup overview
description: Review prerequisites and options for using knowledge sources with agents.
sidebar:
  order: 2
---

## Overview

:::note
Availability can vary by environment. If you can't find this capability in the [portal](https://auto.azure.com), check with your environment administrator.
:::

In Azure Logic Apps Automation, a [*knowledge base*](/features/knowledge-bases/) is an external context source that an [agent](/features/agents/) can use.

If you encounter problems, [report a bug](/support/report-a-bug/) so your feedback can help shape future releases.

## How to

Review the requirements and the steps for [adding files](#1-create-a-knowledge-base) and [attaching a knowledge source to an agent](#2-attach-a-knowledge-source-to-your-agent). The options available in your environment might differ.

## Requirements

- A Microsoft work or school account with access to the target environment.

  Confirm account and subscription requirements with your environment administrator.

- Access to the [Azure Logic Apps Automation portal](https://auto.azure.com).

- Environment access that allows knowledge-base creation. Confirm the required access with your administrator.

  If you don't have environment access, contact your environment administrator so they can validate and assign the required permissions.

## 1. Create a knowledge base

Before adding a source, identify its owner and confirm that the information can be shared with the agent.

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), open your environment.

1. On the environment sidebar, select **Knowledge**.

1. If **Add file** is available, select it. Choose an existing file hub, or select **Create new...** and enter a hub name and optional description. Hub names use letters, numbers, hyphens, and underscores.

1. Browse for or drop in files, and optionally add a description for each file. Select **Add file**.

1. Review the hub's status on the **Knowledge** page. Use **Refresh** to reload the status; address any reported error before relying on the source.

The file selection form displays a limit of 4 MB per file and 50 MB per upload, and rejects file names already in the upload list or repeated within a selection. Supported extensions in the form include PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, MD, and HTML. Limits and options might differ in your environment; confirm permission requirements with your administrator. Other source types and their setup aren't documented here.

## Add another knowledge base

On the environment's **Knowledge** page, use **Add file** to select another hub or create one. To add files to an expanded file hub, select **Upload files**, if available, choose the files, and then select **Upload**.

## 2. Attach a knowledge source to your agent

1. In your workflow, on the designer, select the agent action.

1. In the agent information pane, select the **Knowledge** tab.

1. If **Add knowledge source** is available, select it and choose a ready hub. Review the available retrieval settings before using the agent.

The knowledge tab depends on the agent type and environment configuration; it isn't the setup path for Foundry Hosted agents. Confirm the source's availability and permissions before relying on it in a workflow.

## Troubleshoot information retrieval problems

If an agent response doesn't contain the expected information, review the [workflow run history](/features/runs-and-monitoring/) and [report a bug](/support/report-a-bug/) if the problem persists.

## Related content

- [Agents](/features/agents/)
- [Sandboxes](/features/sandboxes/)
- [Connectors](/features/connectors/)
- [Runs and monitoring](/features/runs-and-monitoring/)