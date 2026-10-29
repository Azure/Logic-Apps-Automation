---
title: Connectors
description: Learn about prebuilt integrations for services, systems, SaaS apps, databases, and REST APIs.
sidebar:
  order: 7
---

## Overview

In Azure Logic Apps Automation, a *connector* is a prebuilt integration for a service, system, SaaS app, data source, or API outside your workflow.

Workflow connections are configured in an app and store authentication settings for its workflows. Other connection types can have a different scope.

## Built-in operations

Built-in operations are available in the workflow designer. The following table describes some common built-in operations:

| Operation group | Operation | Description |
|---|---|---|
| **Schedule** | **Recurrence** | Trigger a workflow on a schedule. |
| **HTTP** | **HTTP** | Send generic REST API calls like `GET` or `POST`. |
| **Control** | - **Condition** <br>- **Switch** <br>- **For each** <br>- **Until** | Change the flow based on meeting specific criteria. |
| **Data Operations** | - **Compose** <br>- **Parse JSON** <br>- **Select** <br>- **Filter array** <br>- **Join** | Perform data shaping. |
| **Variables** | - **Initialize variable** <br>- **Set variable** <br>- **Increment variable** <br>- **Decrement variable** | Create and manage variable values. |
| **AI Agents** | [Agent options](/features/agents/#choose-an-agent) | Add an agent to a workflow. |

## Managed connectors

Managed connectors provide operations for services, systems, apps, and databases. You usually need to set up connections that require authentication. Examples include Outlook, SharePoint, Teams, OneDrive, Salesforce, Slack, and ServiceNow.

## Service integration examples

The following table describes examples of service integrations. The connector type and available operations can vary.

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

## GitHub and Azure DevOps

When available in your environment, the [GitHub connector](/guides/github-connector/) and [Azure DevOps connectors](/guides/azure-devops-connectors/) provide operations and event triggers for development workflows. Review the connection methods and permissions offered for the operations you choose.

## HTTP for everything else

If the service you want to connect doesn't have a prebuilt connector, use the built-in **HTTP** action to access REST and JSON APIs. To create and feed strongly-typed outputs to subsequent actions in your workflow, follow the **HTTP** action with the built-in **Parse JSON** action.

## Related content

- [Quickstart](/getting-started/quickstart/#3-create-your-workflow)
- [Visual designer](/features/visual-designer/)
- [AI assistant](/features/ai-assistant/)
- [GitHub connector](/guides/github-connector/)
- [Azure DevOps connectors](/guides/azure-devops-connectors/)
