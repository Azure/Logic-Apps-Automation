---
title: Azure Monitor Logs connector
description: Query Azure Monitor Logs and inspect Log Analytics workspace schema.
---

## Overview

The built-in Azure Monitor Logs connector runs Kusto Query Language (KQL) queries against a Log Analytics workspace or an Azure resource's logs. Connector availability can vary by environment and region.

## Add a Logs action

1. Add an action in the workflow designer and select **Azure Monitor Logs**.
1. Choose an action and select or create its connection.
1. For workspace actions, provide the Log Analytics workspace ID (a GUID), not its Azure resource ID. For a resource-log query, provide the full Azure resource ID.
1. For query actions, provide a KQL query and, optionally, a `timespan` as an ISO 8601 duration such as `PT12H` or a start/end range such as `2024-01-01/2024-01-02`.
1. Test the action and inspect the returned tables before using their rows in later steps.

## Actions

| Action | What it does |
|---|---|
| **Run query on a Log Analytics workspace** | Run a KQL query against a workspace. |
| **Run query on resource logs** | Run a KQL query against a resource's logs using its Azure resource ID. |
| **Get workspace schema** | Discover workspace tables, columns, saved functions, and categories. |

Query results contain one or more tables. Each table's `rows` are arrays of values in the same order as its `columns` array, rather than objects keyed by column name. For example, inspect the workspace schema, run a query, and pass the returned rows to a later action.

## Triggers

This connector provides actions only. Start the workflow with a separate trigger, such as **Recurrence**, before querying logs.

## Related content

- [Connectors](/features/connectors/)
- [Connection setup and common issues](/features/connectors/#add-a-connector-operation)
- [Azure Advisor connector](/guides/azure-advisor-connector/)
- [Azure Resource Graph connector](/guides/azure-resource-graph-connector/)
