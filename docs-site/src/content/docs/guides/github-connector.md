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

For example, start with an issue event trigger, use **Get issue** to inspect the issue, then use **Add labels to an issue** or **Create an issue comment** to record the result.

## Triggers

| Trigger | Events |
|---|---|
| **When an issue event occurs** | An issue is opened, edited, or closed. |
| **When an issue comment event occurs** | A comment is created, edited, or deleted on an issue or pull request. |
| **When a pull request event occurs** | A pull request is opened, closed, reopened, or synchronized. |
| **When code is pushed** | Commits are pushed to a branch or tag. |
| **When a check suite is requested, rerequested, or completed** | A check suite event occurs. |
| **When a deployment status changes** | A deployment's status changes. |
| **When a label event occurs** | A repository label is created, edited, or deleted. |
| **When a milestone event occurs** | A milestone is created, edited, closed, opened, or deleted. |
| **When a repository star is added or removed** | A repository gains or loses a star. |
| **When the repository is forked** | A fork is created. |
| **When a discussion event occurs** | A discussion is created, edited, answered, or otherwise changed. |
| **When a commit comment is created** | A comment is created on a commit. |

The deployment status trigger responds to status changes rather than a specific status. Use the returned status in a later condition to branch on a particular outcome.

## GitHub Enterprise variant

An environment-specific GitHub Enterprise variant uses the same actions and triggers against its configured host. It requires explicit enablement and isn't registered by default. Its presence doesn't imply support for arbitrary GitHub Enterprise Server URLs; use only the variant and host offered by your environment.

<span id="authentication-and-permissions"></span>
<span id="troubleshoot"></span>

For connection setup, permissions, and common issues, see [shared connector guidance](/features/connectors/#add-a-connector-operation).

## Related content

- [Connectors](/features/connectors/)
- [Azure DevOps connectors](/guides/azure-devops-connectors/)
- [Visual designer](/features/visual-designer/)
