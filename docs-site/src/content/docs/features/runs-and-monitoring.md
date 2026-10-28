---
title: Runs and monitoring
description: Learn about real-time workflow run history, execution trends, per-action performance, and failure analysis.
sidebar:
  order: 11
---

## Overview

In Azure Logic Apps Automation, the [portal](https://auto.azure.com) records information about each workflow run. You can review each workflow's progress and status along with the inputs, outputs, and duration.

## Draft workflows versus published runs

Draft, published, and run-history lifecycle behavior isn't currently documented here. Confirm version behavior with your administrator before making release decisions.

## Trigger a run before publishing

Before testing, review the workflow and its potential effects on connected systems. For UI guidance, see [Test for missing setup details](/getting-started/quickstart/#5-test-for-missing-setup-details).

## View run history

After a workflow run starts, the **Monitoring** view shows each workflow step and status. In the left pane, the **Runs** tab shows current and previous runs. For each run, you can review details such as duration, status, and timestamp.

To view more details for a specific run, select that run.

The **Execution log** opens and shows every workflow step in chronological order.

The following synthetic example shows a selected action's properties. Run statuses, timestamps, and durations are fictional:

![Synthetic run details with an action selected and its properties visible.](https://github.com/user-attachments/assets/3f127140-935f-461e-9b0c-d262f7e2787e)

To view the inputs and outputs for each operation, in the **Execution log**, select an operation. The panel to the right shows outputs, inputs, and properties. 

The following synthetic example shows fictional output for a selected action:

![Synthetic execution log with a selected action and example output.](https://github.com/user-attachments/assets/d6a8796a-c974-4300-8a6c-e7d82f4e6226)

For triggers, you can view the incoming or outgoing request, fire time, or queue message.

## Errors and resubmits

If actions fail, next to the **Execution log**, the **Output** tab shows the error messages and stack trace.

If **Rerun** appears on the run details header, select **Rerun** to start another run.

Rerun inputs and version selection aren't currently documented here. Before rerunning, confirm those details and potential effects on connected systems with your team.

## Real-time run status streaming

When a workflow runs, the **Monitoring** tab updates run progress, and the **Execution log** shows entries for the trigger and actions as status information arrives.

## Monitoring with analytics and alerts

At the app level, on the sidebar, the **Analytics** page aggregates and shows workflow runs data as trends, such as success and failure rates, per-action latency, and recent failures with one-step drill-in view.

The platform runtime emits standard logs and metrics that downstream observability tools, such as Azure Application Insights, Log Analytics, or your own security information and event management (SIEM) system can ingest. Set up rules and send alerts based on failure rates or latency thresholds for your production workflows.

## Related content

- [Designer](/features/visual-designer/)
- [Set up](/getting-started/setup/)
- [Quickstart](/getting-started/quickstart/)
