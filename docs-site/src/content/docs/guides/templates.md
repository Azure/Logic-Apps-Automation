---
title: Workflow templates
description: Create workflows from templates and prepare a template for sharing.
---

## Overview

A workflow template provides a starting definition that you can review and adapt to your own environment. The template gallery, import, and generation options can vary by environment and your access.

## Create a workflow from a template

1. Open your app's workflow list. Select **Create workflow**, then **Build from templates**.
1. Choose a template and review its details and required connections.
1. Enter a workflow name and select **Use template**.
1. In the designer, review the trigger and actions. Configure the connections and parameters for your environment before testing or publishing.

If **Build from templates** isn't available, check your access and the options enabled in your environment.

## Generate and download a template

Where template generation is available, a succeeded workflow run can provide the starting point for a reusable template:

The following screenshots are synthetic examples and might differ from your portal. The metadata and run are fictional, and no template was downloaded.

1. Open the successful run in [run history](/features/runs-and-monitoring/) and select **Generate template**.
1. Enter the template metadata, including a name, description, and categories.

   ![Template description form with fictional metadata.](https://github.com/user-attachments/assets/3fe6de60-e82a-48c7-8af0-423db6d46ca9)

1. Review the generated JSON and remove anything that shouldn't be shared. The review step applies some automatic sanitization, but you must still check names, email addresses, internal URLs, and sample data.
1. Select **Download template**. Download the file before closing the dialog; the portal doesn't keep a copy for you.

   ![Template download step showing a fictional file name.](https://github.com/user-attachments/assets/af8b832b-a527-4ff1-8acd-e50a854fb706)

Run data can contain sensitive information. Review the trigger sample and action mocks in the downloaded template before using or sharing it. Use fictional or otherwise approved test data.

## Import a template

To try a downloaded template, open the template gallery and select **Import from JSON**. Upload the template JSON file or paste its contents, select **Import**, and review the template before using it. Template files are commonly named `manifest.json`, but the import view validates the JSON content rather than requiring that filename. Correct any validation errors before importing again.

## Share a template

You can share the reviewed JSON file with others. To contribute a template for broader use, follow the contribution guidance in the [Azure Project Auto Templates repository](https://github.com/Azure/ProjectAutoTemplates). Publishing is a separate review process; downloading a template doesn't publish it.

## Related content

- [Create a workflow](/getting-started/quickstart/)
- [Runs and monitoring](/features/runs-and-monitoring/)
- [Visual designer](/features/visual-designer/)
