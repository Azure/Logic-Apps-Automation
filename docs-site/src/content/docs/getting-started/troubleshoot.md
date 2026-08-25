---
title: Troubleshoot problems
description: Learn how to resolve common problems that might happen in Azure Logic Apps Automation.
sidebar:
  order: 5
  label: Troubleshoot problems
---

The following tables describe common problems you might experience and their resolutions:

| Problem | Resolution |
|---------|------------|
| "You don't have access to any environment" | Ask the environment owner to add you, or create your own environment. |
| Sign in loop or single sign-on (SSO) error | Clear your cookies for the following URLs, and sign in again: <br><br>- `https://auto.azure.com` <br>- `https://login.microsoftonline.com` |
| Portal appears empty | Perform a hard refresh (Keyboard: `Cmd/Ctrl + Shift + R`). If the problem persists, [report a bug](/support/report-a-bug/). |

| Problem | Cause | Resolution |
|---------|-------|------------|
| "I can't create an app." | You have the environment **Reader** role. | Ask an environment **Contributor** to upgrade you to environment **Author** or **Contributor**. |
| "I can't view any apps in the environment." | By default, apps are private and invisible to others except the app creator-owner. | Ask the app owner to add you to the app, or make you an environment **Contributor**, if you only need to view the app metadata for governance. |
| "I can't manage permissions on apps." | You need the app **Contributor** role. | Ask the app owner or a **Contributor** to make you an app **Contributor**. |
| "An app lost its owner." | When an app owner leaves your Microsoft Entra tenant, you get the following results: <br><br>- Existing members keep their access. <br><br>- Only the **Environments Owner** can delete the app. <br><br>- The app still appears in the environment's governance view. |
| "I can't delete apps." | Only the app owner can delete their app. | Contact the app owner. If the owner is unavailable, and the app is orphaned, the environment owner can delete orphaned apps. |

## Next

- [Set up](/getting-started/setup/)
- [Quickstart](/getting-started/quickstart/)
