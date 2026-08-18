---
title: Agents - Azure Logic Apps Automation
description: Learn about AI agent actions for completing tasks in your workflow.
sidebar:
  order: 8 
---

In Azure Logic Apps Automation, an *agent* is a workflow action that performs the following tasks:

- Accept requests in plain language.
- Interpret requests by using a large language model.
- Follow system instructions that define the agent's role.
- Call tools that complete the tasks needed to fulfill the requests.

An agent can also run code and scripts, browse file systems, and operate on cloned repos with skills when you set up a *sandbox* where the agent can perform this work. This sandbox is an isolated compute environment with a micro virtual machine in your automation project.

Like any other action, an agent produces structured outputs that subsequent workflow actions can use. However, an agent can accept freeform, unstructured, and unpredictable inputs.

## Agent versus deterministic workflow

The following table helps you choose whether to use an agent versus a *deterministic* workflow:

| Agent | Deterministic workflow |
|---|---|
| Run unpredictable actions based on input. | Run predictable actions known in advance. |
| Handle unstructured or unpredictable inputs with variable behavior. | Handle structured inputs with repeatable behavior. |
| Prioritize flexibility and reasoning. | Prioritize cost and low latency. |

## Native versus Foundry agents

Azure Logic Apps Automation supports native agents and Microsoft Foundry agents driven by Foundry Agent Service. The following table compares the differences between these agents:

| Aspect | Native agent | Foundry agent |
|---|---|---|
| Intent | - You want tight integration with workflow connectors. <br><br>- You want action and per-iteration visibility in the workflow run history. | - You have an assistant you built in Foundry. <br><br>- You want to use Foundry's built-in capabilities. |
| Agent tools | Use the platform's connector actions and built-in code interpreter as tools. | Use Foundry's built-in capabilities like file search, function calling, code interpreter, and resources. |
| Model connection | Use your own model deployment through a workflow connection. | Use your Foundry project's connection. |
| Runtime | Drive each iteration with the built-in agent loop. | Hand off work to Azure AI Foundry Agent Service. |
| Where the loop runs | In the workflow runtime. <br><br>The platform shows the actions from each iteration in the execution log through the workflow run history. | In Foundry. <br><br>The platform shows a single agent call and the final output. |

## Native agent concepts and components

Choose from the following native agent types:

| Area | Workflow agent | Coding agent |
|---|---|---|
| Primary focus | Business processes | Software development, as a component in a larger automated process |
| Works with | Services, systems, apps, data, approvals | Repositories, code, files, scripts, tests, development assets, and developer workflows.|
| Tools | Connectors, REST APIs, MCP servers, knowledge bases, other workflows | Code interpreters, repositories, shells, runtimes, terminals, developer tools and environments |
| Optimizes | Business outcomes | Software artifacts |
| Common use cases | Onboarding, support, operations, and finance | Generate and refactor code, create unit tests, review pull requests, and find repository defects |

After you add an agent action to your workflow, set up the agent to work the way you want. The following table introduces agent-related configuration concepts and components:

| Tab | Section or field | Description |
|---|---|---|
| Parameters | AI model | - Native: The model deployment to use like `gpt-5`. <br><br>- Foundry: The Foundry assistant. <br><br>**Note**: Changes to the model are only configuration changes and don't affect the rest of the workflow. <br><br>For more information, see [Native versus Foundry agents](#native-versus-foundry-agents). |
| Parameters | System message | The description about the agent's role, purpose, behavior, and constraints. Supports the full expression language. <br><br>For more information, see [Best practices](#best-practices). |
| Parameters | User message | The user prompt or question for the agent to answer. <br><br>This input usually originates from the workflow trigger or a preceding action as body content in expression format. <br><br>For more information, see [Best practices](#best-practices). |
| Parameters | Input files <br>(Coding agent only) | The files to add and use as input in the isolated [sandbox](/features/sandbox/) environment. | 
| Parameters | Built-in tools | Code interpreter: The agent's capability to run JavaScript in an isolated runtime process. |
| Parameters | Tools | The actions, MCP servers, or workflows that the agent can call as tools. |
| Connection | Connections | The configuration with the credentials and endpoint to access the model. You can create a connection or select an existing connection. |
| Settings | - Timeout <br>- Loop count <br>- Secure inputs <br>- Secure outputs | <br>- The timeout and iteration limit to prevent runaway loops from burning up budget. <br><br>- The settings to hide inputs and outputs in workflow run history. |
| Agent harness <br>(Coding agent only) | - Execution environment <br>- Sandbox configuration | Harness type: The runtime to use for agent execution. <br><br>- Sandbox: The Microsoft virtual machine image that you created as sandbox in the project. If none exist, uses the default base image. |
| Knowledge | Knowledge | Optional documents, knowledge bases, or indexes that the agent can retrieve and use at runtime to ground requests in a specific domain. <br><br>For more information, see [Knowledge bases](/features/knowledge-bases/). |
| Code | Code view | The agent's underlying read-only JSON definition. |

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

## Agent best practices

- Write unambiguous system messages and user messages. Agents work better with clear, specific, and detailed instructions, not vague intent.
- Keep agent toolsets small. For example, fewer than 10 tools is better than 20 tools. Large toolsets increase the risk for model confusion.
- Use verb-centric tool names, like `get_current_time` or `find_order` to help the model correctly choose tools.
- Spend time on tool descriptions, which matter more than names to help the model choose tools.
- For long-running or expensive tools, set a timeout or iteration limit that matches the expected task difficulty. That way, a stuck tool doesn't burn up the agent's iteration budget.
- Rather than reparse the agent's final answer, use the agent's structured outputs instead in subsequent workflow actions.

## Agent run history

After an agent loop completes, the monitoring view shows the [workflow run history](/features/runs-and-monitoring/) with each iteration in its own entry. The chat history shows the full conversation:

- Each user message.
- Each tool call that the model makes, including the arguments.
- Each tool's inputs and outputs.
- The duration for each step.
- The model's final answer.

This view helps you more easily answer the question "Why did the agent do that", compared to viewing the same data in the agent action's outputs alone.

## Native agent tools

You can enable or add the following tools to your native agent:

| Tool type | Description |
|---|---|
| Built-in | Code interpreter: The model can write and execute JavaScript at runtime. Code execution stays isolated and happens in-process within your app's node worker. This isolation provides strong separation from the host runtime in the following ways: <br><br>- Code execution uses its own limited memory, which prevents consuming all available resources. <br><br>- Code execution can't directly access the host memory, file system, or network. <br><br>- Failures stay isolated, so any crashes in generated code don't affect the runtime process. |
| Custom | Any built-in or managed connector action, MCP server, or workflow that you can call. |

### Code interpreter

When you need the agent to perfom the following tasks, enable the code interpeter capability on the agent:

- Calculate numbers, run algorithms, or transform complex data structures that the model can't reliably handle.
- Parse, filter, or reshape JSON and arrays returned from other tools.
- Generate dynamic content such as regular expression extraction, templating, and formatting.

#### How code interpreter works

With the code interpreter enabled, the agent runs the following high-level steps:

1. The model decides they need to call the code interpreter tool by using the `code` argument.
1. The runtime creates and runs JavaScript in an isolated process.
1. The output flows back to the chat history as a tool result.
1. The model reads the result.
1. The model calls another tool or produces the final answer.

If you're using a coding agent that needs a richer execution environment, create a [sandbox](/features/sandbox/), and then set up that sandbox on the agent's **Agent harness** tab. 

#### Code interpreter limitations

| Limitation | Description |
|---|---|
| JavaScript only | No Python or other runtimes. |
| No network access | No HTTP calls from the runtime. Instead, add an **HTTP** action as an agent tool. |
| No file system access | No reading or writing files. Instead, pass inputs through the agent's chat context. |
| Shorter timeout per execution | Long-running snippets are cut off. Instead, make frequent small calls, not a big one. |
| Limited memory and CPU | Code interpreter is suitable for transformations, not heavy compute. |

If your agent needs non-JavaScript runtimes, network access, or a file system, set up and use a [sandbox](/features/sandboxes/), rather than the code interpreter.

### Custom tools

You can create custom tools for an agent to use by using a built-in or managed connector action, MCP server, or workflow that you can call. Each tool needs the following items:

| Requirement | Description |
|---|---|
| Tool name | The agent uses this name to call the tool. |
| Description | The agent uses this description to choose the correct tool. |
| Agent parameters | The agent uses these parameter names and descriptions as a schema to populate tool parameter arguments at run time. |

> [!IMPORTANT]
>
> The agent's reasoning process and accuracy at run time is only as good as your descriptions. Clearly and precisely specify what the tool does, when to call the tool, and what each parameter means.

#### Tool parameters

When the model calls an agent's custom tools, the model provides arguments based on the tool's parameter schema. The agent uses this schema to feed parameter values to the tool at run time. To access these arguments inside a tool action, use the following expression with the `agentParameters()` function:

```
@agentParameters('orderId') // Return the value passed by the agent for the `orderId` parameter.
@agentParameters('limit')   // Return the value passed by the agent for the `limit` parameter.
```

The `@agentParameters('<parameter-name>')` expression works as a bridge between the arguments that the model sends to the tool and the workflow that runs the tool. 

> [!NOTE]
>
> The function name uses camel case (`agentParameters()`) in both the standard expression language and JavaScript actions. For backward compatibility, the legacy lowercase format, `@agentparameters()`, also works in the standard expression language.

## Mix code interpreter and custom tools

An agent can use both the [code interpreter](#code-interpreter) tool and [custom tools](#custom-tools). The following table describes some example common patterns:

| Real-world use case | Tool use pattern |
|---|---|
| Get data, transform, and post result | `Query_Database` → `code_interpreter` (transform) → `HTTP_Post` |
| Send daily report | `code_interpreter` (aggregate) → `Send_Email` |
| Extract, Transform, Load (ETL) | `Query_Database` → `code_interpreter` (transform) → `Insert_Records` |
| API submission | `code_interpreter` (validate) → `HTTP_Request` (submit) → `code_interpreter` (parse response) |

## Related content

- [Quickstart](/getting-started/quickstart/)
- [Knowledge bases](/features/knowledge-bases/)
- [Sandboxes](/features/sandboxes/)
