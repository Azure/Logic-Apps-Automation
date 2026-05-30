# Otto Docs Site — Infrastructure

The docs site is an Astro/Starlight build hosted on Azure Static Web Apps.
There are two SWAs — one for canary (auto-deploys on every push to `main`)
and one for prod (gated, manual). Both build from the same source with the
same `base: '/docs'` config; prod is fronted by Azure Front Door at
`https://auto.azure.com/docs/*`.

This is independent of the portal — a docs deploy can never block a runtime
release.

## Resource map

| Item | Canary | Prod |
| --- | --- | --- |
| Subscription | `Logic Apps Co-Pilot - Stage` (`49cff46c-0b82-4a1b-a533-ede69747bb0b`) | same |
| Tenant | `72f988bf-86f1-41af-91ab-2d7cd011db47` | same |
| Resource group | `otto-docs-canary-rg` (`westus2`) | `otto-docs-rg` (`westus2`) |
| Static Web App | `otto-docs-canary-swa` (Free SKU) | `otto-docs-swa` (Free SKU) |
| Default hostname | `https://lemon-mud-0e10bdd1e.7.azurestaticapps.net` | `https://kind-river-0d9e9ac1e.7.azurestaticapps.net` |
| Public URL | (same as default hostname) | `https://auto.azure.com/docs/` via AFD `otto-portal-afd` |
| Tags | `environment=canary` | `environment=prod` |

Both SWAs share `project=otto-docs`, `team=serverless-paas`,
`owner=krmitta@microsoft.com`.

The canary URL serves the same `/docs/`-prefixed build as prod; a `/ → /docs/`
redirect in `public/staticwebapp.config.json` keeps bare-root URLs working
on canary while AFD does the path mapping for prod.

## CI/CD

| Item | Value |
| --- | --- |
| Workflow | [`.github/workflows/docs-site-deploy.yml`](../.github/workflows/docs-site-deploy.yml) |
| Deploy action | [`Azure/static-web-apps-deploy@v1`](https://github.com/Azure/static-web-apps-deploy) |
| Build | Single Astro build per run; the same artifact deploys to canary and/or prod. |
| Auth | GitHub OIDC — no long-lived deployment tokens stored anywhere. |

| Trigger | Action |
| --- | --- |
| `push` to `main` on `docs-site/**` | Build → deploy canary |
| `pull_request` from in-repo branch | Build → deploy preview environment on canary SWA |
| `pull_request` from fork | Build only (no secret access) |
| `pull_request` closed | Tear down preview environment |
| `workflow_dispatch` target=`canary` | Build → deploy canary |
| `workflow_dispatch` target=`prod` | Build → deploy prod (gated by `docs-prod` environment reviewers) |

### Auth model (no stored credentials)

All Azure operations flow through the shared **Otto E2E GitHub Actions** SP
(reused across docs and portal canary workflows). There are no docs-specific
GitHub secrets beyond the org-wide Azure identity.

| Identity | Otto E2E GitHub Actions (`appId e8323013-aff3-46b9-8f7e-96ea41edf48a`) |
| --- | --- |
| Tenant | `72f988bf-86f1-41af-91ab-2d7cd011db47` |
| Required GitHub secrets | `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` |
| Federated credentials | `ref:refs/heads/main` (push), `pull_request` (PR previews), `environment:docs-prod` (gated prod deploys) |
| Role on canary RG | `Contributor` scoped only to `otto-docs-canary-rg` |
| Role on prod RG | `Contributor` scoped only to `otto-docs-rg` |

End-to-end auth flow per deploy:

1. GitHub Actions mints a short-lived OIDC token for the workflow run.
2. `azure/login@v2` exchanges that token (via the federated credential trust)
   for an Azure access token tied to the SP.
3. The workflow calls `az staticwebapp secrets list` against the target SWA
   (canary or prod RG depending on the job) to fetch the deployment token
   just-in-time. The token is masked in logs and never persisted.
4. `Azure/static-web-apps-deploy@v1` performs an atomic upload.

To rotate (or after a suspected leak):

```bash
# Canary
az staticwebapp secrets reset-api-key --name otto-docs-canary-swa --resource-group otto-docs-canary-rg

# Prod
az staticwebapp secrets reset-api-key --name otto-docs-swa --resource-group otto-docs-rg
```

No workflow or GH-secret change is needed after rotation — the workflow
fetches the new token on the next run.

### Preview environments for in-repo PRs

In-repo PRs each get a free preview environment hosted by the canary SWA.
Fork PRs build but don't deploy (GitHub does not pass secrets to fork
workflows, by design). Maintainers can manually deploy a fork PR's branch
with a `workflow_dispatch` run after review.

Closing or merging the PR automatically tears down the preview (the
`close_pr_preview` job).

## One-time setup (recorded for disaster recovery)

```bash
SUB=49cff46c-0b82-4a1b-a533-ede69747bb0b
az account set --subscription "$SUB"

# ---- Resource groups -----------------------------------------------------
az group create --name otto-docs-canary-rg --location westus2 \
  --tags environment=canary project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

az group create --name otto-docs-rg --location westus2 \
  --tags environment=prod project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

# ---- Static Web Apps (Free SKU — no SLA, plenty for docs) ---------------
az staticwebapp create --name otto-docs-canary-swa --resource-group otto-docs-canary-rg \
  --location westus2 --sku Free \
  --tags environment=canary project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

az staticwebapp create --name otto-docs-swa --resource-group otto-docs-rg \
  --location westus2 --sku Free \
  --tags environment=prod project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

# ---- SP identity (reuses the existing Otto E2E SP) -----------------------
SP_APP_ID=e8323013-aff3-46b9-8f7e-96ea41edf48a
SP_APP_OBJ=bb38355a-93e6-40d9-8b6a-47edbe32f017
SP_OBJ_ID=$(az ad sp show --id "$SP_APP_ID" --query id -o tsv)

# Contributor scoped to each docs RG (least privilege)
for RG in otto-docs-canary-rg otto-docs-rg; do
  az role assignment create \
    --assignee-object-id "$SP_OBJ_ID" \
    --assignee-principal-type ServicePrincipal \
    --role Contributor \
    --scope "/subscriptions/$SUB/resourceGroups/$RG"
done

# Federated credentials for this repo (Azure/Logic-Apps-Automation)
for cred in \
  '{"name":"laa-main","issuer":"https://token.actions.githubusercontent.com","subject":"repo:Azure/Logic-Apps-Automation:ref:refs/heads/main","description":"docs canary deploys on main push","audiences":["api://AzureADTokenExchange"]}' \
  '{"name":"laa-pull-request","issuer":"https://token.actions.githubusercontent.com","subject":"repo:Azure/Logic-Apps-Automation:pull_request","description":"docs PR preview deploys","audiences":["api://AzureADTokenExchange"]}' \
  '{"name":"laa-env-docs-prod","issuer":"https://token.actions.githubusercontent.com","subject":"repo:Azure/Logic-Apps-Automation:environment:docs-prod","description":"docs prod gated deploys","audiences":["api://AzureADTokenExchange"]}'
do
  az ad app federated-credential create --id "$SP_APP_OBJ" --parameters "$cred"
done
```

Repo-side one-time setup (GitHub UI — requires repo admin):

1. **Settings → Secrets and variables → Actions → New repository secret**, add
   - `AZURE_CLIENT_ID = e8323013-aff3-46b9-8f7e-96ea41edf48a`
   - `AZURE_TENANT_ID = 72f988bf-86f1-41af-91ab-2d7cd011db47`
   - `AZURE_SUBSCRIPTION_ID = 49cff46c-0b82-4a1b-a533-ede69747bb0b`
2. **Settings → Environments → New environment** named `docs-prod`,
   configure **Required reviewers** (recommended: 1+ team maintainer).
   Optionally restrict to `main`-only deploy branch.

## Front Door routing (prod only)

Prod is served at `https://auto.azure.com/docs/*` by the `otto-portal-afd`
profile (RG `otto-portal-rg`). The relevant pieces:

| AFD piece | Value |
| --- | --- |
| Profile | `otto-portal-afd` |
| Endpoint | `otto-portal` (default host `otto-portal-dxcfeqbkf6fuc4am.b02.azurefd.net`) |
| Custom domain | `auto-azure-com` (`auto.azure.com`, AFD-managed cert, TLS 1.2) |
| Origin group | `otto-docs-origins` (probe `HEAD /docs/`) |
| Origin | `otto-docs-swa-origin` → `kind-river-0d9e9ac1e.7.azurestaticapps.net` |
| Route | `docs-route` — `patternsToMatch: ['/docs', '/docs/*']`, HTTPS only |

The portal's `default-route` (matching `/*` → portal ACA origins) and the
`docs-route` coexist on the same endpoint; AFD chooses the more specific
pattern, so `/docs/foo` always goes to the SWA and `/anything-else` always
goes to the portal.

## Custom domain (legacy reference)

The canary SWA currently uses its auto-generated hostname only. To attach
a separate canary domain later:

```bash
az staticwebapp hostname set --name otto-docs-canary-swa \
  --resource-group otto-docs-canary-rg \
  --hostname docs-canary.auto.azure.com \
  --validation-method cname-delegation
```

## Operational notes

- **Cost**: Both SWAs are Free SKU (`$0`/month, 100 GB bandwidth, no SLA).
  Upgrade either to Standard (`$9`/month) for SLA, private endpoints, or
  custom auth.
- **Cache**: SWA serves cached static content from the edge; deploys roll
  in atomically — no manual purge needed. AFD also caches static responses
  per the route's compression / query-string-caching settings.
- **Logs**: Deployment history is visible in the Azure Portal under each
  SWA's *Overview → Browse* tab.
- **Alerts**: Not configured. We can add an Application Insights availability
  test (or simple AFD-side healthProbe) later if docs become production-critical.
