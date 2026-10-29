---
title: Azure DevOps connectors
description: Connect workflows to Azure DevOps Boards, Repos, and Pipelines.
---

## Overview

Azure DevOps connector operations cover Boards work items and queries, Repos repositories and pull requests, and Pipelines definitions and runs. Connector and operation availability can vary by environment.

## Add an Azure DevOps operation

1. Open a workflow in the designer and add a trigger or action.
1. Find the Azure DevOps connector for **Boards**, **Repos**, or **Pipelines**, and select an operation.
1. Select or create a connection using an authentication method offered in your environment.
1. Provide the organization and any required project, repository, work item, or pipeline information.
1. Review the selected operation and test with resources and data you're authorized to use.

For example, Boards operations can retrieve work items or run queries; Repos operations can work with repositories and pull requests; and Pipelines operations can inspect pipeline runs. Some triggers use Azure DevOps Service Hooks to respond to events. Check the trigger's filters and required permissions before using it.

## Authentication and permissions

Depending on the available connection configuration, authentication can use a personal access token, managed identity, or Microsoft Entra sign-in. Confirm which methods your environment offers and which Azure DevOps organization, project, and operation permissions are required.

If you use an event trigger, confirm that the connection can create the necessary Service Hooks subscription. Treat personal access tokens as secrets and follow your organization's token policy; don't place them in workflow definitions.

## Troubleshoot

- If a connector or authentication method isn't offered, check availability with your environment administrator.
- If a project or resource isn't listed, verify the connection's organization and access to that resource.
- If a trigger doesn't receive events, review its Service Hooks subscription, filters, permissions, and [run history](/features/runs-and-monitoring/).

## Related content

- [Connectors](/features/connectors/)
- [GitHub connector](/guides/github-connector/)
- [Visual designer](/features/visual-designer/)
