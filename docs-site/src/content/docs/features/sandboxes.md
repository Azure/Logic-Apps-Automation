---
title: Sandboxes
description: Learn about isolated virtual machine environments where agents can run code, optionally work with repositories, and invoke skills.
sidebar:
  order: 10
  badge:
    text: preview
    variant: tip
---

:::note
This capability is in preview and subject to the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/). If your project enables this capability, the user experience appears in the [portal](https://auto.azure.com).
:::

In Azure Logic Apps Automation, a *sandbox* is an isolated compute environment where [agents](/features/agents/) can run code in workflows. This environment is a micro virtual machine image, powered by Azure Developer Compute, where your agent can perform the following tasks:

- Run shell commands and scripts, or build tools.
- Browse real file systems.
- Operate on cloned source control repositories.
- Invoke skills bundled with repositories.

You can create your own sandboxes inside your project where workflows across apps can target the same sandbox. You set up each sandbox configuration only once with its authentication, cloned repos, and skills. For more information, see [Create sandboxes](/guides/create-sandboxes/).

## Sandbox types

You can run agents in the following kinds of sandboxes:

| Option | When to choose |
|---|---|
| [Just-in-time sandbox](/guides/create-sandboxes/#just-in-time-sandbox) | You want the quickest path with a clean image for experimentation, running general code, and without any custom repos. No image building needed, no repos to connect. This sandbox spins up on demand for your agent. |
| [Prebuilt sandbox](/guides/create-sandboxes/#prebuilt-sandbox) | Your agent needs to access code in cloned repositories, use custom skills, and work with developer tools. Build the image once and reuse. |

## Related content

- [Create sandboxes](/guides/create-sandboxes/)
- [Agents](/features/agents/)
- [Knowledge bases](/features/knowledge-bases/)
- [Runs and monitoring](/features/runs-and-monitoring/)
