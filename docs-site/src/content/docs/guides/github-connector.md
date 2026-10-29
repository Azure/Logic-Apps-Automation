---
title: GitHub connector
description: Connect a workflow to GitHub repositories and events.
---

## Overview

The GitHub connector provides operations for repositories, issues, pull requests, commits, releases, and workflow runs. It also includes repository event triggers, such as issue, pull request, and push events. The operations and authentication methods offered can vary by environment.

## Add a GitHub operation

1. Open a workflow in the designer and add a trigger or action.
1. Find **GitHub** in the connector picker and choose the operation you need.
1. Select an existing connection or create one using an authentication method offered in your environment.
1. Select the repository owner and repository, then complete the operation's required fields.
1. Review the workflow and test it with a repository and data you're authorized to use.

For example, an issue event trigger can start a workflow when an issue is opened, edited, or closed. A pull request event trigger can respond to events such as opening or updating a pull request. Review the operation's event details and filters before depending on them.

## Authentication and permissions

Depending on the available connection configuration, GitHub authentication can use a personal access token, a GitHub App installation, or account sign-in. Choose the method supported by your environment and grant only the repository permissions needed by the selected operations.

Event triggers use repository webhooks. Confirm that the connection has the permissions needed to manage the webhook as well as access the repository. Treat tokens as secrets: use the connection setup rather than placing credentials in a workflow definition.

## Troubleshoot

- If the connector or an authentication method isn't offered, check availability with your environment administrator.
- If an owner, repository, or operation isn't available, check the connection's GitHub access and the repository's permissions.
- If a trigger doesn't receive events, review its repository, event settings, webhook permissions, and [run history](/features/runs-and-monitoring/).

## Related content

- [Connectors](/features/connectors/)
- [Azure DevOps connectors](/guides/azure-devops-connectors/)
- [Visual designer](/features/visual-designer/)
