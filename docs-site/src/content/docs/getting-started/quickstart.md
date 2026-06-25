---
title: Quickstart - Azure Logic Apps Automation
description: Create apps so you can build and run workflows. Review their execution history.
sidebar:
  order: 4
  label: Quickstart
---

These steps show how to create or open an app in an automation project, build and run a sample workflow, and review what happened. You can use the workflow as a template and swap in what you actually want to automate.

## Requirements

To view and create apps and workflows in a project, you need access to that project. If you don't have access, contact the project owner to add you as a project member. 

## 1. Open your project

1. Sign in to the [Azure Logic Apps Automation portal](https://auto.azure.com).

   The portal opens and shows every project where you have access. If you don't see the projects you expect, contact the project owner to check whether you have access.

   :::image type="content" source="media/quickstart/projects-list.png" alt-text="Screenshot shows the portal and projects list." lightbox="media/quickstart/projects-list.png":::

1. On the **Projects** tab, select your project.

   The portal opens the project and shows the **Apps** list. The following example shows an empty project.

   :::image type="content" source="media/quickstart/apps-list.png" alt-text="Screenshot shows an empty project without apps." lightbox="media/quickstart/apps-list.png":::

1. If the project is empty, go to the next section to create an app. 

   Otherwise, select the app where you want to create your workflow, and skip to [Create your workflow](#3-create-your-workflow).

## 2. Create an app

1. In the project, on the **Apps** page, select **Create app**.

1. In the **Create application** box, enter a name for your app, and select **Create**.

   :::image type="content" source="media/quickstart/create-application-box.png" alt-text="Screenshot shows the Create application box with example app name." lightbox="media/quickstart/create-application-box.png":::

   App creation might take a couple minutes to finish.
   
1. To check when the app is ready for you to open, review the **Status** column.

1. After app creation completes, select your app.

   The portal opens the app and shows the **Workflows** list. The following example shows an empty app.

   :::image type="content" source="media/quickstart/workflows-list.png" alt-text="Screenshot shows an empty app without workflows." lightbox="media/quickstart/workflows-list.png":::

1. To add people to work on your app, follow these steps:

   1. On the app sidebar, select **Settings**. 

   1. On the **User permissions** tab, select **Add user**.
   
      If people need access to every app in the project, they need access at the project level.

## 3. Create your workflow

1. In your app, on the **Workflows** page, select **Create workflow**.

1. In the **Create workflow** box, enter the workflow name, and select **Build**.

1. After the portal opens the designer, choose an option to start creating your workflow.

   | Opation | Path |
   |---------|------|
   | **AI assistant** | Generate your workflow on the designer, based on your description about what the workflow does. <br><br>For more information, see [Generate workflow with assistant](#3a-generate-workflow-with-assistant). |
   | **Designer** | Add the trigger and each action from the connectors library. |

## 3a. Generate a workflow with the assistant

1. On the bottom toolbar, select **Copilot**.

1. In the chat box, enter your workflow description.

1. Select **Generate**.

   The following example shows the AI assistant and a workflow description:

   :::image type="content" source="media/quickstart/prompt-assistant.png" alt-text="Screenshot shows the workflow designer with AI assistant pane and workflow description." lightbox="media/quickstart/prompt-assistant.png":::

   The following example shows the assistant-generated workflow:

   :::image type="content" source="media/quickstart/generated-workflow.png" alt-text="Screenshot shows the workflow designer and assistant-generated workflow." lightbox="media/quickstart/generated-workflow.png":::

   > [!NOTE]
   >
   > Generated workflows still need setup. The AI assistant generates the workflow scaffolding, such as the trigger, actions, branches, and so on. But it doesn't know your credentials or environment-specific values. Before your first workflow run succeeds, you need to complete any required follow-up tasks.

1. Complete any remaining follow-up tasks that your workflow needs to run successfully, for example:

   - Add any required parameter values that the assistant left empty.
   
     1. Open the information box for the trigger and each action.

     1. Find the parameters marked with an asterisk or red outline.

   - Configure the connections for each connector trigger and action.
   
     - On your app sidebar, select **Connections**. Review each connection and complete the necessary setup.

     - In the designer, open the information box for the connector trigger and each action. Review the **Connection** tab and complete the necessary setup.

   - Resolve any prompts on the trigger or actions that show a label named **Finish configuring with Copilot**.

## 3b. Build a workflow with the designer

When you start with an empty designer, manually add the trigger and actions that provide your workflow's behavior.

### Add the trigger

Every workflow starts with a trigger, which identifies the event or condition that runs the workflow.

1. On the empty designer, select **Add a trigger**.

   :::image type="content" source="media/quickstart/empty-designer.png" alt-text="Screenshot shows the empty workflow designer and placeholder named Add a trigger." lightbox="media/quickstart/empty-designer.png":::

1. When the **Add a trigger** pane opens, search or browse the triggers. Select the trigger you want. 

   :::image type="content" source="media/quickstart/add-trigger.png" alt-text="Screenshot shows the empty workflow designer and the pane for Add a trigger." lightbox="media/quickstart/add-trigger.png":::

   For example:

   | Trigger type | Trigger name | Description |
   |--------------|--------------|-------------|
   | **Request** | **When an HTTP request is received** | A webhook trigger that handles incoming requests sent from external callers. |
   | **Schedule** | **Recurrence** | A trigger that runs on a specified schedule. |

1. In the trigger information box, enter any required details, and then close the box.

   Your selected trigger appears on the designer, like the following example:
   
   :::image type="content" source="media/quickstart/added-trigger.png" alt-text="Screenshot shows the workflow designer and selected example trigger." lightbox="media/quickstart/added-trigger.png":::

### Add an action

After the trigger, an action performs a specific task in the workflow.

1. On the designer, following the trigger, select the plus sign (+) to add an action.

1. When the **Add an action** pane opens, search or browse the actions. Select the action you want. 

   :::image type="content" source="media/quickstart/add-action.png" alt-text="Screenshot shows the workflow designer, an example trigger, and the pane for Add an action." lightbox="media/quickstart/add-action.png":::

1. In the action information box, enter any required details for the action to work, and then close the box.

   Your selected action appears on the designer.

   For actions that run in parallel, branches automatically appear on the designer. For example, the following workflow shows these branches and includes a final response back to the caller who sent the request:

   :::image type="content" source="media/quickstart/branched-workflow.png" alt-text="Screenshot shows the workflow designer and completed branched workflow." lightbox="media/quickstart/branched-workflow.png":::

## 4. Edit your workflow with AI or in code

To continue editing your workflow, you have the following options:

- Keep using the designer.

- Describe your changes in natural language by opening the AI assistant.

- Directly edit the workflow's underlying JSON definition by switching to the code editor. Changes stay synchronized between the code editor and the designer.

  The following example shows the AI assistant with instructions to edit a workflow:

  :::image type="content" source="media/quickstart/edit-copilot.png" alt-text="Screenshot shows the workflow designer and Copilot pane with instructions in the chat box." lightbox="media/quickstart/edit-copilot.png":::

  The following example shows the open code editor where you can directly edit a workflow's JSON definition:

  :::image type="content" source="media/quickstart/code-view.png" alt-text="Screenshot shows the workflow designer and code editor side by side." lightbox="media/quickstart/code-view.png":::

## 5. Test for missing setup details

You can test HTTP-based triggers in draft before you publish your workflow. Other triggers fire only after you publish the workflow.

1. To quickly find any missing configuration information, on the bottom toolbar, select **Test**.

1. In the **Test draft workflow** box, enter a sample payload, if you have one, and select **Test Draft**.

1. Next to the **Designer** tab, select **Monitoring**.

   If you haven't run your workflow before, the **Monitoring** tab appears empty.

   :::image type="content" source="media/quickstart/monitoring-empty.png" alt-text="Screenshot shows the Monitoring tab, which appears empty when workflow hasn't run before." lightbox="media/quickstart/monitoring-empty.png":::

   After the run completes, the **Monitoring** tab shows the details in a side window along with the status, timestamp, and duration.

   The following example shows the history for one successful workflow run:


1. To fully test a non-HTTP trigger, you need to publish your workflow first.

The following table describes common example trigger firing behaviors while in draft versus published:

| Trigger type | Trigger name | Fires in draft? | How to test | 
|--------------|--------------|-----------------|-------------|
| **Request** | **When an HTTP request is received** | Yes | On the bottom designer toolbar, select **Test**, and provide a sample payload. |
| **Schedule** | **Recurrence** | No, must publish | Publish, and then wait for the scheduled time, or shorten the schedule. |
| Event-driven, such as **Service Bus**, **Event Hubs**, **Queue Storage** | | No, must publish | Publish, and then push an event to the target resource. |
| Polls a service or system endpoint | | No, must publish | Publish, and then trigger the event in the target service or system. |

## 6. Publish draft to production

When you create and edit your workflow, you always work on a *draft* version.

The following example shows the **Draft** label on the designer's title bar:

:::image type="content" source="media/quickstart/draft-label.png" alt-text="Screenshow shows the workflow designer and highlighted Draft label." lightbox=""media/quickstart/draft-label.png"":::

1. To promote your draft to production, select **Publish**.

1. To switch to the published version, next to **Publish**, from the vertical ellipses (**...**) menu, select **View published version**. 

## 7. Run and monitor your workflow

1. Next to the **Designer** tab, select **Monitoring**.

   If you haven't run your workflow before, the **Monitoring** tab appears empty.

   :::image type="content" source="media/quickstart/monitoring-empty.png" alt-text="Screenshot shows the Monitoring tab, which appears empty when workflow hasn't run before." lightbox="media/quickstart/monitoring-empty.png":::

1. Select **Run workflow** to manually fire the trigger.

1. In the test workflow window that opens, confirm the selected trigger, and enter the JSON body input that the trigger needs.

   :::image type="content" source="media/quickstart/test-draft-workflow.png" alt-text="Screenshot shows the test workflow window." lightbox="media/quickstart/test-draft-workflow.png":::

   The following example shows example JSON body input:

   :::image type="content" source="media/quickstart/test-draft-workflow-payload.png" alt-text="Screenshot shows the test workflow window and example JSON body input." lightbox="media/quickstart/test-draft-workflow-payload.png":::

1. When you're ready, select **Test Draft**.

   The **Monitoring** tab streams the workflow run in real time.

## 8. Review the run history

After a run completes, the **Monitoring** tab shows the details in a side window along with the status, timestamp, and duration.

The following example shows the history for one successful workflow run:

![Run history list with one succeeded run](../../../assets/portal/33-run-history.png)

Click the run to open its detail view — the canvas re-renders coloured by execution status, every node shows its duration, and the **Execution log** at the bottom lists every action in order:

![Run detail with execution log](../../../assets/portal/34-run-detail.png)

## 9. Inspect inputs, outputs, and errors

Click any action in the execution log (or any node on the canvas) to see what data it received and produced. The **Output**, **Input**, and **Properties** tabs in the bottom panel let you drill in:

![Action output](../../../assets/portal/35-action-output.png)

![Action input](../../../assets/portal/36-action-input.png)

Triggers behave the same way — click `manual` (or whatever the trigger node is called) to see what came in:

![Trigger output — HTTP headers and body](../../../assets/portal/37-trigger-output.png)

For failed actions, the same panel shows the error message and stack trace so you can diagnose without leaving the run view.

## 10. Iterate

Edit the workflow in the designer or send follow-ups to the assistant (*"add error handling to the HTTP action"*, *"use a Slack post instead"*). Changes go into a draft until you publish.

## Troubleshooting

| Problem | Try |
|---------|-----|

| **Sign in loop or single sign-on (SSO) error** | Clear your cookies for the following URLs, and sign in again: <br><br>- `https://auto.azure.com` <br>- `https://login.microsoftonline.com` |
| **Portal appears empty** | Perform a hard refresh (Keyboard: `Cmd/Ctrl + Shift + R`). If the problem persists, [report a bug](/support/report-a-bug/). |

## Where to go from here

- **[Visual designer](/features/visual-designer/)** — what the canvas can do.
- **[AI workflow assistant](/features/ai-assistant/)** — patterns that work well with the assistant.
- **[Connectors](/features/connectors/)** — the catalog of integrations.
- **[Runs and monitoring](/features/runs-and-monitoring/)** — read run history and watch production health.
- **[Report a bug](/support/report-a-bug/)** if something didn't work.
