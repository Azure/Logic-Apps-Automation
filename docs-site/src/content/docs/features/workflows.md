---
title: Workflows
description: Learn about workflow components and capabilities such as triggers, actions, expressions, code view, and IntelliSense.
sidebar:
  order: 6
---

## Overview

In Azure Logic Apps Automation, a *workflow* is an automation workload that begins with an event (*trigger*), followed by the tasks you want to perform (*actions*). Workflows exist inside apps and support expressions, IntelliSense, inline code execution such as JavaScript, and more.

You build a workflow by using the designer or the AI workflow assistant. The platform's runtime executes the workflow.

To get started, see [Quickstart](/getting-started/quickstart/).

## How to

- [Create a workflow](/getting-started/quickstart/).
- [Use the visual designer](/features/visual-designer/) or [the AI assistant](/features/ai-assistant/) to build and edit a workflow.
- [Review runs and monitoring](/features/runs-and-monitoring/).

## Stateful versus stateless

Workflow type support and runtime behavior aren't yet documented here.

## Triggers

Here are some example triggers that can start a workflow:

| Trigger group | Trigger | Description |
|---|---|---|
| **Schedule** | **Recurrence** | Run on a schedule, such as every minute, hour, or day. |
| **Request** | **When an HTTP request is received** | Run when an HTTP or HTTPS request arrives from an external caller. (non-polling) |
| Managed connectors | Outlook, SharePoint, Salesforce, and so on | Run when an event happens like **When a new email arrives** or **When a new file is uploaded**. The operation can require a connection. |

## Actions

Here are some example actions that can run in a workflow:

| Action group | Action | Description |
|---|---|---|
| **HTTP** | **HTTP** | Send generic REST calls like `GET` or `POST`. |
| **Control** | - **Condition** <br>- **Switch** <br>- **For each** <br>- **Until** | Change the flow based on meeting specific criteria. |
| **Data Operations** | - **Compose** <br>- **Parse JSON** <br>- **Select** <br>- **Filter array** <br>- **Join** | Perform data shaping. |
| **Variables** | - **Initialize variable** <br>- **Set variable** <br>- **Increment variable** <br>- **Decrement variable** | Store and manage variable values. |
| **Inline Code** | **Execute JavaScript Code** | Run code snippets inline with your workflow. |
| Service integration examples | Service Bus, Azure Blob Storage, Azure Queues | Perform operations with services such as Service Bus and Azure Storage. |
| Managed connectors | Outlook, SharePoint, Salesforce, and so on | Perform a task like **Send an email** or **Upload a file**. The operation can require a connection. |
| [Agents](/features/agents/) | Agent options | AI-driven actions with a system prompt and a toolset. |

## Expressions and dynamic content

Trigger and action parameters accept literal values and calculated values. For calculated values, use an [*expression*](https://learn.microsoft.com/azure/logic-apps/workflow-definition-language-schema/#expressions) to call prebuilt [*functions*](https://learn.microsoft.com/azure/logic-apps/expression-functions-reference) by using the workflow expression language.

In a workflow definition, workflow-language expressions start with `@`. For example:

`@add(triggerBody()?.num1, 5)`

`@formatDateTime(utcNow(), 'yyyy-MM-dd')`

`@if(empty(variables('orders')), 'none', 'present')`

Action parameters also accept *dynamic* output from preceding steps in the same workflow. The designer lets you select this output wherever you can specify a value. In the underlying JSON, this output appears as expressions such as `@triggerBody()` and `@outputs('<action-name>')`.

### JavaScript expressions

Workflow definitions also support JavaScript expressions enclosed in `${...}`. For example, `${(10 + 5) * 2 - 1}` evaluates to `29`, and `${10 > 5 ? 'yes' : 'no'}` evaluates to `yes`. These are expressions used as values, not separate workflow actions.

Use an expression for a calculated parameter value. For a longer, multi-step program, use the separate **Execute JavaScript Code** action described below. Review the available expression editor and supported functions in your environment.

## JavaScript code actions

For logic that's hard to represent as an expression, add and run JavaScript by using the **Inline Code** action named **Execute JavaScript Code**. For example, you might need to use code for tasks such as string parsing, complex data shaping, and multistep calculation.

:::note
Review the action's supported inputs, outputs, and runtime restrictions before using it. For calls to external services, consider the **HTTP** action or an appropriate connector.
:::

The following illustrative example assumes an earlier action named `Fetch_Orders` returns an array in its output body:

```js
// Action: Execute JavaScript Code
const orders = workflowContext.actions.Fetch_Orders.outputs.body;
return orders
  .filter(o => o.total > 100)
  .map(o => ({ id: o.id, customer: o.customerName, total: o.total }));
```

## Draft versus published mode

The designer can show a read-only **Published version** view with an **Edit draft** option. Review the draft, its connections, and its test data before publishing. The effects of publishing on running workflows aren't currently documented here; confirm them with your administrator.

### Experiments and fast iteration

The designer can show **Test draft workflow** and a **Run with test data** option. Review each step's test data and connections before testing.

:::caution
Treat tests as potentially live. Test data might cover only some steps, and other steps can call connected services. Use approved test resources and data, and review external effects before running a test.
:::

## Code view and IntelliSense

The platform provides a code view where you can edit the workflow's underlying JSON definition. Valid changes synchronize with the designer; fix JSON errors before saving. Inline code actions and expression fields provide their own editing experiences.

The code view offers the following capabilities:

| Capability | Description |
|---|---|
| Auto-complete | View suggestions for workflow JSON properties and action types based on the editing context. |
| Validation and diagnostics | Review JSON syntax errors and workflow schema diagnostics in the code editor. |

## Related content

- [Quickstart](/getting-started/quickstart/#3-create-your-workflow)
- [Visual designer](/features/visual-designer/)
- [AI assistant](/features/ai-assistant/)
- [Connectors](/features/connectors/)
