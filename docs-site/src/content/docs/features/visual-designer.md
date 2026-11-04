---
title: Designer
description: Learn about the visual drag-and-drop canvas where you can design workflows with actions, control flow with conditions, loops, parallel branches, and set up nested logic.
sidebar:
  order: 4
---

## Overview

In Azure Logic Apps Automation, the *designer* provides a visual drag-and-drop canvas where developers can shape workflows. Select a workflow component to inspect its available parameters and other details. The views available depend on the component and the current workflow mode.

## What you can build on the designer

The following table describes only some of the components that you can use on the designer to build your workflow:

| Component | Description |
|---|---|
| Trigger | Starts the workflow from an HTTP call, a schedule recurrence, a queue message, an event, or another workflow. |
| Action | Run one or more steps that perform tasks on other services, systems, apps, and data, execute inline JavaScript, or call other workflows. |
| Control flow | Structure your workflow with `if-else`, `switch`, `for-each`, `do-until`, and parallel branch constructs. |
| Nested logic | Group actions into scopes and nest control flow constructs. |
| Variables and expressions | Capture intermediate values and reference them by using expressions. |

## Conditional branches

The designer visually renders control flow constructs. The following synthetic example shows a condition with true and false branches; it might differ from your portal:

![Synthetic designer showing a condition with true and false branches.](https://github.com/user-attachments/assets/802abe3c-90d8-456a-8ad4-121bbd75a00a)

## View and edit component information

To view a component's parameters, code, or other information, on the designer, select that component.

The following synthetic example shows an action's parameters with fictional values:

![Synthetic designer with an action's parameters pane open.](https://github.com/user-attachments/assets/b9c3ea87-84ab-48e6-9591-03faa1f2a739)

## View and edit underlying JSON

To view the entire workflow's underlying JSON alongside the designer, on the bottom toolbar, select **Code**. Valid changes synchronize between the views; fix any JSON errors and review the result before saving.

The following synthetic example illustrates the code view; it isn't a validated workflow definition:

![Synthetic designer with workflow JSON shown in the code pane.](https://github.com/user-attachments/assets/19d3aa9b-08da-43d6-9e6b-4429ae9d0c70)

## Save and run workflows

Before testing or publishing a workflow, confirm the expected behavior with your administrator and review actions that can affect connected systems. For UI steps, see [Test for missing setup details](/getting-started/quickstart/#5-test-for-missing-setup-details).

## Related content

- [AI assistant](/features/ai-assistant/)
- [Connectors](/features/connectors/)
- [Report a bug](/support/report-a-bug/)
