---
title: AI workflow assistant - Azure Logic Apps Automation 
description: Learn how the AI assistant automates workflow creation by using natural language. The assistant designs, builds, and iterates over workflows with you.
sidebar:
  order: 5
---

In Azure Logic Apps Automation, the AI assistant generates a workflow based on your description for the task you want to automate. Just describe the task behavior and results, and the assistant builds a workflow that you can edit with follow-up instructions. You can use the assistant as your primary workflow builder, which offers parity with the workflow designer. Both use the same workflow schema, connector catalog, and expressions language. For example, you can edit a generated workflow in the designer and vice versa.

## What the assistant does

- Generates a workflow from a plain language prompt.
- Selects the most appropriate trigger and actions for your described workload.
- Edits an existing workflow when you provide more instructions.

## How the assistant works

1. You provide your prompt through Copilot in the designer. Copilot describes the plan and reasoning for the workflow to build.
1. The assistant generates the workflow definition using the same JSON that the designer reads.
1. Review each component on the designer canvas. Edit the components that you need to configure or change.
1. Provide a follow-up prompt to refine your workflow. For example, `"Replace sequential execution with parallel branches"` or `"Add error handling to the HTTP action"`.

## Common FAQs

### Q: What are best practices to generate easy-to-validate workflows?

Make sure to describe your workflows with clarity and precision. Specify the trigger, actions, services, systems, and results you want. Ambiguous prompts produce vague workflows.

Here are some example prompts that show clarity and precision:

- `"When I get an email where the subject includes 'invoice', save the attachment to Blob Storage and post a message to Teams."`
- `"Every weekday at 9 AM, get yesterday's failed runs for this workflow and email me a summary."`
- `"When a new Service Bus message arrives, call this HTTP endpoint. If you get a 5xx message, retry three times with backoff."`

### Q: Does a generated workflow use the same schema as a workflow I build with the designer?

Yes, an assistant-generated workflow uses the same underlying JSON schema as if you built the same workflow with the designer. This schema includes trigger and action definitions, required expressions, and so on.

### Q: Does the assistant also configure the workflow?

No, the assistant only generates the workflow shape. You need to provide environment-specific details, for example: 

- Configure a connection for each connector-based action. You can create the connection at the app level or on each operation.
- Provide parameter values that the assistant leaves empty. Required parameters show red outlines or asterisks.
- Resolve any prompts that show **Finish configuring with Copilot** on operations.
- Validate workflow behavior as early as possible. To find missing configuration items before you publish the workflow, use the designer's **Test** capability.

## Related content

- [Quickstart](/getting-started/quickstart/)
- [Designer](/features/visual-designer/)
- [Connectors](/features/connectors/)
