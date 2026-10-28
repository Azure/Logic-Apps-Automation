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

Confirm the available workflow types and their runtime behavior with the product team before choosing a workflow type.

## Triggers

Here are some example triggers that can start a workflow:

| Trigger group | Trigger | Description |
|---|---|---|
| **Schedule** | **Recurrence** | Run on a schedule like every minute, hour, day, or based on a *cron expression*. |
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
| **Inline Code** | **Execute JavaScript code** | Run code snippets inline with your workflow. | 
| Service provider-based | Service Bus, Azure Blob Storage, Azure Queues | Perform operations with services such as Service Bus and Azure Storage. |
| Managed connectors | Outlook, SharePoint, Salesforce, and so on | Perform a task like **Send an email** or **Upload a file**. The operation can require a connection. |
| [Agents](/features/agents/) | AI-driven actions with a system prompt and a toolset. |

## Expressions and dynamic content

Trigger and action parameters accept literal values and calculated values. For calculated values, use an [*expression*](https://learn.microsoft.com/azure/logic-apps/workflow-definition-language-schema/#expressions) to call prebuilt [*functions*](https://learn.microsoft.com/azure/logic-apps/expression-functions-reference) by using the platform's expression language. The same expression syntax works wherever you can specify a value, for example, in parameters, conditions, loops, and agent system prompts.

Here are some example expressions, which always start with the `@` character when you work with the underlying JSON, but aren't required when you work with the designer:

`@add(triggerBody()?.num1, 5)`

`@formatDateTime(utcNow(), 'yyyy-MM-dd')`

`@if(empty(variables('orders')), 'none', 'present')`

Action parameters also accept *dynamic* output from preceding steps in the same workflow. The designer lets you select this output wherever you can specify a value. In the underlying JSON, this output appears as expressions such as `@triggerBody()` and `@outputs('<action-name>')`.

## JavaScript code actions

For logic that's hard to represent as an expression, add and run JavaScript by using the **Inline Code** action named **Execute JavaScript code**. For example, you might need to use code for tasks such as string parsing, complex data shaping, and multistep calculation.

:::note
Review the action's supported inputs, outputs, and runtime restrictions before using it. For calls to external services, consider the **HTTP** action or an appropriate connector.
:::

```js
// Action: Inline JavaScript Code
const orders = workflowContext.actions.Fetch_Orders.outputs.body;
return orders
  .filter(o => o.total > 100)
  .map(o => ({ id: o.id, customer: o.customerName, total: o.total }));
```

## Draft versus published mode

Draft and published lifecycle behavior isn't currently documented here. Before publishing, confirm how changes affect running workflows with your administrator.

### Experiments and fast iteration

Before testing a workflow, confirm the expected behavior with your administrator and review actions that can affect connected systems.

## Code view and IntelliSense

The platform provides a code view where you can edit the workflow's underlying JSON definition. The designer uses this same JSON definition, which stays synchronized with the code editor. The code editor is the same and is available everywhere that code appears, such as the workflow code view, inline code actions, and expression editor.

The editor offers the following capabilities:

| Capability | Description |
|---|---|
| IntelliSense (auto-complete) | Start typing in the editor to view matching action types, expression functions, and known properties from the workflow schema. To display the popup, press **Ctrl + Space** or **⌃ Space**. |
| Function signature help | Start typing the function name to view the signature and parameter information. |
| Parameter help | Move your mouse pointer over a parameter to view the type and description. |
| Schema-aware validation and diagnostics | Find invalid action types, malformed expressions, and missing required parameters, which appear underlined with a tooltip about the problem. |

## Related content

- [Quickstart](/getting-started/quickstart/#3-create-your-workflow)
- [Visual designer](/features/visual-designer/)
- [AI assistant](/features/ai-assistant/)
- [Connectors](/features/connectors/)
