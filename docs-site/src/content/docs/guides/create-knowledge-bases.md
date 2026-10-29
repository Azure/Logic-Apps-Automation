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

Review the requirements and current options for [creating a knowledge base](#1-create-a-knowledge-base) and [attaching it to an agent](#2-attach-a-knowledge-source-to-your-agent). Detailed source setup and attachment steps aren't currently documented here.

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

1. Review the available options. Current source types, limits, and permission requirements aren't documented here.

## Add another knowledge base

Review the available options on the environment's **Knowledge** page before adding another source.

## 2. Attach a knowledge source to your agent

1. In your workflow, on the designer, select the agent action.

1. In the agent information pane, select the **Knowledge** tab.

1. Review the available knowledge options for that agent.

Confirm with your administrator how to verify that the source is ready before relying on it in a workflow.

## Troubleshoot information retrieval problems

If an agent response doesn't contain the expected information, review the [workflow run history](/features/runs-and-monitoring/) and [report a bug](/support/report-a-bug/) if the problem persists.

## Related content

- [Agents](/features/agents/)
- [Sandboxes](/features/sandboxes/)
- [Connectors](/features/connectors/)
- [Runs and monitoring](/features/runs-and-monitoring/)