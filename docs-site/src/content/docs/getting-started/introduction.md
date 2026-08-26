---
title: About Azure Logic Apps Automation
description: Automate unpredictable business processes and create AI-driven, dynamic, and adaptable workflows with a designer, AI workflow assistant, and a connectors library by using Azure Logic Apps Automation.
sidebar:
  order: 1
  label: Introduction
---

When you need to automate unpredictable business processes or create AI-driven, agentic, and dynamically running workflows, Azure Logic Apps Automation gives you the power to create automations that don't follow fixed, deterministic paths. Start by describing what you want to automate in the AI assistant, or build one workflow component at a time in the designer. Connect the existing services, systems, apps, and data that you already use by choosing from 1,400+ prebuilt connectors. You can find all these capabilities by signing in to the [Azure Logic Apps Automation portal](https://auto.azure.com). You don't need to locally install or run any other tools on your computer.

For stable, repetitive processes with defined behavior and predictable steps, consider trying [Azure Logic Apps Standard or Consumption](https://learn.microsoft.com/azure/logic-apps/automation/compare-automation-services#compare-azure-logic-apps-automation-with-azure-logic-apps).

## Why use Azure Logic Apps Automation

Business processes that resist traditional automation pose the following challenges:

- Steps change each time that a process runs.
- Unclear rules, shifting requirements or priorities, and exceptions that multiply.
- Unstructured, unpredictable, or undefined data.

Traditional automation works when you can define every path for predictable, stable, and repetitive processes with known behavior. However, when conditions change, such brittle workflows can easily break. You also spend time setting up connections, writing glue code when needed, and managing infrastructure before you even reach the business logic. This setup work slows you down and forces you to shift focus away from building out your business logic when you need to handle quickly changing requirements or automate hard-to-define-and-predict processes.

Azure Logic Apps Automation offers a different approach. You describe the workflow behavior to create. The platform builds a workflow that reasons about each request, chooses the best next step at runtime, and escalates to a human when needed. This approach works well for ambiguous, fast-changing work with high cognitive load, so you stay focused on the business outcome. You also get a visual designer to build or refine your workflow one component at a time. Develop, test, and monitor workflows entirely inside your browser.

If you already use Azure Logic Apps Standard or Consumption, consider Azure Logic Apps Automation as a sibling automation tool for scenarios with unpredictable paths. Both have the same runtime, connectors, and management tools. If you're coming from another automation platform, you can get started without experience in Azure Logic Apps.

When your team's success is measured by outcomes, and each request can take a different path, let workflows handle reasoning and decision-making, while you stay in control with human approval. This approach helps reduce rework when business rules change, exceptions increase, or new tools must be added quickly. Compared with other automation platforms, Azure Logic Apps Automation combines adaptive orchestration with enterprise controls, so you can move faster without giving up governance, monitoring, or traceability.

| When | Choose |
|------|--------|
| Business process is variable and decision-loaded. | Azure Logic Apps Automation |
| Business process is stable, known, and predictable. | Azure Logic Apps Standard or Consumption |

For more information, see:

- [What is Azure Logic Apps Automation on Microsoft Learn](https://learn.microsoft.com/azure/logic-apps/automation/dynamic-workflow-automation-introduction)
- [Compare automation services](https://learn.microsoft.com/azure/logic-apps/automation/compare-automation-services#compare-azure-logic-apps-automation-with-azure-logic-apps)

## Build workflows with AI or the designer

Here's what the high-level process looks like to build a workflow:

| # | Step | Description |
|---|------|-------------|
| **1** | **Describe or design** | AI assistant: Use your own words to describe what to automate. <br><br>-or- <br><br>Designer: Drag and drop each step you want to automate on the visual canvas. Add conditions, loops, branches, and nested logic. |
| **2** | **Inspect** | Review each step on the visual canvas. Edit nodes, add logic, and adjust parameters. |
| **3** | **Connect** | Create connections to services and systems through 1,400+ prebuilt connectors, including Service Bus, Cosmos DB, SQL, HTTP, Teams, Outlook, SharePoint, and more. |
| **4** | **Deploy and monitor** | Save the workflow and run in the cloud, which generates run history and produces alerts. |

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
| Sandboxes | Run agentic workflows with code inside isolated compute environments. |
| Run analytics | Diagnose problems by using real-time workflow run history, execution trends, failure analysis, and per-action performance. |

## Key components and concepts

Azure Logic Apps Automation introduces the following core components and concepts for automating your workflows:

| Component or concept | Description |
|----------------------|-------------|
| [Environment](/features/projects-and-applications/) | The top-level container resource that stores your *apps*, *knowledge bases*, *sandboxes*, and environment settings. |
| [App](/features/projects-and-applications/) | The second-level deployable package resource that stores your *workflows*, *connections*, *parameters*, analytics data, and app settings. |
| [Settings](/features/permissions/) | The user permissions at the environment and app levels that control resource access and sharing for collaboration through roles and ownership. |
| [Workflow](/features/workflows/) | The automation workload that includes operations such as the starting event (*trigger*) and the tasks to perform or control flow (*actions*). Workflows are stateful or stateless. They support expressions, IntelliSense, inline code execution such as JavaScript, and more. |
| [AI assistant](/features/ai-assistant/) | The interface where you can describe and update workflows by using natural language and iterating with the assistant. |
| [Designer](/features/visual-designer/) | The canvas where you manually add your workflow's trigger and actions. |
| [Connectors](/features/connectors/) | The catalog that provides integrations with other services, systems, apps, and data. |
| [Agents](/features/agents/) | Add native or Foundry agents, agent loops, set up agent parameters, add agent tools such as code interpreter, and monitor the chat log. |
| [Knowledge](/features/knowledge-bases/) (preview) | Include Azure AI Search, Foundry IQ, Document Upload, or Work IQ so an agent can ground responses in your data. |
| [Sandbox](/features/sandboxes/) (preview) | An isolated micro virtual machine environment where agents run code and can optionally use cloned repos and skills. |
| [Runs and monitoring](/features/runs-and-monitoring/) | Get real-time streaming for draft workflow runs, review run history, work with drafts, trigger and action inputs and outputs, and more. |

## Next steps

- [Set up](/getting-started/setup/)
- [Quickstart](/getting-started/quickstart/)
