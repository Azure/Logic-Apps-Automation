---
title: Azure Advisor connector
description: Review Azure Advisor recommendations and scores in workflows.
---

## Overview

The built-in Azure Advisor connector reads recommendations and scores for Azure subscriptions and resources. Connector availability can vary by environment and region.

## Add an Advisor action

1. Add an action in the workflow designer and select **Azure Advisor**.
1. Choose an action and select or create its connection.
1. Select the subscription. For **Get a recommendation**, provide the exact resource scope and recommendation instance ID.
1. Test the action and use its returned recommendation or score data in later steps.

## Actions

| Action | What it does |
|---|---|
| **List recommendations** | List cached recommendations for a subscription, with an optional filter. |
| **Get a recommendation** | Retrieve a cached recommendation for a specific subscription, resource group, or resource. |
| **List Advisor scores** | List subscription and category scores and available history. |
| **List snoozed or dismissed recommendation rules** | List recommendation rules that have been snoozed or dismissed. |

The list recommendations and list snoozed or dismissed rules actions return one page and, when more results exist, a next page URL. They don't automatically retrieve additional pages or expose a continuation input, so the results might not include every match.

For example, use **List recommendations** to review cost recommendations, then pass the returned details to a later workflow action.

## Triggers

This connector provides actions only. To check recommendations regularly, start the workflow with a **Recurrence** trigger.

## Related content

- [Connectors](/features/connectors/)
- [Connection setup and common issues](/features/connectors/#add-a-connector-operation)
- [Azure Resource Graph connector](/guides/azure-resource-graph-connector/)
- [Azure Monitor Logs connector](/guides/azure-monitor-logs-connector/)
