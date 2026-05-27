# Otto Docs Site — Canary Infrastructure

The docs site is hosted on an Azure Static Web App in the **Otto canary
subscription**. SWA is the right fit because the docs site is pure static
output — atomic deploys, free preview environments per PR, no warmup, and
no traffic-shifting machinery to maintain.

This is **independent of the portal canary** (which uses ACA + Front Door).
The two pipelines never share resources, so a docs ship can never block
portal/runtime releases.

## Resource map

| Item | Value |
| --- | --- |
| Subscription | `Logic Apps Co-Pilot - Stage` (`49cff46c-0b82-4a1b-a533-ede69747bb0b`) |
| Tenant | `72f988bf-86f1-41af-91ab-2d7cd011db47` |
| Resource group | `otto-docs-canary-rg` (`westus2`) |
| Static Web App | `otto-docs-canary-swa` (Free SKU) |
| Default hostname | `https://lemon-mud-0e10bdd1e.7.azurestaticapps.net` |
| Tags | `environment=canary`, `project=otto-docs`, `team=serverless-paas`, `owner=krmitta@microsoft.com` |

## CI/CD

| Item | Value |
| --- | --- |
| Workflow | [`.github/workflows/docs-site-deploy.yml`](../.github/workflows/docs-site-deploy.yml) |
| Trigger | `push` to `main` on `docs-site/**`; `pull_request` for previews; `workflow_dispatch` for manual deploys |
| Deploy action | [`Azure/static-web-apps-deploy@v1`](https://github.com/Azure/static-web-apps-deploy) |
| Auth | GitHub OIDC — no long-lived deployment token stored anywhere |

### Auth model (no stored credentials)

The workflow uses the **same OIDC service principal as portal canary** so there are no docs-specific secrets to manage:

| Identity | Otto E2E GitHub Actions (`appId e8323013-aff3-46b9-8f7e-96ea41edf48a`) |
| --- | --- |
| Tenant | `72f988bf-86f1-41af-91ab-2d7cd011db47` |
| GH secrets reused | `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` (already provisioned for portal workflows) |
| Federated credentials | `ref:refs/heads/main` (push + workflow_dispatch), `pull_request` (PR previews — added by docs onboarding) |
| Role on docs RG | `Contributor` scoped only to `otto-docs-canary-rg` |

How a deploy authenticates end-to-end:

1. GitHub Actions mints a short-lived OIDC token for the workflow run.
2. `azure/login@v2` exchanges that token (via the federated credential trust) for an Azure access token tied to the **Otto E2E GitHub Actions** SP.
3. The workflow uses the access token to call `az staticwebapp secrets list`, which returns the SWA deployment token (just-in-time, never stored).
4. The deployment token is masked in logs and handed to `Azure/static-web-apps-deploy@v1`.
5. SWA performs an atomic deploy.

If the SWA deployment token leaks (or just for hygiene), rotate with:

```bash
az staticwebapp secrets reset-api-key \
  --name otto-docs-canary-swa \
  --resource-group otto-docs-canary-rg
```

No workflow or GH-secret change is needed after rotation — the workflow fetches the new token on the next run.

PRs each get a free preview environment hosted by SWA. Closing or merging the
PR automatically tears it down (the `close_pr_preview` job).

## One-time setup (already done)

The canary RG, SWA, federated credential, and RBAC were provisioned with these
commands. Recorded here for reproducibility / disaster recovery:

```bash
# Switch to the canary subscription
az account set --subscription 49cff46c-0b82-4a1b-a533-ede69747bb0b

# Resource group
az group create \
  --name otto-docs-canary-rg \
  --location westus2 \
  --tags environment=canary project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

# Static Web App (Free SKU — no SLA but plenty for docs)
az staticwebapp create \
  --name otto-docs-canary-swa \
  --resource-group otto-docs-canary-rg \
  --location westus2 \
  --sku Free \
  --tags environment=canary project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

# Reuse the existing "Otto E2E GitHub Actions" SP — it already backs
# AZURE_CLIENT_ID/AZURE_TENANT_ID/AZURE_SUBSCRIPTION_ID for the portal workflows.
SP_OBJ_ID=$(az ad sp show --id e8323013-aff3-46b9-8f7e-96ea41edf48a --query id -o tsv)
SP_APP_OBJ=bb38355a-93e6-40d9-8b6a-47edbe32f017  # application objectId

# Grant Contributor on the docs RG only (least privilege)
az role assignment create \
  --assignee-object-id "$SP_OBJ_ID" \
  --assignee-principal-type ServicePrincipal \
  --role Contributor \
  --scope /subscriptions/49cff46c-0b82-4a1b-a533-ede69747bb0b/resourceGroups/otto-docs-canary-rg

# Add the pull_request federated credential (existing creds covered main+canary)
az ad app federated-credential create --id "$SP_APP_OBJ" --parameters '{
  "name": "docs-pull-request",
  "issuer": "https://token.actions.githubusercontent.com",
  "subject": "repo:serverless-paas-balam/project-otto:pull_request",
  "description": "Docs site SWA PR preview deploys",
  "audiences": ["api://AzureADTokenExchange"]
}'
```

No new GH secret was added — the workflow uses the existing `AZURE_CLIENT_ID`,
`AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` secrets shared with the portal
workflows.

## Custom domain (future)

The SWA currently uses its auto-generated hostname. To attach `docs.otto.dev`
(or similar) later:

1. Add a `CNAME docs → lemon-mud-0e10bdd1e.7.azurestaticapps.net` DNS record.
2. `az staticwebapp hostname set --name otto-docs-canary-swa --resource-group otto-docs-canary-rg --hostname docs.otto.dev --validation-method cname-delegation`
3. Update `DOCS_SITE_URL` repo variable in GitHub to the new origin.

## Operational notes

- **Cost**: Free SKU = $0/month, 100 GB bandwidth, no SLA. Upgrade to
  Standard ($9/month) when we want SLA, custom auth, or private endpoint.
- **Cache**: SWA serves cached static content from the edge. The deploy
  step rolls in atomically — no manual cache purge needed.
- **Logs**: Kudu logs are visible in the Azure Portal under the SWA's
  *Overview → Browse* deployment history.
- **Alerts**: Not configured yet. We can add an App Insights availability
  test later if docs become production-critical.
