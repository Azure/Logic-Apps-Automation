---
title: Azure DevOps connectors
description: Connect workflows to Azure DevOps Boards, Repos, Pipelines, and Build.
---

## Overview

The built-in Azure DevOps connectors provide actions and event triggers for Boards, Repos, and Pipelines. The Build connector is not enabled by default and requires explicit configuration. Connector and operation availability can vary by environment and region.

## Add an Azure DevOps operation

1. Open a workflow in the designer and add a trigger or action.
1. Find the Azure DevOps connector for **Boards**, **Repos**, **Pipelines**, or **Build**, and select an operation.
1. Select or create a connection.
1. Provide the organization and any required project, repository, work item, or pipeline information.
1. Review the selected operation and test with resources and data you're authorized to use.

## Boards

### Actions

| Area | Supported actions |
|---|---|
| Work items | Create, get, and update a work item; list work item types and type states. |
| Queries | List and get saved queries; run a WIQL query or a saved WIQL query. |
| Boards and iterations | List boards, board columns, team iterations, backlog work items, and iteration work items. |
| Classification and teams | List classification nodes, get a classification node, and list team members. |

### Triggers

Start a workflow when a work item is **created**, **updated**, **deleted**, **restored**, or **commented on**.

## Repos

### Actions

| Area | Supported actions |
|---|---|
| Commits and items | Get push commits, changes, and commit diffs; create and list commit statuses; and list repository item metadata. |
| Pull requests | Create, get, and update a pull request; get iteration changes; share a pull request; and list linked work items. |
| Labels and reviewers | Create, list, and delete pull request labels; add reviewers; vote on or add a reviewer; and remove a reviewer. |
| Pull request statuses | Create and delete a pull request status. |
| Discussion | Create, list, get, and update threads; create, list, update, and delete thread comments; and like, unlike, or list likes on a comment. |
| Merges | Create and get a merge operation. |

**List repository items** returns metadata, not file contents.

### Triggers

Start a workflow when **code is pushed**, a pull request is **created** or **updated**, a pull request **merge is attempted**, or a pull request is **commented on**. The comment trigger responds to added or edited comments; a merge attempt doesn't necessarily mean a successful merge.

## Pipelines

### Actions

| Area | Supported actions |
|---|---|
| Pipelines | Create, list, get, and preview a pipeline. |
| Runs | Run a pipeline; list and get pipeline runs. |
| Artifacts and logs | Get a pipeline artifact; list pipeline logs; and get a pipeline log. |

### Triggers

| Area | Events |
|---|---|
| Runs | A run **starts**, **completes**, **succeeds**, or **fails**. Completion includes canceled runs. |
| Stages | A stage **succeeds**, **fails**, or is **rejected**. |
| Jobs | A job **fails**. |
| Approvals | A stage approval is **pending** or **completed**. |

## Build

Build requires explicit enablement by your environment administrator; it isn't registered by default.

### Actions

| Area | Supported actions |
|---|---|
| Build lifecycle | List, queue, get, update, bulk-update, and delete builds; get the latest build; and update a build stage. |
| Build details | List build changes, changes between builds, work item references, work item references from commits, and work items between builds; get build properties. |
| Artifacts and timelines | Create and list build artifacts; list attachments; get a build timeline, a stage timeline, and the latest stage timeline. |
| Build tags | Add one or more tags, list tags, update tags, and delete a tag. |
| Definitions | Create, list, get, update, delete, and restore build definitions; list revisions and metrics; get definition properties and YAML. |
| Definition resources and tags | Authorize and list definition resources; add one or more definition tags, list tags, update tags, and delete a tag. |
| Definition templates and folders | List, get, save, and delete definition templates; create, list, update, and delete build folders. |
| Settings and retention | Get and update general build settings, build settings, and project retention settings; get retention history. |
| Retention leases | Add, get, update, and delete leases; list leases for a build or by minimal retention lease. |
| Project resources | List build controllers and get a controller; get resource usage; authorize and list project resources; list project metrics, build options, and project tags; delete a project tag. |
| Source providers | List providers, branches, repositories, path contents, and webhooks; get file contents and a pull request; restore webhooks. |

### Triggers

**When a build completes** starts a workflow after a build finishes.

<span id="authentication-and-permissions"></span>
<span id="troubleshoot"></span>

For connection setup, permissions, and common issues, see [shared connector guidance](/features/connectors/#add-a-connector-operation).

## Related content

- [Connectors](/features/connectors/)
- [GitHub connector](/guides/github-connector/)
- [Visual designer](/features/visual-designer/)
