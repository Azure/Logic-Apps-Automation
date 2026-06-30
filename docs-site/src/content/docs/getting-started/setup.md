---
title: Set up - Azure Logic Apps Automation
description: Create projects to store your apps and workflows.
sidebar:
  order: 2
  label: Set up
---

Before you create your first workflow, you need a project to store your apps and workflows. If you don't have a project yet, follow these steps.

## Requirements

- An Azure account and subscription that uses a Microsoft work or school account. [Get a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn_c4e22ddd-ca68-7d5b-5f0d-0c961983e0ef).

  > [!NOTE]
  >
  > You need an Azure subscription only to create projects. Make sure that your account can access the [Azure Logic Apps Automation portal](https://auto.azure.com).

- For you to add a project member, they need an Azure account that uses a Microsoft work or school account in your Microsoft Entra tenant. They don't need an Azure subscription to create apps and workflows.

## 1. Sign in to the portal

1. Go to the [Azure Logic Apps Automation portal](https://auto.azure.com), and select **Sign in**.

   :::image type="content" source="media/setup/sign-in.png" alt-text="Screenshot shows the Azure Logic Apps Automation portal home page for sign in." lightbox="media/setup/sign-in.png":::

1. Sign in with your Azure account.

## 2. Create a project

Create a project to store your apps and workflows.

1. On the **Projects** tab, select **Create project**.

1. In the **Create automation project** box, provide the following information:

   | Property | Description |
   |----------|-------------|
   | **Subscription** | Your Azure subscription. |
   | **Resource group** | The [Azure resource group](/azure/azure-resource-manager/management/overview#terminology) for organizing your project resources. |
   | **Location** | The Azure region closest to your end users or the components that your workflows need to use. |
   | **Automation project name** | A unique project name across Azure regions. |

1. When you finish, select **Create**.

   > [!NOTE]
   >
   > The project creation process might take several minutes to finish.

1. After the portal creates your project, select your project.

Before you can start building workflows, you need to create an app as a deployable package for your workflows. To continue with this task, see [Quickstart](/getting-started/quickstart/).

Before others can work in your project to create apps and build workflows, [add them as project members](/azure/logic-apps/automation/quickstart-create-dynamic-automation-projects#add-project-members).

## Next

- [**Quickstart**](/getting-started/quickstart/)
- [**Troubleshoot problems**](/getting-started/troubleshoot/)
