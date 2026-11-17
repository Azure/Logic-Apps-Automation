---
title: GitHub connector
description: Connect a workflow to GitHub repositories and events.
---

## Overview

The built-in GitHub connector provides actions for repositories, issues, pull requests, commits, files, and workflow runs. It also includes repository event triggers. Connector availability can vary by environment.

## Add a GitHub operation

1. Open a workflow in the designer and add a trigger or action.
1. Find **GitHub** in the connector picker and choose the operation you need.
1. Select or create a connection.
1. Select the repository owner and repository, then complete the operation's required fields.
1. Review the workflow and test it with a repository and data you're authorized to use.

## Actions

| Area | Supported actions |
|---|---|
| Repositories and commits | Get a repository; list branches, tags, collaborators, and commits; get a commit; list check runs for a Git reference; get combined commit status; and create a commit status. |
| Files and Git objects | Get repository content; create or update file contents; delete a file; create and get blobs, commit objects, and trees; and get, create, update, or delete Git references. |
| [Issues](#issues) | List, create, get, and update issues; list and create comments; list assignees and repository labels; and add or remove labels. |
| Pull requests | List, create, get, update, and merge pull requests; list changed files; request reviewers; create a review comment; create and submit reviews; and update a pull request branch. |
| Workflow runs and releases | Get a workflow run, list runs for a workflow, and create a release. |

List actions return a page of results. Where the action exposes `page` and `per_page`, increase `page` to retrieve subsequent pages and use `per_page` to set the page size. `page` defaults to 1; `per_page` defaults to 30 or 100 depending on the action. Available parameters vary by action.

### Issues

| Action | What it does |
|---|---|
| **List repository issues** | Retrieve issues for a repository. GitHub's issues API can also return pull requests. |
| **Create an issue** | Open an issue in a repository. |
| **Get issue** | Retrieve an issue by number. |
| **Update an issue** | Change an existing issue, including its open or closed state. |
| **List issue comments** | Retrieve comments on an issue or pull request. |
| **Create an issue comment** | Add a comment to an issue or pull request. |
| **List assignees** | List users who can be assigned to issues in a repository. |
| **List labels for a repository** | Retrieve the repository's available labels. |
| **Add labels to an issue** | Apply labels to an issue. |
| **Remove a label from an issue** | Remove a specific label from an issue. |

For example, start with an issue event trigger and check that its `action` is `opened`. Then use **Get issue** to inspect the issue and **Add labels to an issue** or **Create an issue comment** to record the result. Checking the action prevents a label added by the workflow from being processed as another opened issue.

## Triggers

| Trigger | Events |
|---|---|
| **When an issue event occurs** | Issue events, such as an issue being opened, edited, closed, reopened, or labeled. |
| **When an issue comment event occurs** | Issue comment events, such as a comment being created, edited, or deleted on an issue or pull request. |
| **When a pull request event occurs** | Pull request events, such as a pull request being opened, closed, reopened, synchronized, or labeled. |
| **When code is pushed** | Commits are pushed to a branch or tag. |
| **When a check suite is requested, rerequested, or completed** | Check suite events, such as a suite being requested, rerequested, or completed. |
| **When a deployment status changes** | A deployment's status changes. |
| **When a label event occurs** | Label events, such as a repository label being created, edited, or deleted. |
| **When a milestone event occurs** | Milestone events, such as a milestone being created, edited, closed, opened, or deleted. |
| **When a repository star is added or removed** | Star events, such as a repository gaining or losing a star. |
| **When the repository is forked** | A fork is created. |
| **When a discussion event occurs** | A discussion is created, edited, answered, or otherwise changed. |
| **When a commit comment is created** | Commit comment events, such as a comment being created on a commit. |

These triggers subscribe to the GitHub event type, not a subset of its actions. Where the payload includes `action`, check it in a condition before processing the event. In particular, issue and pull request events include actions beyond the examples above, and a workflow's own changes can trigger another run.

The deployment status trigger responds to status changes rather than a specific status. Use the returned status in a later condition to branch on a particular outcome.

## GitHub Enterprise variant

An environment-specific GitHub Enterprise variant uses the same actions and triggers against its configured host. It requires explicit enablement and isn't registered by default. Its presence doesn't imply support for arbitrary GitHub Enterprise Server URLs; use only the variant and host offered by your environment.

<span id="authentication-and-permissions"></span>

## Connect with GitHub OAuth

When OAuth is available for the GitHub connector, you can authorize a connection
with your GitHub account without storing an OAuth token in the workflow
definition.

This connection authorizes GitHub connector actions and triggers. It is separate
from GitHub OAuth for GitHub Copilot model calls and from repository OAuth used
by a coding-agent sandbox.

### Create a connection

1. Add a GitHub action or trigger to a workflow.
1. In **Connection**, select **Create new** and enter a connection name.
1. If more than one authentication type is available, select the OAuth option.
1. Select **Sign in**, then complete GitHub sign-in and consent.
1. Select the new connection and save the workflow.

You can also create the connection from the app's **Connections** page. Select
**Add connection**, choose the GitHub connector, and complete the same sign-in
flow.

If OAuth isn't offered, it isn't enabled for the GitHub connector in your
environment.

### Manage the connection

On the app's **Connections** page, find the connection under **Service provider
connections**.

- **Connected** means the GitHub authorization is ready to use.
- **Not connected** means the authorization is missing or no longer valid.
- **Unknown** means the connection state couldn't be determined.

To restore authorization, edit the connection and select **Sign in** again. To
change the GitHub account, delete the connection and create it again with the
intended account. Deleting the connection also removes its OAuth authorization,
so reconnect any workflow actions or triggers that used it.

The app stores a reference to the OAuth connection, not the OAuth token or
authorization code, in its workflow connection configuration.

<span id="troubleshoot"></span>

### Troubleshoot OAuth

- If sign-in succeeds but an operation is denied, confirm that the GitHub
  account can access the repository and has the permissions required by the
  operation.
- If a trigger can't subscribe, confirm that the account can create and manage
  repository webhooks.
- If the connection remains **Not connected**, edit it and sign in again.

For general connection setup and troubleshooting, see
[shared connector guidance](/features/connectors/#add-a-connector-operation).

## Related content

- [Connectors](/features/connectors/)
- [Azure DevOps connectors](/guides/azure-devops-connectors/)
- [Visual designer](/features/visual-designer/)
