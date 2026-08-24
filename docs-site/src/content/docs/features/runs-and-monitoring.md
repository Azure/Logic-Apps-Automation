---
title: Runs and monitoring
description: Learn about real-time workflow run history, execution trends, per-action performance, and failure analysis.
sidebar:
  order: 11
---

In Azure Logic Apps Automation, the [portal](https://auto.azure.com) records information about each workflow run. You can review each workflow's progress and status along with the inputs, outputs, and duration.

## Draft workflows versus published runs

All the edits you make to a workflow stay in a *draft* version until you publish. Draft workflows keep their own run history so you can test changes without affecting the workflow running in production. When you publish, the runtime picks up the new workflow definition, the draft becomes the live version, and the next trigger fires the latest version.

## Trigger a run before publishing

Before you publish, you can test draft workflows that start with the HTTP trigger or any manual-style trigger by providing a sample payload. For more information, see [Test for missing setup details](/getting-started/quickstart/#5-test-for-missing-setup-details).

:::note
Schedule-based or event-driven workflows require you to publish them before they run. Their runs automatically appear in the run history after their triggers fire.
:::

## Real-time run status streaming

When a draft workflow runs, the **Monitoring** tab shows a live stream for that run. Action statuses change as they start, complete, or fail. For each run, the **Execution log** automatically shows an entry for the trigger and each action as the runtime emits the information without having to poll or refresh.

This streaming capability tightens the loop between draft and iteration. You can edit a component, select **Test**, and watch the monitoring view update. If an action fails, the error surfaces in seconds.

When you view the streaming behavior, remember the following considerations:

- Draft workflow runs stream server-sent events.

 The designer state, action statuses, and durations appear as the runtime produces them. If the connection drops, the view falls back to polling so you still get the final results.

- Published workflow runs use polling.

  Production triggers can fire from anywhere, for example, from a queue message, external HTTP call, or scheduler event. So, the runtime doesn't push state to a specific browser session.

  Instead, the monitoring view polls for new runs and refreshes the open detail every few seconds. The visible behavior is essentially the same, but the underlying transport differs.

## View run history

After a draft workflow starts running, the **Monitoring** view opens and shows each workflow step and their status. In the left pane, the **Runs** tab shows the current run and any previous runs. For the current run, you can view the duration, status, and timestamp. The **Filters** section lets you filter runs by status, version, and time range.

To view more details for a specific run, select that run.

The **Execution log** opens and shows every workflow step in chronological order:

:::image type="content" source="media/runs-and-monitoring/draft-run-history.png" alt-text="Screenshot shows example workflow run history with Monitoring tab that includes Execution log and other run details." lightbox="media/runs-and-monitoring/draft-run-history.png":::

To view the inputs and outputs for each operation, in the **Execution log**, select an operation. The panel to the right shows outputs, inputs, and properties. 

The following example shows the output for a selected action:

:::image type="content" source="media/runs-and-monitoring/action-output.png" alt-text="Screenshot shows the Execution log with selected sample action and example output." lightbox="media/runs-and-monitoring/action-output.png":::

For triggers, you can view the incoming or outgoing request, fire time, or queue message.

## Errors and resubmits

If actions fail, next to the **Execution log**, the **Output** tab shows the error messages and stack trace.

To rerun the workflow with the same trigger payload, on the run details header, select the **Rerun** button. Use this capability to retry the workflow after making a fix or to compare behavior across draft and published versions.

## Monitoring with analytics and alerts

At the app level, on the sidebar, the **Analytics** page aggregates and shows workflow runs data as trends, such as success and failure rates, per-action latency, and recent failures with one-step drill-in view.

:::image type="content" source="media/runs-and-monitoring/analytics.png" alt-text="{alt-text}" lightbox="media/runs-and-monitoring/analytics.png":::

The platform runtime emits standard logs and metrics that downstream observability tools, such as Azure Application Insights, Log Analytics, or your own security information and event management (SIEM) system can ingest. Set up rules and send alerts based on failure rates or latency thresholds for your production workflows.

## Related content

- [Designer](/features/visual-designer/)
- [Set up](/getting-started/setup/)
- [Quickstart](/getting-started/quickstart/)
