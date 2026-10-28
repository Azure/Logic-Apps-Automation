---
title: About Azure Logic Apps Automation
description: Learn how to build workflows and agents with Azure Logic Apps Automation.
sidebar:
  order: 1
  label: Introduction
---

## Overview

Azure Logic Apps Automation lets you build and run workflows in a managed environment. Use the designer to add steps, or describe a workflow to the AI assistant and refine the result. Workflows can connect to services and include agents for tasks that need reasoning.

Open the [portal](https://auto.azure.com) to build, test, and monitor workflows in your browser.

## Why use Azure Logic Apps Automation

Use a workflow for repeatable steps and add an agent when a task needs to interpret input or choose tools. Environments and applications help organize workflows and manage access.

For more information, see:

- [What is Azure Logic Apps Automation on Microsoft Learn](https://learn.microsoft.com/azure/logic-apps/automation/dynamic-workflow-automation-introduction)
- [Compare automation services](https://learn.microsoft.com/azure/logic-apps/automation/compare-automation-services#compare-azure-logic-apps-automation-with-azure-logic-apps)

## Build workflows with AI or the designer

Here's what the high-level process looks like to build a workflow:

| # | Step | Description |
|---|------|-------------|
| **1** | **Describe or design** | AI assistant: Use your own words to describe what to automate. <br><br>-or- <br><br>Designer: Drag and drop each step you want to automate on the visual canvas. Add conditions, loops, branches, and nested logic. |
| **2** | **Inspect** | Review each step on the visual canvas. Edit nodes, add logic, and adjust parameters. |
| **3** | **Connect** | Configure connections to the services and systems your workflow uses. |
| **4** | **Deploy and monitor** | Save and run the workflow, then review its run history. |

If you're ready to get started, see the following pages:

- [**Setup**](/getting-started/setup/)
- [**Quickstart**](/getting-started/quickstart/)

## Other capabilities

Here are other capabilities for automating workflows:

| Capability | Description |
|------------|-------------|
| Code support | Run inline code actions like JavaScript. Edit workflows in a code editor with IntelliSense. |
| Agents | Add and run agents, which are actions backed by large language models (LLMs). Drag and drop on the designer like any other action. Provide a system prompt, a toolset, and inputs. Downstream actions can use the output. |
| Knowledge bases | Attach external information sources as context that agents can search while reasoning. |
| Sandboxes | Run agentic workflows with code in sandbox environments. |
| Run analytics | Diagnose problems by using real-time workflow run history, execution trends, failure analysis, and per-action performance. |

## Key components and concepts

Azure Logic Apps Automation introduces the following core components and concepts for automating your workflows:

| Component or concept | Description |
|----------------------|-------------|
| [Environment](/features/projects-and-applications/) | The top-level container resource that stores your *apps*, *knowledge bases*, *sandboxes*, and environment settings. |
| [App](/features/projects-and-applications/) | The second-level deployable package resource that stores your *workflows*, *connections*, *parameters*, analytics data, and app settings. |
| [Settings](/features/permissions/) | The user permissions at the environment and app levels that control resource access and sharing for collaboration through roles and ownership. |
| [Workflow](/features/workflows/) | The automation workload that includes a starting event (*trigger*) and the tasks to perform or control flow (*actions*). |
| [AI assistant](/features/ai-assistant/) | The interface where you can describe and update workflows by using natural language and iterating with the assistant. |
| [Designer](/features/visual-designer/) | The canvas where you manually add your workflow's trigger and actions. |
| [Connectors](/features/connectors/) | The catalog that provides integrations with other services, systems, apps, and data. |
| [Agents](/features/agents/) | Add native or Foundry agents, agent loops, set up agent parameters, add agent tools such as code interpreter, and monitor the chat log. |
| [Knowledge](/features/knowledge-bases/) (preview) | Sources that agents can use for context. |
| [Sandbox](/features/sandboxes/) (preview) | An environment where agents can run code. |
| [Runs and monitoring](/features/runs-and-monitoring/) | Review workflow run history and trigger and action inputs and outputs. |

## Public preview regions

Azure Logic Apps Automation is currently in public preview. Azure region availability determines where you can create an automation environment. Azure OpenAI model availability and quota can also vary by region and subscription. During public preview, Azure Logic Apps Automation is available in the following Azure regions:

- Australia East
- East Asia
- North Central US
- Southeast Asia
- Sweden Central
- UK South
- West US

## Next steps

- [Set up](/getting-started/setup/)
- [Quickstart](/getting-started/quickstart/)
