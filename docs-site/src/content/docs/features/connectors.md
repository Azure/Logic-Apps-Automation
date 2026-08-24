---
title: Connectors
description: Learn about prebuilt integrations that easily connect you to 1,400+ services, systems, SaaS apps, databases, and REST APIs.
sidebar:
  order: 7
---

In Azure Logic Apps Automation, a *connector* is a prebuilt integration for a service, system, SaaS app, data source, or API outside your workflow. The connector catalog includes 1,400+ connectors, so you can build most workflows without writing code.

Connections exist inside apps where each connection stores your authentication setup. You can reuse the same connection across every workflow in the same app.

## Built-in operations

Built-in operations run natively in the same process as the platform's runtime and usually don't need an external connection. The following table describes some common built-in operations:

| Operation group | Operation | Description |
|---|---|---|
| **Schedule** | **Recurrence** | Trigger a workflow on a schedule. |
| **HTTP** | **HTTP** | Send generic REST API calls like `GET` or `POST`. |
| **Control** | - **Condition** <br>- **Switch** <br>- **For each** <br>- **Until** | Change the flow based on meeting specific criteria. |
| **Data Operations** | - **Compose** <br>- **Parse JSON** <br>- **Select** <br>- **Filter array** <br>- **Join** | Perform data shaping. |
| **Variables** | - **Initialize variable** <br>- **Set variable** <br>- **Increment variable** <br>- **Decrement variable** | Create and manage variable values. |
| **AI Agents** | **Workflow Agent**, **Coding agent** | Run agents that use models to perform tasks or execute code. |

## Managed connectors

Managed connector operations run in global, multitenant Azure and expose REST APIs so you can access and work with popular cloud services, systems, apps, and databases. You usually need to set up connections that require authentication. Examples include Outlook, SharePoint, Teams, OneDrive, Salesforce, Slack, GitHub, and ServiceNow.

The following table describes some common managed connector operations:

| Operation group | Operation | Description |
|---|---|---|
| **Azure Storage** | Various | Manage blob, queue, file, and table storage. |
| **Office 365 Outlook** | Various | Manage email, calendars, and contacts. |     
| **SharePoint** | Various | Manage files and folders. |
| **File System** | Various | Manage files on the host or a mounted file share. |
| **Service Bus** | Various | Manage queues, subscriptions, and topics. |
| **Event Hubs** | Various | Manage events. |
| **Azure Cosmos DB** | Various | Manage documents and stored procedures. |
| **SQL Server** | Various | Manage queries, rows, and stored procedures in Azure SQL or SQL Server. |
| **Inline Code** | **Execute JavaScript code** | Run code snippets inline with your workflow. | 

## HTTP for everything else

If the service you want to connect doesn't have a prebuilt connector, use the built-in **HTTP** action to access REST and JSON APIs. To create and feed strongly-typed outputs to subsequent actions in your workflow, follow the **HTTP** action with the built-in **Parse JSON** action.

## Related content

- [Quickstart](/getting-started/quickstart/#3-create-your-workflow)
- [Visual designer](/features/designer/)
- [AI assistant](/features/ai-assistant/)
- [Connectors](/features/connectors/)
