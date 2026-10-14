---
title: Use Managed Agent output files
description: Configure, use, and review files created by a Managed Agent.
sidebar:
  order: 4
  badge:
    text: preview
    variant: tip
---

:::note
This capability is in preview and subject to the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/). If your environment enables this capability, the user experience appears in the [portal](https://auto.azure.com).
:::

A Managed Agent can create files in its [sandbox](/features/sandboxes/) and return them to later workflow actions. For example, an agent can create a report, updated source file, archive, image, or test result.

You can use output files in two ways:

| Option | When to use |
|---|---|
| Named output file | You know the expected file path and want a friendly token in **Dynamic content**. |
| File Outputs collection | The number or paths of the files can vary, or you want the complete set of files created by the agent. |

Named output files don't limit what the agent can return. The **File Outputs** collection still includes additional files that aren't mapped.

## Configure named output files

Add a named output for each file that later workflow actions need to use directly.

1. In the [Azure Logic Apps Automation portal](https://auto.azure.com), open your environment, app, and workflow.

1. On the workflow designer, select the Managed Agent action.

1. Select the **Parameters** tab.

1. Under **Output Files**, select **Add item**.

1. Provide the following information:

   | Property | Description | Example |
   |---|---|---|
   | **Output Name** | A friendly name that appears in **Dynamic content**. | `Summary report` |
   | **Relative path** | The exact path where the agent must create the file, relative to the sandbox workspace. | `outputs/reports/summary.pdf` |

1. Add more output files as needed, and then close the action information window.

The platform tells the agent to create each declared file at its exact relative path and to create any required parent directories.

### Relative path rules

Use a file path, not a directory path. Follow these rules:

- Use a workspace-relative path, such as `outputs/report.html`.
- You can use nested directories.
- Don't start the path with `/` or a drive letter.
- Don't use empty path segments, `.` segments, or `..` segments.
- Don't declare the same path more than once.
- Don't use `ottofiles` as the first path segment. This name is reserved for internal use.

## Use a named output in a later action

After you configure an output file, its friendly name appears under the Managed Agent's **Output files** group in **Dynamic content**.

Select the named file token to insert it into a later action. The token uses the following expression:

```text
@fileOutputs('<managed-agent-name>', '<relative-path>')
```

For example:

```text
@fileOutputs('Generate_Report', 'outputs/reports/summary.pdf')
```

The path must match the configured relative path. If the agent doesn't create the file, an action that evaluates this expression fails instead of returning an empty file.

## Use all output files

Use the Managed Agent's **File Outputs** token when the file names can vary or when a later action needs the complete collection.

You can also enter the expression directly:

```text
@outputs('<managed-agent-name>')?['fileOutputs']
```

Each file in the collection includes its relative path, content, and size. Text files return text content. Binary files return encoded content with its content type.

If you don't configure any named output files, the Managed Agent can still return files through this collection.

## Handle additional files

An agent can create files that aren't listed under **Output Files**. These files are included in the generic **File Outputs** collection, but they don't receive individual named tokens.

This behavior is useful when:

- The agent decides how many files to create.
- File names depend on the input.
- You map the main files but also want logs, supporting files, or other results.

In the agent instructions, clearly describe which files are final results. The platform manages the internal output location, so don't tell the agent to use the reserved `ottofiles` path.

## Open or download files from run history

After the workflow runs:

1. Open the workflow's **Monitoring** view.

1. Select the run.

1. In the **Execution log**, select the Managed Agent action.

1. Open the files view, and then expand **Output Files**.

1. Select a file name or **Open** to preview a supported file type. Select **Download** to save the file.

Text, image, and PDF files can open in the portal. For other file types, download the file to open it.

## Troubleshoot output files

| Problem | Try |
|---|---|
| A named output is missing | Confirm that the agent created the file at the exact configured relative path, including directories and the file extension. |
| The `fileOutputs()` expression fails | Confirm the Managed Agent action name and relative path. Also confirm that the file exists in the selected run. |
| A file appears in **File Outputs** but has no named token | Add the file under **Output Files** when its path is predictable. Additional files only appear in the generic collection. |
| No files are returned | Make the agent instructions explicit about the final files to create. Don't ask the agent to leave final results only inside a cloned repository or temporary directory. |
| A relative path is rejected | Remove rooted paths, drive letters, empty segments, `.` or `..` segments, and the reserved first segment `ottofiles`. |
| A file can't be previewed | Download the file. The portal preview supports text, images, and PDFs. |

## Related content

- [Agents](/features/agents/)
- [Sandboxes](/features/sandboxes/)
- [Create sandboxes](/guides/create-sandboxes/)
- [Runs and monitoring](/features/runs-and-monitoring/)
