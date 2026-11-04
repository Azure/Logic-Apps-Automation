---
title: Runs and monitoring
description: Learn about workflow run history, execution trends, and failure analysis.
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

After a workflow run starts, the **Monitoring** view shows workflow steps and their statuses. The **Runs** list shows current and previous runs. For each run, you can review details such as duration, status, and timestamp.

To view more details for a specific run, select that run.

The **Execution log** opens with entries for the run and its workflow steps.

The following synthetic example shows a selected action's properties. Run statuses, timestamps, and durations are fictional:

![Synthetic run details with an action selected and its properties visible.](https://github.com/user-attachments/assets/3f127140-935f-461e-9b0c-d262f7e2787e)

To inspect an operation, select it in the **Execution log**. The detail panel can show available outputs, inputs, and properties.

The following synthetic example shows fictional output for a selected action:

![Synthetic execution log with a selected action and example output.](https://github.com/user-attachments/assets/d6a8796a-c974-4300-8a6c-e7d82f4e6226)

For triggers, the available details depend on the trigger and the run.

## Errors and resubmits

If an action fails, select it in the **Execution log** and review its available output and properties for error details.

If **Rerun** appears on the run details header, select **Rerun** to start another run.

Rerun inputs and version selection aren't currently documented here. Before rerunning, confirm those details and potential effects on connected systems with your team.

<span id="real-time-run-status-streaming"></span>

## Run status updates

When a workflow runs, the **Monitoring** tab updates run progress, and the **Execution log** shows entries for the trigger and actions as status information arrives.

## Monitoring with analytics and alerts

At the app level, the **Analytics** page shows workflow run trends, including run latency and status summaries. When action data is available, **Slowest actions** shows average durations for the listed actions.

Environment settings can offer an Application Insights connection. Confirm which telemetry and alerting options are available for your environment before relying on them.

## Related content

- [Designer](/features/visual-designer/)
- [Set up](/getting-started/setup/)
- [Quickstart](/getting-started/quickstart/)
