---
title: Permissions
description: Two-scope role-based access model — environments, apps, owners, and how to share.
sidebar:
  order: 3
---

Access to the platform is controlled by a simple two-scope role model, plus a separate **owner** property on each resource. This page covers the model, the role matrix, and the most common sharing workflows.

## At a glance

- **Two independent scopes** — *Environment* (organisational) and *Application* (content).
- **Three permission levels** — *Contributor* (admin), *Author* (creator), *Reader* (view-only).
- **Owner** is a resource property, not a permission level. The creator is the owner.
- **Apps are private by default** — invisible to other environment members until you explicitly share them.
- **App-scope grant auto-adds environment Reader** — so collaborators can reach the environment resources the app depends on.

---

## Scopes and roles

The two scopes are evaluated independently. A user can have a role at the environment scope, at the app scope, or both.

### Environment-scope roles

| Role | Can do | Cannot do |
| --- | --- | --- |
| **Contributor** | Read + modify environment settings · invite, update, remove members · create apps · list all apps (metadata only) · create / modify sandbox configurations | Delete the environment (owner-only) · access app contents without app-scope permission |
| **Author** | Read environment settings + member list · create new apps · create sandbox configurations · read sandbox configurations | Modify environment settings · manage other users · see apps they weren't invited to · access app contents without app-scope permission |
| **Reader** | Read environment settings + member list · read sandbox configurations | Create, modify, or delete anything · see any apps (they're private by default) |

### App-scope roles

:::note
*Author* is intentionally not available at app scope — only **Contributor** and **Reader**.
:::

| Role | Can do | Cannot do |
| --- | --- | --- |
| **Contributor** | Read + modify workflows, connections, parameters · view run history · trigger / cancel / resubmit runs · manage app permissions | Delete the app (owner-only) |
| **Reader** | Read workflows, connections, parameters · view run history | Create, modify, or delete anything · trigger or cancel runs |

### Cross-scope behaviour

- An **Environment Contributor** sees app *metadata* (name, owner, dates) but **cannot** access app *contents* (workflows, connections).
- An **Environment Owner** has an admin override on sub-resources — they can delete *any* app or sandbox in the environment, even ones they don't own.
- When a user is granted app-scope permission, they **automatically receive environment Reader** — enough to reach the environment resources the app depends on.

---

## Owner

**Owner** is a property on the resource itself, set when the resource is created.

| Rule | Detail |
| --- | --- |
| Set on creation | The creator automatically becomes owner. |
| One owner per resource | Each environment / app has exactly one. |
| Cannot be removed | The owner flag can't be cleared. |
| Orthogonal to roles | An owner typically has Contributor permission too, but they're separate concepts. |

### Owner-only actions

| Scope | Only the owner can |
| --- | --- |
| Environment | Delete the environment |
| App | Delete the app |

Even Contributors can't perform these actions.

---

## Privacy by default

When you create an app, it's **invisible** to everyone else in the environment — only you (the owner) can see and access it. Environment Contributors / Owners can see app metadata for governance but **not** the app's contents.

This matters because apps often contain automations connected to personal accounts (email, calendar, OneDrive). Privacy by default keeps that data private until you explicitly share it.

To share an app, the owner (or an app Contributor) explicitly invites users by granting them an app-scope role.

---

## Common tasks

### Create an environment

1. Open the portal at **[auto.azure.com](https://auto.azure.com)**.
2. Click **Create environment**, give it a name, pick a region.
3. Click **Create**.

You become the **Environment Owner** automatically, receive **Contributor** permission at environment scope, and can immediately add members, create apps, and create sandbox configurations.

### Invite someone to an environment

1. Open the environment → **Settings** → **User permissions** tab.
2. Click **Add user**.
3. Enter the email and pick a role.

![Environment — User permissions tab](../../../assets/portal/70-project-user-permissions.png)

| The user needs to… | Give them |
| --- | --- |
| Manage the environment, invite others, see all app metadata | **Contributor** |
| Create new apps and shared resources | **Author** |
| Just view environment settings and shared resources | **Reader** |

:::caution[They still won't see your apps]
Apps stay invisible. To grant access to a specific app, switch to that app's **Settings → User permissions** tab.
:::

### Create an app

1. Open the environment.
2. Click **Create app**, name it, click **Create**.

You become the **App Owner**, receive **Contributor** permission at app scope, and the app is private to you by default.

### Share an app with a collaborator

1. Open the app → **Settings** → **User permissions** tab.
2. Click **Add user**.

![App — User permissions tab](../../../assets/portal/71-app-user-permissions.png)

3. Enter the user's email and pick a role (Contributor for full edit access, Reader for view-only).

![Add role assignment](../../../assets/portal/72-app-add-user.png)

#### What a Contributor can do

| Action | Allowed |
| --- | :---: |
| View workflows, connections, parameters | ✅ |
| Create / edit / delete workflows | ✅ |
| Create / edit connections | ✅ |
| View run history | ✅ |
| Trigger / cancel runs | ✅ |
| Manage app permissions | ✅ |
| **Delete the app** | ❌ (owner-only) |

The collaborator automatically receives environment-level **Reader** so they can reach related environment resources, and they'll see the app under their **Shared with you** view.

#### What a Reader can do

| Action | Allowed |
| --- | :---: |
| View workflows, connections, parameters | ✅ |
| View run history | ✅ |
| Create / edit / delete anything | ❌ |
| Trigger / cancel runs | ❌ |
| Manage permissions | ❌ |

Use Reader for demos, audits, or onboarding new team members without giving them edit access.

### Create shared resources (sandboxes)

1. Open the environment → **Sandboxes**.
2. Click **New sandbox** (Author or higher at environment scope is required).

| Role | Read | Create | Update | Delete |
| --- | :---: | :---: | :---: | :---: |
| Contributor | ✅ | ✅ | Only if you created it | Only if you created it |
| Author | ✅ | ✅ | Only if you created it | Only if you created it |
| Reader | ✅ | ❌ | ❌ | ❌ |
| Environment Owner | ✅ | ✅ | Only if you created it | ✅ (any resource — admin override) |

**Only the creator can update a shared resource.** The Environment Owner can delete any resource but can't edit ones they didn't create.

### Govern apps as an environment admin

Environment Owner / Contributor see every app in the environment for governance purposes — name, owner, creation date, last modified — but **not** workflow contents, connections, or run history.

| Action | Environment Owner | Environment Contributor |
| --- | :---: | :---: |
| View app metadata | ✅ | ✅ |
| Read workflow content | ❌ | ❌ |
| Edit workflows | ❌ | ❌ |
| Access connections | ❌ | ❌ |
| Delete any app | ✅ | ❌ |

This is the deliberate privacy boundary: admins can manage resources without seeing personal data.

### Handle an orphaned app

When an app's owner leaves the organisation, the app becomes **orphaned**:

- Existing collaborators keep their access.
- No one but the **Environment Owner** can delete it.
- It still shows up in the environment's governance view.

If you're the Environment Owner: open the environment app list, find the orphaned app (the owner badge will show as departed/unknown), and either leave it for the collaborators or click **Delete**.

---

## Troubleshooting

| Problem | Cause | Fix |
| --- | --- | --- |
| "I can't see any apps in the environment" | Apps are private by default. | Ask the app owner to add you at app scope, or get Contributor at environment scope to see the governance view (metadata only). |
| "I can't create an app" | You have environment Reader. | Ask a Contributor to upgrade you to Author or Contributor. |
| "I can't delete my shared resource" | Only the creator can delete a shared resource. | Ask the creator or an Environment Owner (admin override). |
| "I can't delete an app" | Only the **App Owner** can delete an app. | Contact the App Owner. If they've left, the Environment Owner can delete orphaned apps. |
| "I can't manage permissions on an app" | You need Contributor at app scope. | Ask an existing App Contributor or the App Owner to add or remove users. |
| "I can't trigger a workflow run" | You have app Reader. | Ask for Contributor at app scope, or have a Contributor trigger the run for you. |

---

## Summary

- **Two scopes** — environment and app — evaluated independently (OR logic).
- **Three levels** at environment scope, two at app scope. Author exists only at environment scope.
- **Owner is a property**, not a level — enables owner-only actions like delete.
- **Apps are private by default**, even from environment admins.
- **App-level permission auto-grants environment Reader** so collaborators can reach related resources.
- **Environment admins can govern apps** without ever seeing their contents.
