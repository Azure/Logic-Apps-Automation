---
title: Built-in service provider catalog
description: Compare built-in service provider connectors and their workflow operations.
---

## Overview

Built-in service providers connect workflows to services and systems. The tables summarize their actions and triggers; availability can vary by environment, region, and workflow type. Check the connector picker for the operations available to your app.

The [Logic Apps Standard built-in connector reference](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/) provides additional background. It describes Logic Apps Standard and doesn't establish availability or operation parity in an Automation environment. The linked connector names below open those Standard references, not Automation-specific setup instructions. A dash in the **Triggers** column means that no trigger is listed for that connector.

## Choose an operation

1. Find the service below, then search for its connector in the workflow designer.
1. Choose an available trigger or action and complete its required inputs.
1. Follow the [shared connection and permission guidance](/features/connectors/#add-a-connector-operation), then test the workflow with resources you're authorized to use.

## Storage and databases

| Connector | Actions | Triggers |
|---|---|---|
| [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/azureblob/) | Read, upload, copy, delete, and list blobs; list containers and blob directories; check whether a blob exists; get metadata, access policies, and SAS URIs; set tiers; extract archives. | A blob is added or updated. |
| [Azure File Storage](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/azurefile/) | Create, read, update, copy, delete, and list files; get metadata; extract archives. | A file is added; a file is added or updated. |
| [Azure Queue Storage](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/azurequeues/) | Add, get, and delete messages; create and list queues. | Messages are available, optionally at a specified count. |
| [Azure Table Storage](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/azuretables/) | Create, list, and delete tables; create or update, delete, get, and query entities. | — |
| [Azure Cosmos DB](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/azurecosmosdb/) | Create or update items, including in bulk; read, query, patch, and delete items. | An item is created or modified. |
| [SQL Server](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/sql/) | Execute queries and stored procedures; list tables; insert, get, update, and delete rows. | A row is inserted, updated, modified, or deleted. |

## Messaging and events

| Connector | Actions | Triggers |
|---|---|---|
| [Azure Service Bus](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/servicebus/) | Send and receive messages; settle or defer messages; renew message locks; manage sessions; replicate messages; create or delete topic subscriptions. | Messages are available in a queue or topic subscription, including peek-lock, replication, and session triggers. |
| [Azure Event Hubs](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/eventhub/) | Send one or multiple events and replicate events. | Events are available, including for replication. |
| [Azure Event Grid Publisher](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/eventgridpublisher/) | Publish events. | — |
| [Confluent Kafka](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/confluentkafka/) | Send messages to a Kafka topic. | Messages are received from Kafka. |
| [RabbitMQ](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/rabbitmq/) | Send and complete messages; create a queue. | Messages are available in a queue, including peek-lock. |
| [SMTP](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/smtp/) | Send email. | — |

## Files and automation

| Connector | Actions | Triggers |
|---|---|---|
| [File System](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/filesystem/) | Create, read, update, append, copy, rename, delete, and list files; get metadata; extract archives. | A file is added; a file is added or updated. |
| [FTP](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/ftp/) | Create, read, update, delete, and list files; get metadata; extract archives. | A file is added or updated. |
| [SFTP](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/sftp/) | Upload, read, copy, rename, delete, and list files; manage folders; get metadata; extract archives. | One or more files are added or updated. |
| [Azure Automation](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/azureautomation/) | Create a runbook job, get its status, and get its output. | — |

## AI services

| Connector | Actions | Triggers |
|---|---|---|
| [Azure AI Search](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/azureaisearch/) | Index, merge, and delete documents; search vectors directly or with natural language; get agentic retrieval output. | — |
| [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/documentintelligence/) | Analyze a document. | — |
| [Azure OpenAI](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/openai/) | Generate embeddings, chat completions, and completions, including batch and prompt-template operations. | — |
| [Code Interpreter (Azure Container Apps session)](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/acasession/) | Execute Python code in an Azure Container Apps session; upload, download, and delete files. | — |

## Security

| Connector | Actions | Triggers |
|---|---|---|
| [Azure Key Vault](https://learn.microsoft.com/en-us/azure/logic-apps/connectors/built-in/reference/keyvault/) | Get secret values and metadata; list secret metadata; get and list key metadata; encrypt or decrypt data with a key or key version. | — |

## Other service providers

For development and Azure resource management integrations, see [GitHub](/guides/github-connector/), [Azure DevOps](/guides/azure-devops-connectors/), [Azure Advisor](/guides/azure-advisor-connector/), [Azure Resource Graph](/guides/azure-resource-graph-connector/), and [Azure Monitor Logs](/guides/azure-monitor-logs-connector/).

## Related content

- [Connectors](/features/connectors/)
- [Visual designer](/features/visual-designer/)
- [Workflow concepts and expressions](/features/workflows/)
