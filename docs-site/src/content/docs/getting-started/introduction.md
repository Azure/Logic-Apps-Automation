---
title: Introduction - Azure Logic Apps Automation
description: This service gives developers the power to automate unpredictable processes and create runtime-adaptable workflows by using the designer, AI workflow assistant, and connectors library.
sidebar:
  order: 1
  label: Introduction
---

Automate unpredictable processes and create AI-driven workflows that adapt at runtime with Azure Logic Apps Automation. Start by describing the workflow behavior you want in the AI assistant, or build your workflow one component at a time in the designer. Connect the services, systems, apps, and data that you already use by selecting from 1,400+ prebuilt and ready-to-use connectors.

You can find all these capabilities by signing in to the [Azure Logic Apps Automation portal](https://auto.azure.com). You don't need to locally install or run any other tools.

## Build workflows with AI or the designer

Here's what the high-level process looks like to build a workflow:

| Step | Description |
|------|-------------|
| **1. Describe or design** | - **AI assistant**: Use your own words to describe what to automate. <br><br>- **Designer**: Drag-and-drop each step you want to automate on the visual canvas. Add conditions, loops, branches, and nested logic. |
| **2. Inspect** | Review each step on the visual canvas. Edit nodes, add logic, and adjust parameters. |
| **3. Connect** | Create connections to services and systems through 1,400+ prebuilt connectors. Including Service Bus, Cosmos DB, SQL, HTTP, Teams, Outlook, SharePoint, and more. |
| **4. Deploy and monitor** | Save the workflow and run in the cloud, which generates run history and produces alerts. |

Ready to get up and running first? See the following pages:

- [**Setup**](/getting-started/setup/)
- [**Quickstart**](/getting-started/quickstart/)

## Other capabilities

| Capability | Description |
|------------|-------------|
| **Code support** | Run inline code actions like JavaScript, Edit workflows in a code editor with IntelliSense. |
| **Agents** | Add and run agents, which are actions backed by large language models (LLMs). Drag and drop on the designer like any other action. Provide a system prompt, a toolset, and inputs. Downstream actions can use the output. |
| **Knowledge bases** | Attach external information sources as context that agents can search while reasoning. |
| **Sandboxes** | Run agentic workflows with code inside isolated compute environments. |
| **Run analytics** | Diagnose problems using real-time run history, execution trends, failure analysis, and per-action performance. |

## Work structure

Azure Logic Apps Automation organizes your work by using the following structures and scopes:

| Resource | Contents |
|-------|----------|
| [*Project*](/features/projects-and-applications/) | The top-level container resource that stores and organizes your *apps* and *sandboxes*. As the project creator and default owner, you control access and governance at this level. |
| *App* | A deployable package resource that stores workflows, connections, parameters, analytics, settings, and other items that your automation needs. Most teams have several apps per project, which maps to either a logical service or domain. |
| [*Workflow*](/features/workflows/) | The automation workload itself, which includes operations such as the starting event (*trigger*) and the tasks to perform or control flow (*actions*). Workflows can be stateful or stateless with triggers, actions, control flow, expressions, IntelliSense, inline code execution such as JavaScript, and more. |
| [*Sandbox*](/features/sandboxes/) | An isolated micro virtual machine environment where agents run code and can optionally use cloned repos and skills. |

## Key concepts or components

Azure Logic Apps Automation introduces the following primary concepts and components associated with automating your workflows:

| Concept or component | Description |
|----------------------|-------------|
| **[Permissions](/features/permissions/)** | Scoped at the project and app level, organized by role matrix, ownership, and how to share resources for collaboration. |
| **[Visual designer](/features/visual-designer/)** | The canvas where you manually add your workflow's trigger and actions. |
| **[AI assistant](/features/ai-assistant/)** | The interface where you can describe and update workflows by using natural language and iterating with the assistant. |
| **[Connectors](/features/connectors/)** | The catalog that provides integrations with other services, systems, apps, and data. |
| **[Agents](/features/agents/)** | Add native or Foundry agents, agent loops, set up agent parameters, add agent tools such as code interpreter, and monitor the chat log. |
| **[Knowledge bases](/features/knowledge-bases/)** | Include Azure AI Search, Foundry IQ, Document Upload, or Work IQ so an agent can ground responses in your data. (preview) |
| **[Runs and monitoring](/features/runs-and-monitoring/)** | Get real-time streaming for draft workflow runs, review run history, work with drafts, trigger and action inputs and outputs, and so on. |

## Next

- [**Set up**](/getting-started/setup/)
- [**Quickstart**](/getting-started/quickstart/)
