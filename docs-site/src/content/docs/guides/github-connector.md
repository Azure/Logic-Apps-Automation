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
<span id="connect-with-github-oauth"></span>

## GitHub authentication and permissions

For shared OAuth connection setup and management, see
[Create an OAuth service-provider connection](/features/connectors/#create-an-oauth-service-provider-connection).

Public GitHub repositories might be accessible without installing the GitHub
App, depending on the operation and required permissions. For private
repositories or operations that require installation-granted access, install or
configure the
[Logic Apps Automation GitHub App](https://github.com/apps/logic-apps-automation/installations/new)
for the GitHub accounts and repositories that the connection should access.
Choose only the repositories the workflow needs. An organization administrator
might need to approve the installation.

The GitHub App installation grants repository access to Logic Apps Automation.
The OAuth sign-in authorizes your connection. These are separate steps, and
completing one doesn't complete the other.

For GitHub, complete these steps before continuing with the shared OAuth setup:

1. If the operation requires GitHub App installation, select **Install or
   configure GitHub App**. Choose the GitHub account and repositories that this
   connection should access, then return to the connection form.
1. Select **Continue with GitHub OAuth**, then complete GitHub sign-in and
   consent.

<span id="troubleshoot"></span>

### Troubleshoot OAuth

- If sign-in succeeds but an operation is denied, confirm that the GitHub
  account can access the repository and has the permissions required by the
  operation.
- If a trigger can't subscribe, confirm that the account can create and manage
  repository webhooks.
- If an expected repository isn't available, configure the GitHub App
  installation for the account that owns the repository and grant access to
  that repository.

For general connection setup and troubleshooting, see
[shared connector guidance](/features/connectors/#add-a-connector-operation).

## Related content

- [Connectors](/features/connectors/)
- [Azure DevOps connectors](/guides/azure-devops-connectors/)
- [Managed Agent](/guides/managed-agent/)
- [Visual designer](/features/visual-designer/)
