---
title: Environment structure
description: Learn about environments, apps, knowledge bases, sandboxes, and their relationships for organizing your work.
sidebar:
  order: 1
---

## Overview

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

An environment is the top-level container resource that stores your apps, knowledge bases, sandboxes, and environment settings.

When to create an environment:

- You want a dedicated container for a team or process.
- You want to organize work by business domain or lifecycle.

The following table describes the environment contents in more detail:

| Item | Description |
|------|-------------|
| [Apps](#apps) | Organize workflows, connections, parameters, and app settings. |
| [Knowledge](/features/knowledge-bases/) | Sources that agents can use for context. |
| [Sandboxes](/features/sandboxes/) | Environments where agents can run code. |
| Settings | Environment-level user permissions and configuration. |

## Apps

In your environment, an app organizes workflows, connections, parameters, and app settings. An app also provides views of workflow runs and analytics. You can organize related workflows into apps for logical services such as `order-processing`, `notifications`, and `daily-reports`.

Before making access or ownership decisions, confirm your environment's current role and ownership behavior with your administrator.

The following table describes app contents in more detail:

| Item | Description |
|------|-------------|
| [Workflows](/features/workflows/) | The automation workloads that exist in an app and include the starting event (*trigger*) and the tasks to perform or control flow (*actions*). |
| Connections | The reusable, authenticated bindings that connect to external services such as Teams, SharePoint, and Service Bus. |
| Parameters | The named values referenced in workflows like environment-specific URLs, timeouts, and feature flags. |
| Analytics | Run trends, status summaries, and run latency. |
| Settings| App-level user permissions and environment variables. |

## Choose the work level for your work

| Item to add | Level |
|-------------|-------|
| New automation | New workflow in the related app. |
| New logical service for a different team, connection set, or service level objective (SLO) | New app in the related environment. |
| Separate business domain | New environment. |
| New code execution environment for agents | New sandbox in the related environment. |

## Related content

- [Set up](/getting-started/setup/)
- [Quickstart](/getting-started/quickstart/)
