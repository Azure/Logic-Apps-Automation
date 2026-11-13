---
title: Azure Resource Graph connector
description: Query Azure resources and manage shared Resource Graph queries.
---

## Overview

The built-in Azure Resource Graph connector queries resource inventory and supported resource-change data across subscriptions or management groups. It also manages saved shared queries. Connector availability can vary by environment and region.

## Add a Resource Graph action

1. Add an action in the workflow designer and select **Azure Resource Graph**.
1. Choose an action and select or create its connection.
1. For a resource query, provide the query text and subscription or management group scope. For shared query actions, select the subscription and any required resource group and query name.
1. Test the action and inspect its output.

## Actions

| Action | What it does |
|---|---|
| **Run a resource query** | Run a Resource Graph query across the selected subscriptions or management groups. |
| **List shared queries in a subscription** | List saved queries in a subscription. |
| **List shared queries in a resource group** | List saved queries in a resource group. |
| **Get a shared query** | Retrieve a saved query's text and metadata. |
| **Create or replace a shared query** | Save a reusable query without running it. |
| **Update a shared query** | Change a saved query's text, description, or tags without running it. |
| **Delete a shared query** | Delete a saved query, not the resources it returns. |

For example, retrieve a saved shared query, pass its query text to **Run a resource query** with the execution scope you choose, and use the results in a later workflow action.

## Triggers

This connector provides actions only. Start the workflow with a separate trigger, such as **Recurrence**, before querying resources.

## Related content

- [Connectors](/features/connectors/)
- [Connection setup and common issues](/features/connectors/#add-a-connector-operation)
- [Azure Advisor connector](/guides/azure-advisor-connector/)
- [Azure Monitor Logs connector](/guides/azure-monitor-logs-connector/)
