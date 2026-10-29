---
title: Sandbox setup overview
description: Review prerequisites and configuration options for agent sandboxes.
sidebar:
  order: 3
---

## Overview

:::note
Availability can vary by environment. If you can't find this capability in the [portal](https://auto.azure.com), check with your environment administrator.
:::

In Azure Logic Apps Automation, a [*sandbox*](/features/sandboxes/) is an environment where a Managed Agent can run code.

## How to

Review the requirements and available options for [default sandboxes](#use-the-default-sandbox) and [prebuilt sandboxes](#create-a-prebuilt-sandbox). Detailed configuration steps aren't currently documented here.

## Requirements

- A Microsoft work or school account with access to the target environment.

  Confirm account and subscription requirements with your environment administrator.

- Access to the [Azure Logic Apps Automation portal](https://auto.azure.com).

- Access to your automation [environment](/features/projects-and-applications/#environment).

- To create a prebuilt sandbox configuration, confirm the required environment access with your administrator.

  If you don't have environment access, contact your environment administrator so they can validate and assign the required permissions.

- To use a sandbox in a workflow:

  - An [app](/features/projects-and-applications/#apps) in your environment.
  - A [workflow](/features/workflows/) in your app.
  - A [Managed Agent](/features/agents/#native-agent-concepts-and-components) in the workflow.

## Use the default sandbox

This guide doesn't currently document the available harness types or default sandbox behavior.

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), open your environment, app, and workflow.

1. On the workflow designer, select the Managed Agent action.

1. Review the agent's available sandbox settings before configuring it.

## Create a prebuilt sandbox

Identify the code and repositories your agent needs, then confirm the supported execution, network, and authentication options with your administrator before selecting a configuration.

### 1. Create the configuration

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), open your environment.

1. On the environment sidebar, select **Sandboxes**, and then select **Create**.

1. Review the configuration settings. Current resource tiers, repository requirements, and authentication methods aren't documented here.

   Treat personal access tokens as secrets and follow your organization's token policy.

### 2. Set up the Managed Agent

1. In your environment, open your app and your workflow.

1. On the workflow designer, select the Managed Agent action.

1. Review the agent's available sandbox settings. Current harness and configuration availability aren't documented here.

#### How Azure Logic Apps Automation places skills for GitHub Copilot

Skill placement in Azure Logic Apps Automation isn't currently documented here. For general GitHub Copilot CLI guidance, see [Add skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills).

## Pass input files to a Managed Agent

Input file requirements and behavior aren't currently documented here. Before passing a file, confirm supported formats and limits, and check that its contents can be shared with the agent.

## Use files produced by a Managed Agent

Output file behavior and formats aren't currently documented here. Confirm where to retrieve outputs and how to consume them before depending on them in a workflow.

## Manage a prebuilt sandbox

On the environment's **Sandboxes** page, select a configuration to review its state, creation time, resource tier, repositories, authentication types, and any build error.

If your current access allows sandbox management, you can perform the following actions:

| Action | Result |
|---|---|
| **Edit** | Review and change available settings. |
| **Rebuild** | Review the configuration before starting a rebuild. |
| **Delete** | Review the effects before deleting a configuration. |

## Troubleshoot problems

| Problem | Try |
|---|---|
| The agent action doesn't show the agent harness tab. | Make sure you selected a Managed Agent, not a different action. |
| A sandbox configuration reports an error | Select the configuration and review the error details. |
| A configuration doesn't appear on the Managed Agent | Review the configuration status and confirm the required access. |
| An expected input or output file is missing | Review the agent action details in run history. |
| A repository skill isn't available | Review the sandbox configuration and confirm the requirements for using repository skills. |

## Related content

- [Sandboxes](/features/sandboxes/)
- [Agents](/features/agents/)
- [Connectors](/features/connectors/)
- [Runs and monitoring](/features/runs-and-monitoring/)