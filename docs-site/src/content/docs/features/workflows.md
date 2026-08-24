---
title: Workflows
description: Learn about workflow components and capabilities such as triggers, actions, expressions, code view, and IntelliSense.
sidebar:
  order: 6
---

In Azure Logic Apps Automation, a *workflow* is an automation workload that begins with an event (*trigger*), followed by the tasks you want to perform (*actions*). Workflows exist inside apps and support expressions, IntelliSense, inline code execution such as JavaScript, and more.

You build a workflow by using the designer or the AI workflow assistant. The platform's runtime executes the workflow.

To get started, see [Quickstart](/getting-started/quickstart/).

## Stateful versus stateless

Azure Logic Apps Automation currently supports only stateful workflows. These workflows keep their full run history information for diagnostics and governance, and they support replay, retry, and long-running operations. Stateless workflows run only inside memory and optimize for short, fast executions. 

## Triggers

Here are some example triggers that can start a workflow:

| Trigger group | Trigger | Description |
|---|---|---|
| **Schedule** | **Recurrence** | Run on a schedule like every minute, hour, day, or based on a *cron expression*. |
| **Request** | **When an HTTP request is received** | Run when an HTTP or HTTPS request arrives from an external caller. (non-polling) |
| Managed connectors | Outlook, SharePoint, Salesforce, and so on | Run when an event happens like **When a new email arrives** or **When a new file is uploaded**. Hosted and run in global Azure, usually requires a connection, and often with polling on a schedule. |

## Actions

Here are some example actions that can run in a workflow:

| Action group | Action | Description |
|---|---|---|
| **HTTP** | **HTTP** | Send generic REST calls like `GET` or `POST`. |
| **Control** | - **Condition** <br>- **Switch** <br>- **For each** <br>- **Until** | Change the flow based on meeting specific criteria. |
| **Data Operations** | - **Compose** <br>- **Parse JSON** <br>- **Select** <br>- **Filter array** <br>- **Join** | Perform data shaping. |
| **Variables** | - **Initialize variable** <br>- **Set variable** <br>- **Increment variable** <br>- **Decrement variable** | Store and manage variable values. |
| **Inline Code** | **Execute JavaScript code** | Run code snippets inline with your workflow. | 
| Service provider-based | Service Bus, Azure Blob Storage, Azure Queues  | Run service-based operations natively and directly on the platform's runtime. |
| Managed connectors | Outlook, SharePoint, Salesforce, and so on | Perform a task like **Send an email** or **Upload a file**. Run in global multitenant Azure. Usually requires a connection. |
| [Agents](/features/agents/) | AI-driven actions with a system prompt and a toolset. |

## Expressions and dynamic content

Trigger and action parameters accept literal values and calculated values. For calculated values, use an [*expression*](https://learn.microsoft.com/azure/logic-apps/workflow-definition-language-schema/#expressions) to call prebuilt [*functions*](https://learn.microsoft.com/azure/logic-apps/expression-functions-reference) by using the platform's expression language. The same expression syntax works wherever you can specify a value, for example, in parameters, conditions, loops, and agent system prompts.

Here are some example expressions, which always start with the `@` character when you work with the underlying JSON, but aren't required when you work with the designer:

`@add(triggerBody()?.num1, 5)`

`@formatDateTime(utcNow(), 'yyyy-MM-dd')`

`@if(empty(variables('orders')), 'none', 'present')`

Action parameters also accept *dynamic* output from preceding steps in the same workflow. The designer lets you select this output wherever you can specify a value. In the underlying JSON, this output appears as expressions such as `@triggerBody()` and `outputs('<action-name')`.

## JavaScript code actions

For logic that's hard to represent as an expression, add and run JavaScript by using the **Inline Code** action named **Execute JavaScript code**. For example, you might need to use code for tasks such as string parsing, complex data shaping, and multistep calculation. The JavaScript action runs in a sandbox with the Node.js runtime, accepts JSON inputs from the workflow, and returns a value that subsequent workflow actions can use.

:::note
Use JavaScript actions sparingly. Most transformations are easier to parse and understand as a chain of actions. The JavaScript sandbox can't make network calls. For network-bound logic, use the **HTTP** action instead.
:::

```js
// Action: Inline JavaScript Code
const orders = workflowContext.actions.Fetch_Orders.outputs.body;
return orders
  .filter(o => o.total > 100)
  .map(o => ({ id: o.id, customer: o.customerName, total: o.total }));
```

## Draft versus published mode

Every workflow has a *draft* version and a *published* version. You always edit the draft version, while the read-only published version runs in the production environment and interacts with real, actual traffic.

The following table provides more information about draft versus published mode:

| Behavior | Draft | Published |
|---|---|---|
| What is it | Your in-progress edits | The live, read-only version where the trigger fires against real, actual events |
| Where edits go | Automatically saved while you work | Updated only when you publish |
| Identifier | **Draft** label | **Published** label |
| Run history | Appears in the **Version** section under **Drafts** in monitoring view | Appears in the **Version** section under **Published** in monitoring view |

:::caution
When you publish your draft, you immediately replace the published version. No intermediate or separate "deploy" action exists. The next time when the trigger fires, the updated workflow runs. 
:::

### Experiments and fast iteration

For triggers that work in draft mode, you can experiment and quickly iterate by running workflows on demand before you publish. Here's the rules for testing triggers:

- You can test any trigger that you can manually run.

  This rule means you can iterate quickly on **Request**-based trigger workflows, and then publish after everything works as expected.

- You can only run time-based or event-based triggers in published mode.

  To test a non-**Request** trigger, publish your workflow first.

The following table describes common example triggers that run in draft versus published mode:

| Trigger type | Trigger name | Test in draft? | How to test | 
|--------------|--------------|----------------|-------------|
| **Request** | **When an HTTP request is received**  | Yes | On the bottom designer toolbar, select **Test**, and provide a sample payload. |
| **Schedule** | **Recurrence** | No, must publish | Publish, and then wait for the scheduled time, or shorten the schedule. |
| Event-driven, such as **Service Bus**, **Event Hubs**, **Azure Queues** | Varies | No, must publish | Publish, and then push an event to the target resource. |
| Polls a service or system endpoint | Varies | No, must publish | Publish, and then trigger the event in the target service or system. |

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
- [Visual designer](/features/designer/)
- [AI assistant](/features/ai-assistant/)
- [Connectors](/features/connectors/)
