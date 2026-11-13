---
title: Azure Monitor Logs connector
description: Query Azure Monitor Logs and inspect Log Analytics workspace schema.
---

## Overview

The built-in Azure Monitor Logs connector runs Kusto Query Language (KQL) queries against a Log Analytics workspace or an Azure resource's logs. Connector availability can vary by environment and region.

## Add a Logs action

1. Add an action in the workflow designer and select **Azure Monitor Logs**.
1. Choose an action and select or create its connection.
1. Provide the workspace ID or Azure resource ID. For query actions, provide a KQL query and any optional time range.
1. Test the action and inspect the returned tables before using their rows in later steps.

## Actions

| Action | What it does |
|---|---|
| **Run query on a Log Analytics workspace** | Run a KQL query against a workspace. |
| **Run query on resource logs** | Run a KQL query against a resource's logs using its Azure resource ID. |
| **Get workspace schema** | Discover workspace tables, columns, saved functions, and categories. |

Query results contain one or more tables. For example, inspect the workspace schema, run a query, and pass the returned rows to a later action.

## Triggers

This connector provides actions only. Start the workflow with a separate trigger, such as **Recurrence**, before querying logs.

## Related content

- [Connectors](/features/connectors/)
- [Connection setup and common issues](/features/connectors/#add-a-connector-operation)
- [Azure Advisor connector](/guides/azure-advisor-connector/)
- [Azure Resource Graph connector](/guides/azure-resource-graph-connector/)
