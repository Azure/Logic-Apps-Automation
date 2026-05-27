---
title: AI workflow assistant
description: Describe what you want to automate in plain language. The assistant designs, builds, and iterates on workflows with you.
sidebar:
  order: 5
---

The **AI workflow assistant** is the fastest path from idea to running workflow. Describe what you want in natural language and the assistant generates a workflow, drops the right connectors in, and explains its choices. Iterate by sending follow-up messages — the assistant edits the workflow in place.

## Starting from a prompt

On the **Workflows** tab, the build hero accepts a plain-language description of what you want to automate. Type, then hit **Build**.

![Describe-your-workflow prompt](../../../assets/portal/50-assistant-prompt-typed.png)

The assistant emits a workflow definition; the canvas re-renders with the steps it picked.

## Iterating inside the designer

Inside the designer, the **Copilot** button (bottom toolbar) opens the assistant alongside the canvas. Use it to refine an existing workflow — *"add retry on the HTTP call"*, *"swap Teams for Slack"*, *"add an agent that summarises the result before posting"*.

![Copilot pane open inside the designer](../../../assets/portal/22-copilot-pane.png)

The pane keeps a chat history per workflow so you can scroll back through edits.

## What you can ask for

- *"When I get an email with 'invoice' in the subject, save the attachment to Blob Storage and post a Teams message."*
- *"Every weekday at 9 a.m., pull yesterday's failed runs from this workflow and email me a summary."*
- *"On a new Service Bus message, call this HTTP endpoint, and if it returns a 5xx, retry three times with backoff."*

## How it works

1. You send a prompt. The assistant streams its reasoning and the workflow it's building.
2. The assistant emits a workflow definition (the same JSON the designer reads).
3. The canvas re-renders. You inspect every node and edit anything you want.
4. Send a follow-up message to refine — *"Use parallel branches instead of sequential"*, *"Add error handling to the HTTP action"*, etc.

## Before the first run — finish the wiring

Copilot scaffolds the workflow shape but **can't supply environment-specific configuration**. Before your generated workflow runs successfully you'll need to:

- **Configure connections** for every connector action. Either pre-create them on the app's [**Connections** tab](/features/connectors/) or create them inline from each action's *Connection* tab.
- **Fill required parameters** the assistant left blank — fields with red outlines or asterisks.
- **Resolve any "Finish configuring with Copilot" prompts** that appear on individual nodes.

![Agent action with a "Finish configuring with Copilot" prompt](../../../assets/portal/82-agent-tools-tab.png)

The fastest validation is the designer's **Test your draft** button — it surfaces missing config before you bother publishing. See the [Quickstart](/getting-started/quickstart/) for the end-to-end loop.

## Where it fits

The assistant is a **first-class authoring surface**, not a chatbot bolted on. It uses the same workflow schema as the designer, the same connector catalog, and the same expression language. Anything the assistant generates, you can edit by hand — and vice-versa.

## Limits

The assistant does its best work with **specific prompts**. Vague asks (*"automate my workflow"*) produce vague workflows. Tell it which trigger, which services, which destinations.
