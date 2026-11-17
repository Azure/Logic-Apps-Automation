---
title: Managed Agent
description: Configure a managed agent for repository and file-oriented tasks.
---

## Overview

Choose **Managed agent** when your workflow task needs code, repository, or file-oriented work through a managed harness and sandbox-capable setup.

## Setup requirements

Before you run a Managed agent action:

- Have an app and workflow in the target Azure Logic Apps Automation
  environment.
- Have access to a Microsoft-managed coding model or the credentials for your
  own model connection.
- Configure sandbox and repository settings offered by your environment.
- Provide any required input files and skills configuration.

For current setup guidance, see [Sandbox setup overview](/guides/create-sandboxes/).

## Choose model access

1. Add an agent action and select **Managed agent**.
1. If **Choose an AI model** opens, choose one of these paths:
   - Select a Microsoft-managed model. You don't need to create a model
     connection.
   - Select **Use your own model connection**, then create or select a
     connection.
1. For your own model connection, select an available provider:
   - **Sign in with GitHub** uses GitHub OAuth and the signed-in account's
     GitHub Copilot access.
   - **API Key** uses an OpenAI-compatible chat completions endpoint and API
     key.

GitHub OAuth for model calls doesn't authorize repository cloning or GitHub
connector operations. Configure those connections separately. For more
information, see [Sandbox setup overview](/guides/create-sandboxes/) and
[GitHub connector](/guides/github-connector/#connect-with-github-oauth).

## Build path

Use this sequence:

1. Select the model or model connection.
1. Configure **System message** and **User message** for the exact task.
1. Review **Harness** settings, including execution environment, sandbox, and repository skills.
1. Add only the tools needed for the task.
1. Save and run, then inspect run details.

## Output and controls

Managed agent outputs can feed later deterministic workflow actions. Use run settings and run history to control and audit behavior before broad rollout.

## Troubleshoot problems

| Problem | Try |
|---|---|
| GitHub sign-in isn't offered | Confirm that you selected **Managed agent**, then select **Use your own model connection** in the model picker. |
| GitHub sign-in succeeds but model calls fail | Confirm that the signed-in GitHub account has GitHub Copilot access. Delete and recreate the model connection to use a different account. |
| A sandbox configuration isn't available | Confirm that the configuration has the **Ready** status. |
| A repository can't be cloned | Check the repository URL and branch, then review the repository authentication configured on the sandbox. |

## Related content

- [The options and how to choose](/guides/agent-options/)
- [Ways of orchestrating agents](/guides/orchestrate-agents/)
- [Sandbox setup overview](/guides/create-sandboxes/)
- [GitHub connector](/guides/github-connector/)
