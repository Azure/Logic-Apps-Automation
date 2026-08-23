---
title: Permissions
description: Learn about resource ownership and permissions for access to projects and apps.
sidebar:
  order: 2
---

To support access and sharing resources with others, Azure Logic Apps Automation uses a permissions model based on resource scopes and roles. The platform also provides a separate ownership property on each resource. This article describes this model and common sharing scenarios.

## High level summary

| Aspect | Description |
|---|---|
| Resource owner | Each resource has a single owner and has an owner property independent from roles. The resource creator automatically becomes the owner. |
| Resource scopes | The following scopes work independently from each other: <br><br>- Project (organization) <br>- App (content) <br>- Sandbox (shared resources) <br><br>For example, you can have a role on a project, app, sandbox, or all these. |
| Roles | The following roles control the tasks that they can perform on resources: <br><br>- **Contributor** (administrator) <br>- **Author** (creator) <br>- **Reader** (read only) |
| App visibility and privacy | Apps are private and invisible to other project members unless you explicitly grant access. |

## Resource owner

Each resource has an **Owner** property with the following attributes:

| Rule | Description |
|---|---|
| Set at creation | The resource creator is automatically the owner. |
| One owner per resource | Each resource, such as a project, app, or sandbox, has only one owner. |
| Read only | The **Owner** property is read only. |
| Role-independent | Typically, the resource owner automatically gets the **Contributor** role. However, owner and contributor are separate, independent concepts. |
| Permitted actions | Resource owners can delete their own resources, including any resource contents they don't own. For example, project owners can delete their own projects along with any project contents they don't own. <br><br>**Note**: Contributors alone can't delete resources unless they're also the owners. |

## Project roles

The following table describes project roles in detail:

| Role | Allowed | Not allowed |
|---|---|---|
| **Contributor** | - View and edit project settings. <br>- Invite, update, and remove members. <br>- Create apps and view apps (metadata only). <br>- Create and edit sandbox configurations. <br><br>**Example**: Can view app metadata such as the name, owner, and date. <br><br>**Note**: Project owners can delete any resources in their project such as apps and sandboxes, including any they don't own. | <br>- Delete the project as the owner. <br>- Access app content without app-scoped permission. <br><br>**Example**: Can't access app content such as workflows, connections, and run history. |
| **Author** | - View project settings and members. <br>- Create and edit apps. <br>- View, create, and edit sandbox configurations. | - Edit project settings. <br>- Manage other members. <br>- View and access apps without app-scoped permission. |
| **Reader** | - View project settings and members. <br>- View sandbox configurations. | - Create, edit, or delete anything. <br>- View any apps, which are automatically private. <br><br>**Note**: If you have access to an app, you automatically get the **Reader** role on the parent project. This role lets you view project resources that the app needs.|

For more information, see:

- [Create an automation project](/getting-started/setup#create-your-project)
- [Add project members](/getting-started/setup#add-project-members)

### Project members

The following table describes the best role to choose when you add project members:

| Member task | Role |
|---|---|
| Manage a project, invite members, view all app metadata | **Contributor** |
| Create apps and shared resources | **Author** |
| Only view project settings and shared resources | **Reader** |

:::note For privacy and security reasons, project members can't automatically view apps or access app content unless they have the appropriate role on those apps.
>
> For more information, see:
>
> - [Create an app](/getting-started/quickstart#2-create-an-app)
> - [Add app members](/getting-started/quickstart#add-app-members)

## App roles

The following table describes app roles in detail:

| Role | Allowed | Not allowed |
|---|---|---|
| **Contributor** | - View, create, and edit workflows, connections, and parameters. <br>- View workflow run history. <br>- Run, cancel, or resubmit workflow runs. <br>- Delete workflows. <br>- Manage app permissions. | Delete apps they don't own. |
| **Reader** | - View workflows, connections, and parameters. <br>- View workflow run history. <br><br>**Tip**: Assign to app members for onboarding, demos, audits, and other tasks that don't need edit access. | - Create, edit, or delete anything. <br>- Run or cancel workflow runs. <br>- Manage app permissions. |

- As a reminder, project owners and those with project-level **Contributor** roles can view all the apps and their metadata in a project. Project owners can delete any resource in their projects. However, project owners and contributors can't view, edit, or access workflow content, connections, and run history. This boundary lets administrators manage resources without viewing and accessing private data.

- App members automatically get the project-level **Reader** role so they can find project-related resources. They can find the app in their **Shared with you** view.

- By design, apps don't have the **Author** role. 

For more information, see:

- [Create an app](/getting-started/quickstart#2-create-an-app)
- [Add app members](/getting-started/quickstart#add-app-members)

## App privacy and visibility

Apps often contain workflows that access and handle sensitive data. When you create an app, other project members don't automatically get the permissions to find, view, or access that app. For management and governance, project owners and contributors can find and view your app metadata. They can't view or access your app content.

This behavior makes sure that private data stays private unless you explicitly grant access. Only app owners and contributors can add others to an app by assigning the appropriate app-scoped role.

## Orphaned apps

If an app owner leaves your organization, the app becomes orphaned with the following results:

- The app's **Owner** property shows that the owner is unknown or departed.
- Existing members keep their access.
- The app still appears in the project's apps list.
- Only the project owner can delete the app.

## Sandbox roles

The following table describes sandbox roles in detail:

| Role | Allowed | Not allowed |
|---|---|---|
| Contributor | - View and create sandboxes. <br><br>- Edit and delete sandboxes they create and own. | Edit and delete sandboxes they don't create or own. |
| Author | - View and create sandboxes. <br><br>- Edit and delete sandboxes they create and own. | Edit and delete sandboxes they don't create or own. |
| Reader | View sandboxes. | Create, edit, or delete sandboxes. |

Project owners can perform the following tasks on sandboxes:

| Allowed | Not allowed |
|---|---|
| View, create, and delete sandboxes, including any they don't create or own. | Edit any resource they don't create or own. |

## Troubleshoot problems

| Problem | Cause | Fix |
|---|---|---|
| "I can't see any apps in the project" | By default, apps are private. | Ask the app owner to add you to the app, or ask the project owner to give you the project-level **Contributor** role if you only need to view app metadata. |
| "I can't create an app" | You have the project **Reader** role. | Ask a project **Contributor** to upgrade you to the **Author** or **Contributor** role. |
| "I can't manage permissions on an app" | You need the app **Contributor** role. | Ask an app **Contributor** or the app **Owner** to manage permissions. |
| "I can't delete an app" | Only the app **Owner** can delete an app. | Ask the app **Owner** or project **Owner** to delete the app. |
| "I can't trigger a workflow run" | You have the project **Reader** role. | Ask an app **Contributor** to upgrade your role or trigger the run for you. |
| "I can't delete my sandbox (shared resource)" | You're not the sandbox creator. Only the creator can delete a shared resource. | Ask the sandbox creator or project owner to delete the resource. |

## Related content

- [Quickstart](/getting-started/quickstart/)
- [Designer](/features/visual-designer/)
- [Connectors](/features/connectors/)
