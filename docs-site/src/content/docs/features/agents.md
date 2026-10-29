---
title: Agents
description: Learn about AI agent actions for completing tasks in your workflow.
sidebar:
  order: 8 
---

## Overview

In Azure Logic Apps Automation, an *agent* is a workflow action that performs the following tasks:

- Accept requests in plain language.
- Interpret requests by using a large language model.
- Follow system instructions that define the agent's role.
- Call tools that complete the tasks needed to fulfill the requests.

Some agents can also run code and scripts in a [*sandbox*](/features/sandboxes/).

Like any other action, an agent produces structured outputs that subsequent workflow actions can use. However, an agent can accept freeform, unstructured, and unpredictable inputs.

## Choose an agent

The designer's **Choose an Agent** picker presents these options. Other quick-add menus can show a subset and use different labels. The available choices and connections can vary by environment.

The following synthetic example illustrates the picker; it might differ from your portal:

![Agent picker with Workflow, Managed, Foundry prompt, and Foundry Hosted choices.](https://github.com/user-attachments/assets/d852bef1-b992-4f99-bd33-ae8f31eef1c0)

| Option | When to consider it |
|---|---|
| **Workflow agent** | Define an agent in the workflow when you want to configure its prompts, context, and tools. |
| **Managed agent** | Work with code, files, repositories, and skills in a sandboxed agent harness. |
| **Foundry prompt agent** | Use a declarative Microsoft Foundry agent configured with prompts, a model, and tools. |
| **Foundry Hosted agent** | Use an agent provisioned in a hosted container in a Foundry project. See [Foundry Hosted Agents](/features/foundry-hosted-agents/). |

After you choose a type, follow the connection and configuration steps shown for that option. For a hosted agent, finish its setup before selecting it in a workflow.

### Workflow agent

Choose **Workflow agent** to configure an agent in the workflow. Select a model connection, or add the agent first and configure a connection in the editor. Set the system and user messages, and add the tools the agent needs. See [Native agent concepts and components](#native-agent-concepts-and-components).

### Managed agent

Choose **Managed agent** for work involving code and files. Review the model and harness choices offered by the designer, then configure the sandbox, repositories, skills, and input files needed for the task. Confirm your access and the available sandbox options before relying on them. See [Sandbox setup overview](/guides/create-sandboxes/).

### Foundry prompt agent

Choose **Foundry prompt agent** to use an agent configured in Microsoft Foundry. Select or create a compatible Foundry Agent Service connection, then review the agent and its configuration in the editor. Its **Built in tools** options include **Code interpreter** and **File search**.

The following synthetic example shows an unsubmitted connection form with a fictional subscription:

![Foundry connection fields with a fictional subscription and no project selected.](https://github.com/user-attachments/assets/b2fb48e7-2f3d-4bc0-8357-13f5ce5c7ce4)

### Foundry Hosted agent

Choose **Foundry Hosted agent** to use a hosted agent from your Foundry project. Create and finish setting up the hosted agent before selecting it in the workflow. See [Create and use a Foundry Hosted Agent](/guides/create-foundry-hosted-agents/).

## Orchestrate agents

Use the workflow to decide when an agent runs and what happens next:

1. Pass data from a trigger or an earlier action to the agent's user message.
1. Configure any supported actions the agent needs as tools, with descriptions that explain when to use them.
1. Use the agent's output in a later workflow action. For a multi-agent workflow, pass the appropriate output to the next agent.
1. Review the run history, including available agent and tool details, to understand the result.

Review the inputs, tool permissions, and outputs for each agent before relying on them.

## Agent versus deterministic workflow

The following table helps you choose whether to use an agent versus a *deterministic* workflow:

| Agent | Deterministic workflow |
|---|---|
| Run unpredictable actions based on input. | Run predictable actions known in advance. |
| Handle unstructured or unpredictable inputs with variable behavior. | Handle structured inputs with repeatable behavior. |
| Prioritize flexibility and reasoning. | Prioritize cost and low latency. |

## Native versus Foundry agents

The designer distinguishes Workflow and Managed agents from Foundry prompt and Foundry Hosted agents. Workflow agents are configured in the workflow, while Managed agents offer a sandboxed harness for tasks involving code and files. Foundry agents use resources in a Microsoft Foundry project.

For the four choices and their setup paths, see [Choose an agent](#choose-an-agent). Review the connection, tools, and settings offered for the type you select.

## Native agent concepts and components

Choose from the following native agent types:

| Area | Workflow agent | Managed Agent |
|---|---|---|
| Primary focus | Business processes | Software development, as a component in a larger automated process |
| Works with | Services, systems, apps, data, approvals | Repositories, code, files, scripts, tests, development assets, and developer workflows.|
| Tools | Connectors, REST APIs, MCP servers, knowledge bases, other workflows | Sandbox and repository capabilities, shells, runtimes, terminals, and developer tools |
| Optimizes | Business outcomes | Software artifacts |
| Common use cases | Onboarding, support, operations, and finance | Generate and refactor code, create unit tests, review pull requests, and find repository defects |

After you add an agent action to your workflow, set up the agent to work the way you want. The following table introduces agent-related configuration concepts and components:

Section labels can vary by editor layout and agent type.

| Tab | Section or field | Description |
|---|---|---|
| Parameters | AI model | Review the model or agent configuration offered for the agent type you selected. <br><br>For more information, see [Native versus Foundry agents](#native-versus-foundry-agents). |
| Parameters | System message | The description about the agent's role, purpose, behavior, and constraints. Supports the full expression language. <br><br>For more information, see [Best practices](#agent-best-practices). |
| Parameters | User message | The user prompt or question for the agent to answer. <br><br>This input usually originates from the workflow trigger or a preceding action as body content in expression format. <br><br>For more information, see [Best practices](#agent-best-practices). |
| Parameters | Input files <br>(Managed Agent only) | Review the available input file settings for the agent. |
| Parameters | Built-in tools | Workflow agent: Code interpreter gives the agent a way to run JavaScript. |
| Parameters | Tools | The actions, MCP servers, or workflows that the agent can call as tools. |
| Connect or Connection | Connections | The configuration with the credentials and endpoint to access the model. You can create a connection or select an existing connection. |
| Run settings | - Timeout <br>- Loop Count <br>- Secure Inputs <br>- Secure Outputs | Review the available timeout and iteration settings. Confirm what the secure input and output settings protect before relying on them. |
| Harness <br>(Managed Agent only) | - Execution environment <br>- Sandbox configuration <br>- Repository skills | Review the available harness and sandbox settings. For more information, see [Sandboxes](/features/sandboxes/). |
| Knowledge | Knowledge | Knowledge sources an agent can use. For more information, see [Knowledge bases](/features/knowledge-bases/). |
| Code | Code view | The agent's underlying JSON definition. Edit availability depends on the workflow mode and editor. |

## How a native agent works

The following high-level process describes the steps that run for a native agent loop action:

1. Send the system prompt and input to the model.
1. If the model chooses a tool, the runtime calls the tool.
1. The runtime feeds the results from the tool back to the model.
1. Repeat until the model produces the final answer, or the loop reaches its iteration limit.
1. Return the final answer plus structured outputs to the remaining workflow.

Downstream workflow actions can reference the agent's outputs by using the following expressions:

```
@outputs('<agent-name>')['<structured-output>']?['<field-name>']
@outputs('<agent-name>')['<final-assistant-message>']
```

For sandbox setup guidance, see [Sandbox setup overview](/guides/create-sandboxes/).

## Agent best practices

- Write unambiguous system messages and user messages. Agents work better with clear, specific, and detailed instructions, not vague intent.
- Keep agent toolsets small. For example, fewer than 10 tools is better than 20 tools. Large toolsets increase the risk for model confusion.
- Use verb-centric tool names, like `get_current_time` or `find_order` to help the model correctly choose tools.
- Spend time on tool descriptions, which matter more than names to help the model choose tools.
- For long-running or expensive tools, set a timeout or iteration limit that matches the expected task difficulty. That way, a stuck tool doesn't burn up the agent's iteration budget.
- Rather than reparse the agent's final answer, use the agent's structured outputs instead in subsequent workflow actions.

## Native agent tools

You can enable or add the following tools to your native agent:

| Tool type | Description |
|---|---|
| Built-in | For Workflow agents, Code interpreter lets the model write and execute JavaScript. Confirm runtime restrictions and resource limits before use. |
| Custom | Any built-in or managed connector action, MCP server, or workflow that you can call. |

### Code interpreter

For a Workflow agent that needs to perform the following tasks, enable its code interpreter capability:

- Calculate numbers, run algorithms, or transform complex data structures that the model can't reliably handle.
- Parse, filter, or reshape JSON and arrays returned from other tools.
- Generate dynamic content such as regular expression extraction, templating, and formatting.

#### How code interpreter works

With the code interpreter enabled, the agent runs the following high-level steps:

1. The model decides they need to call the code interpreter tool by using the `code` argument.
1. The runtime runs the JavaScript.
1. The output flows back to the chat history as a tool result.
1. The model reads the result.
1. The model calls another tool or produces the final answer.

If you're using a Managed Agent that needs a richer execution environment, create a [sandbox](/features/sandboxes/), and then set up that sandbox in the agent's **Harness** section.

#### Code interpreter limitations

Confirm the supported runtimes, network and file access, execution timeouts, and resource limits with your administrator before use. For additional execution options, review [sandboxes](/features/sandboxes/).

### Custom tools

You can create custom tools for an agent to use by using a built-in or managed connector action, MCP server, or workflow that you can call. Each tool needs the following items:

| Requirement | Description |
|---|---|
| Tool name | The agent uses this name to call the tool. |
| Description | The agent uses this description to choose the correct tool. |
| Agent parameters | The agent uses these parameter names and descriptions as a schema to populate tool parameter arguments at run time. |

:::caution
The agent's reasoning process and accuracy at run time is only as good as your descriptions. Clearly and precisely specify what the tool does, when to call the tool, and what each parameter means.
:::

#### Tool parameters

When the model calls an agent's custom tools, the model provides arguments based on the tool's parameter schema. The agent uses this schema to feed parameter values to the tool at run time. To access these arguments inside a tool action, use the following expression with the `agentParameters()` function:

```
@agentParameters('orderId') // Return the value passed by the agent for the `orderId` parameter.
@agentParameters('limit')   // Return the value passed by the agent for the `limit` parameter.
```

The `@agentParameters('<parameter-name>')` expression works as a bridge between the arguments that the model sends to the tool and the workflow that runs the tool. 

:::note
The function name uses camel case (`agentParameters()`) in both the standard expression language and JavaScript actions. For backward compatibility, the legacy lowercase format, `@agentparameters()`, also works in the standard expression language.
:::

## Mix code interpreter and custom tools

A Workflow agent can use both the [code interpreter](#code-interpreter) tool and [custom tools](#custom-tools). The following table describes some example common patterns:

| Real-world use case | Tool use pattern |
|---|---|
| Get data, transform, and post result | `Query_Database` → `code_interpreter` (transform) → `HTTP_Post` |
| Send daily report | `code_interpreter` (aggregate) → `Send_Email` |
| Extract, Transform, Load (ETL) | `Query_Database` → `code_interpreter` (transform) → `Insert_Records` |
| API submission | `code_interpreter` (validate) → `HTTP_Request` (submit) → `code_interpreter` (parse response) |

## Agent run history

After an agent run, review the [workflow run history](/features/runs-and-monitoring/) and available chat or iteration details. Depending on the run and its settings, these details can include:

- User and assistant messages.
- Tool calls, arguments, and results.
- Durations and other step details.

These details can help you understand how the agent reached its result.

## Related content

- [Quickstart](/getting-started/quickstart/)
- [Knowledge bases](/features/knowledge-bases/)
- [Sandboxes](/features/sandboxes/)
