---
title: Connectors
description: Learn about prebuilt integrations for services, systems, SaaS apps, databases, and REST APIs.
sidebar:
  order: 7
---

## Overview

In Azure Logic Apps Automation, a *connector* is a prebuilt integration for a service, system, SaaS app, data source, or API outside your workflow.

Workflow connections are configured in an app and store authentication settings for its workflows. Other connection types can have a different scope.

An **action** performs a task in a workflow. A **trigger** starts a workflow in response to an event or schedule. Not every connector provides both.

## Connector types

| Type | How it works | Where to find details |
|---|---|---|
| **Built-in operations** | Workflow primitives run in the workflow runtime, such as a condition, an HTTP request, or a variable update. | [Built-in operations](#built-in-operations) |
| **Built-in service-provider connectors** | Service integrations run with the workflow runtime and use connections where required. | [Connector catalog](#service-integration-examples) |
| **Managed connectors** | Azure-hosted connectors provide integrations with external services, separate from the workflow runtime. | [Managed connectors](#managed-connectors) |

For general concepts, see the [Microsoft Learn connector overview](https://learn.microsoft.com/en-us/azure/connectors/introduction). For other service integrations and their operation references, see the [Logic Apps Standard built-in connector catalog](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/). These references describe Logic Apps, including Standard; they don't guarantee availability or operation parity in your Automation environment.

## Built-in operations

Built-in operations run within a workflow. The following table summarizes common operation groups; availability can vary by environment.

| Operation group | Operation | Description |
|---|---|---|
| **Schedule** | **Recurrence**, **Delay**, **Delay until** | Start a workflow on a schedule or wait before continuing. |
| **Request and response** | **Request**, **Response** | Start a workflow from an incoming request and return a response. |
| **HTTP** | **HTTP** | Send generic REST API calls like `GET` or `POST`. |
| **Control** | **Condition**, **Switch**, **For each**, **Until**, **Scope**, **Terminate** | Branch, repeat, group, or stop workflow steps. |
| **Data Operations** | **Compose**, **Parse JSON**, **Select**, **Filter array**, **Join** | Shape and format data. |
| **Variables** | Initialize, set, increment, decrement, and append | Create and manage variable values. |
| **AI Agents** | [Agent options](/guides/agent-options/) | Add an agent to a workflow. |

## Managed connectors

Managed connectors provide operations for services, systems, apps, and databases. Their catalog and operations depend on your environment, so browse the designer's connector picker for the services and actions available to your app. Workflow connections store the settings used to connect to a service.

## Service integration examples

### Connector catalog

The following catalog summarizes the built-in service-provider connectors covered by these guides. The operation counts exclude internal discovery and webhook-management helpers. Availability depends on your deployed environment; a connector's inclusion here doesn't mean that it is deployed or enabled for your app. Check the designer's connector picker before building a workflow.

| Connector | Actions | Triggers | What you can do |
|---|---|---|---|
| [Azure Advisor](/guides/azure-advisor-connector/) | 4 | None | Read recommendations, scores, and snoozed or dismissed recommendation rules. |
| [Azure Resource Graph](/guides/azure-resource-graph-connector/) | 7 | None | Query resource inventory and manage saved shared queries. |
| [Azure Monitor Logs](/guides/azure-monitor-logs-connector/) | 3 | None | Run log queries and discover workspace schema. |
| [GitHub](/guides/github-connector/) | 46 | 12 | Work with repositories, issues, pull requests, commits, files, releases, workflow runs, and repository events. |
| [Azure DevOps Boards](/guides/azure-devops-connectors/#boards) | 17 | 5 | Manage work items, queries, boards, and iterations; respond to work item events. |
| [Azure DevOps Repos](/guides/azure-devops-connectors/#repos) | 33 | 5 | Inspect commits and item metadata, manage pull requests, and respond to repository events. |
| [Azure DevOps Pipelines](/guides/azure-devops-connectors/#pipelines) | 10 | 10 | Create and run pipelines, inspect logs and artifacts, and respond to run, stage, job, and approval events. |
| [Azure DevOps Build](/guides/azure-devops-connectors/#build) | 80 | 1 | Manage builds, definitions, retention, and source providers. Requires explicit enablement; not registered by default. |

An environment-specific [GitHub Enterprise variant](/guides/github-connector/#github-enterprise-variant) shares GitHub's operation set but also requires explicit enablement. It isn't registered by default.

See the [built-in service provider catalog](/guides/built-in-connectors/) for storage, messaging, database, file, and AI integrations.

## GitHub and Azure DevOps

When available in your environment, the [GitHub connector](/guides/github-connector/) and [Azure DevOps connectors](/guides/azure-devops-connectors/) provide actions and event triggers for development workflows.

## Add a connector operation

1. Open a workflow in the designer and add a trigger or action.
1. Search for the service and select the connector version and operation you need.
1. Select or create a connection when prompted, then complete the operation's required fields.
1. Save and test the workflow with resources and data you're authorized to use.

### Connections and permissions

You can also create a workflow connection from your app's **Connections** page: select **Add connection**, choose **Connectors**, and search for the service. Return to the workflow operation and select that connection.

Use the authentication methods offered by the selected connector in your environment. Grant only the service permissions required for the chosen operations. Event triggers can also require permission to create repository webhooks or Azure DevOps Service Hooks subscriptions. Store credentials in connections, not workflow definitions.

A sandbox repository connection is separate from an app's workflow connection. See [Sandbox setup](/guides/create-sandboxes/#1-create-the-configuration).

### Create an OAuth service-provider connection

When OAuth is available for a built-in service-provider connector:

1. Add an action or trigger from the connector to a workflow.
1. In **Connection**, select **Create new** and enter a connection name.
1. If more than one authentication type is available, select the OAuth option.
1. Complete any connector-specific prerequisites, then select **Sign in** and
   complete sign-in and consent.
1. Select the new connection and save the workflow.

You can also start from the app's **Connections** page. Select **Add
connection**, choose **Connectors**, select the connector, and complete the same
sign-in flow. If OAuth isn't offered, it isn't enabled for that connector in
your environment.

Creating an OAuth service-provider connection configures authentication for
that connector's actions and triggers. It doesn't automatically configure model
calls or repository access for a sandbox. Complete those setup flows
separately.

### Manage an OAuth service-provider connection

On the app's **Connections** page, find the connection under **Service provider
connections**.

- **Connected** means the authorization is ready to use.
- **Not connected** means the authorization is missing or no longer valid.
- **Unknown** means the connection state couldn't be determined.

To restore authorization, edit the connection and select **Sign in** again. To
change the account, delete the connection and create it again with the intended
account. Deleting a connection also removes its OAuth authorization, so
reconnect any workflow actions or triggers that used it.

The app stores a reference to the OAuth connection, not the OAuth token or
authorization code, in its workflow connection configuration.

### If a connector or operation doesn't work

- If the connector or operation isn't listed, confirm its deployment and enablement with your environment administrator. Build and the environment-specific GitHub Enterprise variant require explicit enablement.
- If a resource isn't listed or an action is denied, check the selected connection, service permissions, and resource scope.
- If an event trigger doesn't receive events, check its event filters and webhook or Service Hooks subscription, then inspect [run history](/features/runs-and-monitoring/).
- If an OAuth connection remains **Not connected**, edit it and sign in again.

## HTTP for everything else

If the service you want to connect doesn't have a prebuilt connector, use the built-in **HTTP** action to access REST and JSON APIs. To create and feed strongly-typed outputs to subsequent actions in your workflow, follow the **HTTP** action with the built-in **Parse JSON** action.

## Related content

- [Quickstart](/getting-started/quickstart/#3-create-your-workflow)
- [Visual designer](/features/visual-designer/)
- [AI assistant](/features/ai-assistant/)
- [GitHub connector](/guides/github-connector/)
- [Azure DevOps connectors](/guides/azure-devops-connectors/)
- [Azure Advisor connector](/guides/azure-advisor-connector/)
- [Azure Resource Graph connector](/guides/azure-resource-graph-connector/)
- [Azure Monitor Logs connector](/guides/azure-monitor-logs-connector/)
- [Built-in service provider catalog](/guides/built-in-connectors/)
