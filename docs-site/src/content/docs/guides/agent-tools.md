---
title: Tools for agents
description: Choose and configure actions, MCP tools, workflows, and skills for agents.
---

## Overview

Tools give an agent ways to obtain information or perform tasks as part of a workflow. Choose the smallest set needed for the task, describe each tool clearly, and review its permissions. Available tool types depend on the agent and environment.

## How to

In the workflow designer, select an agent and add a supported tool. Configure its connection and inputs, give it a descriptive name and purpose, and review the resulting workflow before testing. The designer offers tool categories including **Action**, **MCP Tool**, and **Sub-workflow**.

The following synthetic example shows the tool menu for an unconfigured agent; it might differ from your portal:

![Unconfigured agent with the Action, MCP Tool, and Sub-workflow menu open.](https://github.com/user-attachments/assets/36895a7e-0a1b-4513-89f6-efcf2e2bc839)

## Connector actions

Use an **Action** tool when the agent needs a built-in or connector operation, such as retrieving data from a service. Configure the operation and its connection, then describe when the agent should use it. See [Connectors](/features/connectors/) and [Custom tools](/features/agents/#custom-tools).

## MCP tools

Use **MCP Tool** to connect tools exposed by a Model Context Protocol server. The picker can show available managed servers or offer **Add an MCP server** to connect a custom server endpoint. This direct-server option is separate from the managed connector server list. Save the workflow when prompted, select or configure the server and its connection, and review the tools and permissions exposed to the agent.

The following synthetic form uses a fictional endpoint and hasn't been submitted:

![Add MCP server form with a fictional example.invalid endpoint.](https://github.com/user-attachments/assets/d5fa78a5-058b-4949-b444-b89a275fd100)

## Workflows as tools

Use **Sub-workflow** when an agent needs to invoke another workflow as a tool. Choose the workflow offered by the designer and describe the task it performs and the inputs it needs. Review the called workflow's access and external effects.

## Skills

A Managed agent's harness can offer **Repository Skills** when its sandbox configuration includes repositories. Review the repository and skills settings for your task. See [Sandbox setup overview](/guides/create-sandboxes/) for the current setup guidance.

## Human review

For actions with external effects, decide how a person should review the result before the action proceeds. Confirm which approval mechanism is available in your environment; a specific approval action or its behavior isn't documented here.

## Related content

- [Choose an agent](/features/agents/#choose-an-agent)
- [Sandbox setup overview](/guides/create-sandboxes/)
- [Runs and monitoring](/features/runs-and-monitoring/)
