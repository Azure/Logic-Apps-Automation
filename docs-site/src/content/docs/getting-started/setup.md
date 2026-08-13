---
title: Set up - Azure Logic Apps Automation
description: Create projects to store your apps and workflows.
sidebar:
  order: 2
  label: Set up
---

## Create projects to store apps and workflows

When your team builds automation solutions, keep your apps, their workflows, connections, and other items organized, secure, and separate so that unrelated work doesn't cross boundaries. Otherwise, automation assets become harder to manage, govern, and scale as your team grows.

In Azure Logic Apps Automation, a *project* is a top-level, isolated container that solves this problem by providing its own compute, networking, security, and governance. As your first step, create a project to store your apps and their contents. You can create a project per team, business area, or scenario so your teams can independently build and manage their automations.

Azure Logic Apps Automation organizes your work at the following levels:

| Level | Contents |
|-------|----------|
| [*Project*](introduction#key-components-and-concepts) | The top-level, parent container that stores *apps*. As the project creator and default owner, you control access and governance at this level. |
| [*App*](introduction#key-components-and-concepts) | A deployable package that stores workflows, connections, parameters, analytics, settings, and other items that your automation needs. |
| [*Workflow*](introduction#key-components-and-concepts) | The automation workload itself, which includes the starting event ([*trigger*](introduction#key-components-and-concepts)) and the steps ([*actions*](introduction#key-components-and-concepts)) to run. |

This guide shows how to create a project if you don't have one yet and add team members to your project.

For more information, see:

- [What is Azure Logic Apps Automation](introduction)
- [Key concepts and terminology](introduction#key-components-and-concepts)

## Requirements

- An Azure account and subscription that uses a Microsoft work or school account so you can create projects. [Get a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn_c4e22ddd-ca68-7d5b-5f0d-0c961983e0ef).

  > [!NOTE]
  >
    > You need an Azure subscription only to create projects. Make sure your account can access the [Azure Logic Apps Automation portal](https://auto.azure.com).

- To add a team member to your project and for them to create apps and workflows, they need the following items:

  - A Microsoft work or school account in your Microsoft Entra tenant. No Azure subscription necessary.
  - Access to the automation portal.

  For more information about Microsoft Entra tenants, see [Tenant configurations](/entra/identity-platform/v2-overview#tenant-configurations).

## Create your project

1. Sign in to the [Azure Logic Apps Automation portal](https://auto.azure.com) with your Azure account.

   :::image type="content" source="media/setup/sign-in.png" alt-text="Screenshot shows the Azure Logic Apps Automation portal home page for sign in." lightbox="media/setup/sign-in.png":::

1. On the **Projects** tab, select **Create project**.

1. In the **Create automation project** box, provide the following information:

   | Property | Description |
   |----------|-------------|
   | **Subscription** | Your Azure subscription. |
   | **Resource group** | The [Azure resource group](https://learn.microsoft.com/azure/azure-resource-manager/management/overview#terminology) for organizing your project resources. Enter a unique name across Azure regions that uses only alphanumeric characters, hyphens (`-`), underscores (`_`), parentheses (`()`), or periods (`.`). |
   | **Region** | The Azure region closest to your end users or the components that your workflows need to use. |
   | **Name** | A unique project name across Azure regions that uses only alphanumeric characters, hyphens (`-`), underscores (`_`), parentheses (`()`), or periods (`.`). |

1. When you finish, select **Create**.

   > [!NOTE]
   >
   > The project creation process might take several minutes to finish.

1. After the portal creates your project, select your project.

1. Before others can work in your project to create apps and workflows, [add them as project members](#add-project-members).

1. Before you or others can start building workflows, [create an app](quickstart#2-create-an-app) as a deployable package for your workflows.

## Project ownership and privacy

As the project creator, you automatically:

- Become the project owner and appear in the **Project Owner** project property, which is a property, not a permission level. You can't clear or remove this property value.
- Have [**Contributor** role permissions](/features/permissions#project-roles) on the project resource.
- Have administrator-level permissions to delete the project and its resources, such as apps or sandboxes, including items you don't own. Non-owner members with the **Contributor** role can't perform these tasks.

For more information, see [Permissions](/features/permissions/).

## Add project members

Before others can create apps and workflows in your project, add them as project members:

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), find and open your project.

1. On your project home page, on the sidebar, select **Settings**.

1. In the **Users** section, select **Add user**.

1. On the **Add role assignment** pane, in the **Select user** box, enter the name or the email address for the person you want to add.

   The **Select user** list shows only people in the same Microsoft Entra tenant as you.

1. From the results, select the correctly matching person.

1. After the **Role** section appears, select the role the person needs, based on the principle of least privilege, and then select **Add**.

   The following table describes the available roles at the project level, what they can do, and what they can't do:

   | Role | Can | Can't |
   |------|-----|-------|
   | **Reader** (view only) | - View only the project settings, members list, sandbox configurations, and shared resources. <br>- View workflow run history. | - Create, edit, or delete anything. <br>- View apps. <br>- Trigger or cancel workflow runs. <br>- Manage permissions. |
   | **Author** | - Create apps, sandbox configurations, and shared resources. <br>- View the project settings, members list, and sandbox configurations. | - Edit the project settings and manage project members. <br>- View apps or their content without explicit app-level permissions. |
   | **Contributor** | - View and edit project settings, manage the project, and manage project members. <br>- Create apps, but view only metadata for others' apps. <br>- Create and edit sandbox configurations. <br>- View workflows, connections, and parameters. <br>- Create, edit, and delete workflows. <br>- Create and edit connections. <br>- View workflow run history. <br>- Trigger and cancel workflow runs. <br>- Manage app permissions. | - Delete the project (owner only). <br>- View app content without explicit app level permissions. |

   > [!NOTE]
   >
   > By default, apps are always private, which means that only their creators (owners) can view and access their apps. They're invisible to other project members until the creator-owner explicitly shares them.
   >
   > Project contributors or owners can view app metadata for governance, but not the content. Apps often contain automation that connects to personal accounts. So, privacy by default keeps this data obscured unless explicitly shared.
   >
   > App owners or contributors can explicitly add members by granting app-level roles. To grant access to a specific app, open that app, go to **Settings**, **User permissions**, and add the member you want.

## Next

- [Quickstart](/getting-started/quickstart/)
- [Troubleshoot problems](/getting-started/troubleshoot/)
