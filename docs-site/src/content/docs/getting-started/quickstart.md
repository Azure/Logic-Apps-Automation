---
title: Quickstart - Create apps and workflows
description: Create AI-driven automations by building apps and workflows. Review workflow execution history.
sidebar:
  order: 3
  label: Quickstart
---

## Overview

In this quickstart, open an environment, create or select an app, build a workflow, and review its run history. An [app](/features/projects-and-applications/#apps) groups related workflows, connections, and settings. A [workflow](/features/workflows/) starts with a trigger and performs the actions you configure.

Choose a trigger and actions for the task you want to automate. Configure their required inputs and connections before testing.

This general guide doesn't yet include a complete tested example with input and expected output.

Screenshots labeled synthetic show fictional, independent examples, not a single workflow or actual runs. They might differ from your portal.

## How to

Review the requirements, then [open an environment](#1-open-your-environment), [create or select an app](#2-create-an-app), and [build a workflow](#3-create-your-workflow). The later sections cover testing, publishing, and monitoring.

## Requirements

- A Microsoft work or school account with access to the environment that you want to use.

  Confirm account and subscription requirements with your environment administrator.

- Access to the [Azure Logic Apps Automation portal](https://auto.azure.com).

- Access to an environment and an app where you can build workflows. Confirm the required assignments with your environment or app administrator before you start.

  If you don't have environment access, contact your environment administrator so they can validate and assign the required permissions.

## 1. Open your environment

1. Sign in to the [Azure Logic Apps Automation portal](https://auto.azure.com).

   The portal opens and shows every environment where you currently have access. If you don't see the expected environments, contact your environment administrator to validate your assignments.

1. On the **Environments** tab, select your environment.

   The portal opens the environment and shows the **Apps** page.

1. If the environment is empty, go to the next section to create an app. 

   Otherwise, select the app where you want to create your workflow, and skip to [Create your workflow](#3-create-your-workflow).

## 2. Create an app

If your environment doesn't include an app to store and organize workflows, follow these steps to create an app:

1. In the environment, on the **Apps** page, select **Create app**.

1. In the **Create application** box, for **Application name**, enter a name for your app, and select **Create**.

   The following synthetic example uses a fictional app name:

   ![Synthetic Create application dialog with an example app name.](https://github.com/user-attachments/assets/8f71d8d9-d659-433a-b319-49dd769ddbd6)

   The portal might take a couple minutes to create your app.

1. To check that the app is ready for you to open and continue, review the **Status** column.

1. After app creation completes, select your app.

   The portal opens the app and shows the **Workflows** list.

1. If others need to create workflows in your app, [add them as app members](#add-app-members).

## 3. Create your workflow

1. In your app, on the **Workflows** page, select **Create workflow**.

1. In the **Create workflow** box, enter the name, and select **Create**.

   The following synthetic example uses a fictional workflow name:

   ![Synthetic Create workflow dialog with an example workflow name.](https://github.com/user-attachments/assets/7f282218-ca42-4388-8d75-544866e4a03f)

1. After the portal opens the designer, choose an option to start creating your workflow.

   | Option | Path |
   |---------|------|
   | **AI assistant** | Generate your workflow on the designer, based on your description about what the workflow does. <br><br>For more information, see [Generate workflow with assistant](#3a-generate-a-workflow-with-the-assistant). |
   | **Designer** | Add the trigger and each action from the connectors library. <br><br>For more information, see [Build a workflow with the designer](#3b-build-a-workflow-with-the-designer). |

## 3a. Generate a workflow with the assistant

1. On the bottom toolbar, select **Copilot**.

1. In the chat box, enter your workflow description. Select **Generate**.

   The following synthetic example shows a fictional workflow description:

   ![Assistant composer with a fictional workflow prompt.](https://github.com/user-attachments/assets/3f261446-125b-4614-af30-f596cb6dfb14)

   In this synthetic example, the assistant response and partially visible workflow are fictional:

   ![Fictional assistant response alongside a partially visible example workflow.](https://github.com/user-attachments/assets/34789b1b-5e69-41aa-a4ed-44e916a5af72)

   :::important
   Generated workflows still need setup. The AI assistant generates the workflow scaffolding, such as the trigger, actions, branches, and so on. But the assistant doesn't know your credentials or environment-specific values. Before you run your first workflow, complete any required follow-up tasks.
   :::

1. Complete any remaining follow-up tasks that your workflow needs to run successfully, for example:

   - Add any required parameter values that the assistant left empty.
   
     1. Open the information box for the trigger and each action.

     1. Find the parameters marked with an asterisk or red outline.

   - Configure the connections for each connector trigger and action.
   
     - On your app sidebar, select **Connections**. Review each connection and complete the necessary setup.

     - In the designer, open the information box for the connector trigger and each action. Review the **Connect** or **Connection** section and complete the necessary setup.

   - Resolve any prompts on the trigger or actions that show a label named **Finish configuring with Copilot**.

## 3b. Build a workflow with the designer

When you start with an empty designer, manually add the trigger and actions that provide your workflow's behavior.

### Add the trigger

Every workflow starts with a trigger, which identifies the event or condition that runs the workflow.

1. On the empty designer, select **Start from scratch** or **Add a trigger** to open the trigger picker.

   The following synthetic example shows the trigger picker:

   ![Synthetic designer with the Add a trigger picker open.](https://github.com/user-attachments/assets/e643a03c-a097-4fc8-93bd-45059eab3487)

1. Search or browse the triggers in the pane, and select the trigger you want.

   For example:

   | Trigger type | Trigger name | Description |
   |--------------|--------------|-------------|
   | **Request** | **When an HTTP request is received** | A webhook trigger that handles incoming requests sent from external callers. |
   | **Schedule** | **Recurrence** | A trigger that runs on a specified schedule. |

1. In the trigger information box, enter any required details, and then close the box.

   Your selected trigger appears on the designer.

### Add an action

After the trigger, an action performs a specific task in the workflow.

1. On the designer, following the trigger, select the plus sign (+) to add an action.

1. When the **Add an action** pane opens, search or browse the actions. Select the action you want. 

1. In the action information box, enter any required details for the action to work, and then close the box.

   Your selected action appears on the designer.

   To run actions in parallel, use branches on the designer and review each branch's actions and dependencies.

### Other designer actions

On the designer, the bottom toolbar gives you the following controls, which are covered later in this guide:

| Action | Description |
|---|---|
| **Add** | Add an operation anywhere on the designer. |
| **Code** | View the raw underlying JSON alongside the designer. |
| **Test** | Open the workflow test controls. |
| **Copilot** | Open the AI assistant alongside the designer to iterate over your workflow. |

## 4. Edit your workflow with AI or in code

To continue editing your workflow, you have the following options:

- Keep using the designer.

- Describe your changes in natural language by opening the AI assistant.

- Directly edit the workflow's underlying JSON definition by switching to the code editor. Valid changes synchronize with the designer; fix JSON errors before saving.

  For an illustration of the code editor, see [View and edit underlying JSON](/features/visual-designer/#view-and-edit-underlying-json).

## 5. Test for missing setup details

Before using **Test**, review the workflow and its connections. A test can affect connected systems. The following synthetic example shows the **Draft** label on the designer's title bar:

![Synthetic workflow designer with a Draft label next to the workflow name.](https://github.com/user-attachments/assets/387999d7-9c34-4114-b309-34edc7b9eafc)

If **Test** isn't available, confirm how to test the workflow with your administrator before publishing or running it.

1. In the designer, on the bottom toolbar, select **Test** to open the **Test draft workflow** box.

1. In the **Trigger** box, confirm the selected trigger.

1. If **Test data (JSON)** appears, enter a sample JSON body that matches the inputs expected by your trigger and actions.

1. After you finish, select **Test Draft**.

   The **Monitoring** tab opens to show the running workflow. The runs list shows run history, including details such as status and duration.

<span id="6-publish-draft-to-production"></span>

## 6. Publish your workflow

Before selecting **Publish**, confirm its effect with your administrator and review the workflow and its connections. Workflow actions can affect connected systems.

1. On the **Designer** tab, in the upper right corner, select **Publish**.

1. To switch to the published workflow, next to **Publish**, from the vertical ellipses (**...**) menu, select **View published version**.

   The following synthetic example shows the resulting read-only published view:

   ![Synthetic published workflow view marked read-only.](https://github.com/user-attachments/assets/f725db02-08c4-4660-9e03-9ea224caa0ab)

## 7. Run and monitor your workflow

Before running a workflow, confirm the version, inputs, and potential effects on connected systems. Then follow these steps:

1. Next to the **Designer** tab, select **Monitoring**.

1. Start a run by selecting **Run workflow**, **Run**, or **Test draft** in the monitoring view, based on which control appears in your portal view.

1. In the **Trigger** box, confirm the selected trigger.

1. Enter any input requested by the dialog. Depending on the workflow mode and trigger, it might offer **Test data (JSON)** or request fields such as **Headers**, **Query parameters**, and **Body**.

1. After you finish, select **Run** or **Test Draft**, as shown.

   The **Monitoring** tab opens to show the running workflow. The runs list shows run history, including details such as status and duration.

## 8. Examine the run history

To explore the run history in more detail, follow these steps:

1. In the **Runs** list, select the run you want.

   The following synthetic example shows a fictional run overview; no action is selected:

   ![Synthetic run overview with fictional status and execution log.](https://github.com/user-attachments/assets/9652907d-774f-4739-b522-7cda671d1f87)

1. On the canvas or in the execution log, select the trigger or an action to review its available output, input, and properties.

   If an action failed, review its available details for error information.

## 9. Iterate on your workflow

To edit your workflow, return to the **Designer** tab and select **Edit draft**. Or, send follow-up instructions to the assistant.

For example, you might ask the assistant to `add error handling to the HTTP action` or `use Slack to post alerts instead`.

Confirm save and publish behavior with your administrator before making release decisions.

## App ownership and privacy

Before relying on ownership or privacy assumptions, confirm the expected behavior and required access with your app or environment administrator.

For more information, see [Permissions](/features/permissions/).

## Add app members

To add team members to your app so they can build workflows, follow these steps:

For the distinction between environment and app access, see [Permissions](/features/permissions/).

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), on the **Environments** page, select the environment that contains your app.

1. On the **Apps** page, select the app. On the app sidebar, select **Settings**.

1. On the **Settings** page, select the **User permissions** tab, and complete the following steps:

   1. In the **Users** section, select **Add user**.

   1. On the **Add role assignment** pane, in the **Select user** box, browse for the person you want. Or, enter their email address.

   1. From the results, select the person you want.

1. After the **Role** section appears, select the role the person needs, based on the principle of least privilege, and then select **Add**.

   Confirm the role's capabilities with your administrator before assigning access.

## Next steps

- [Troubleshoot problems](/getting-started/troubleshoot/)
- [Designer](/features/visual-designer/)
- [AI assistant](/features/ai-assistant/)
- [Connectors](/features/connectors/)
- [Runs and monitoring](/features/runs-and-monitoring/)
- [Report a bug](/support/report-a-bug/)
