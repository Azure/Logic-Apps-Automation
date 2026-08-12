---
title: Designer
description: Learn about the visual drag-and-drop canvas where you can design workflows with actions, control flow with conditions, loops, parallel branches, and set up nested logic.
sidebar:
  order: 4
---

In Azure Logic Apps Automation, the *designer* provides a visual drag-and-drop canvas where developers can shape workflows. Every workflow component, such as the trigger, each action, agent, and MCP server, has a parameters pane for inputs and settings, code view, and outputs view so you can easily move between the visual representation and the underlying JSON.

:::image type="content" source="media/visual-designer/designer.png" alt-text="Screenshot that shows the designer with an example workflow." lightbox="media/visual-designer/designer.png":::

## What you can build on the designer

The following table describes only some of the components that you can use on the designer to build your workflow:

| Component | Description |
|---|---|
| Trigger | Starts the workflow from an HTTP call, a schedule recurrence, a queue message, an event, or another workflow. |
| Action | Run one or more steps that perform tasks on other services, systems, apps, and data, execute inline JavaScript, or call other workflows. |
| Control flow | Structure your workflow with `if-else`, `switch`, `for-each`, `do-until`, and parallel branch constructs. |
| Nested logic | Group actions into scopes. Nest control flow constructs as deeply as you need. |
| Variables and expressions | Capture intermediate values and reference them by using expressions. |

## Conditional branches

The designer visually renders control flow constructs. For example, a workflow with a condition and parallel branches looks like the the following sample:

:::image type="content" source="media/visual-designer/condition-branches.png" alt-text="Screenshot that shows the designer and example workflow with condtional and parallel branches." lightbox="media/visual-designer/condition-branches.png":::

## View and edit component information

To view a component's parameters, code, or other information, on the designer, select that component.

## View and edit underlying JSON

To view the entire workflow's underlying JSON alongside the designer, on the bottom toolbar, select **Code**. Changes that you make in one view instantly appear in the other.

:::image type="content" source="media/visual-designer/code-view.png" alt-text="Screenshot shows the designer alongside with the entire workflow's underlying JSON code view." lightbox="media/visual-designer/code-view.png":::

## Save and run workflows

All the edits you make to a workflow stay in a *draft* version until you publish. Drafts let you iterate without affecting the workflow running in production. When you publish, the runtime picks up the new workflow definition, the draft becomes the live version, and the next trigger fires the latest version.

To run a draft workflow with a test payload before you publish, see [Test for missing setup details](../getting-started/quickstart#5-test-for-missing-setup-details).

## Related content

- [AI assistant](ai-assistant)
- [Connectors](connectors)
- [Report a bug](../support/report-a-bug/)
