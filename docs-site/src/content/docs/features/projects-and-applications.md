---
title: Environment structure
description: Learn about environments, apps, knowledge bases, sandboxes, and their relationships for organizing your work.
sidebar:
  order: 1
---

Azure Logic Apps Automation organizes your automation using the following hierarchy and structure:

```
Environment
   ├─ Apps
   │   ├─ Workflows
   |   |     ├─ Designer
   |   |     └─ Monitoring (workflow runs and history)
   |   |
   │   ├─ Connections
   │   ├─ Parameters
   │   ├─ Analytics
   │   └─ Settings (environment variables, app permissions)
   │
   ├─ Knowledge
   ├─ Sandboxes
   └─ Settings (environment permissions)
```

## Environment

An environment is the top-level container resource that stores your apps, knowledge bases, sandboxes, and environment settings. As the environment creator, you're automatically the environment owner. You manage access and governance for environment resources at the environment level. To control who can access environment resources, environment settings use role-based access control (RBAC).

When to create an environment:

- Isolation: Separate access control, limits, quotas, billing context 
- Context: New or separate business domain

The following table describes the environment contents in more detail:

| Item | Description |
|------|-------------|
| [Apps](#apps) | The deployable package for your workflows, connections, parameters, analytics data, and app settings. |
| [Knowledge](/features/knowledge-bases/) | Include Azure AI Search, Foundry IQ, Document Upload, or Work IQ so an agent can ground responses in your data. (preview) |
| [Sandboxes](/features/sandboxes/) | The isolated micro, virtual machine, compute environments where workflow agents run code and can optionally use cloned repos and skills. |
| Settings | Environment-level user permissions and environment variables. |

## Apps

In your environment, an app is a deployable resource that stores your workflows, connections, parameters, analytics data, and app settings. Many teams have several apps per environment where each app maps to a logical service like `order-processing`, `notifications`, and `daily-reports`.

As the app creator, you're automatically the app owner. You manage access and governance for app resources at the app level. To control who can access app resources, app settings use role-based access control (RBAC).

The following table describes app contents in more detail:

| Item | Description |
|------|-------------|
| [Workflows](/features/workflows/) | The automation workloads that exist in an app and include the starting event (*trigger*) and the tasks to perform or control flow (*actions*). |
| Connections | The reusable, authenticated bindings that connect to external services such as Teams, SharePoint, and Service Bus. |
| Parameters | The named values referenced in workflows like environment-specific URLs, timeouts, and feature flags. |
| Analytics | Run trends, success and failure rates, and per-action latency. |
| Settings| App-level user permissions and environment variables. |

## Choose the work level for your work

| Item to add | Level |
|-------------|-------|
| New automation | New workflow in the related app. |
| New logical service for a different team, connection set, or service level objective (SLO) | New app in the related environment. |
| Separate business domain or access boundary | New environment. |
| New code execution environment for agents with cloned repos | New sandbox in the related environment. |

## Related content

- [Set up](/getting-started/setup/)
- [Quickstart](/getting-started/quickstart/)
