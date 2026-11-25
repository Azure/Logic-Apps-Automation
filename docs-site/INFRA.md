# Otto Docs Site — Infrastructure

The docs site is an Astro/Starlight build hosted on Azure Static Web Apps.
There are two SWAs — one for canary (auto-deploys on every push to `main` via
Azure DevOps) and one for prod (manual, approval-gated on `main`). Both build
from the same source with the same `base: '/docs'` config and are fronted by
Azure Front Door — direct hits on the `*.azurestaticapps.net` hostnames return
403 by design (see **Lockdown** below).

This is independent of the portal — a docs deploy can never block a runtime
release.

## Resource map

| Item | Canary | Prod |
| --- | --- | --- |
| Subscription | `Logic Apps Co-Pilot - Stage` (`49cff46c-0b82-4a1b-a533-ede69747bb0b`) | same |
| Tenant | `72f988bf-86f1-41af-91ab-2d7cd011db47` | same |
| Resource group | `otto-docs-canary-rg` (`westus2`) | `otto-docs-rg` (`westus2`) |
| Static Web App | `otto-docs-canary-swa` (**Standard** SKU) | `otto-docs-swa` (**Standard** SKU) |
| Default hostname | `https://lemon-mud-0e10bdd1e.7.azurestaticapps.net` (403 — locked down) | `https://kind-river-0d9e9ac1e.7.azurestaticapps.net` (403 — locked down) |
| Public URL | `https://otto-canary.azure.com/docs/` via AFD `otto-portal-canary-afd` | `https://auto.azure.com/docs/` via AFD `auto-portal-afd` |
| AFD `frontDoorId` | `2ca9cd4d-6df1-47b7-b8e2-24ba2bd17727` | `fd12a176-4667-4e79-8d3d-0bd88e863ff7` |
| Deploy UAMI | `otto-docs-canary-deploy-mi` (`otto-docs-canary-rg`) | `otto-docs-prod-deploy-mi` (`otto-docs-rg`) |
| ADO Service Connection | `otto-docs-canary-arm` | `otto-docs-prod-arm` |
| Tags | `environment=canary` | `environment=prod` |

Both SWAs share `project=otto-docs`, `team=serverless-paas`,
`owner=krmitta@microsoft.com`.

Standard SKU is required for `forwardingGateway` enforcement; Free SKU
silently ignores it. The two SKUs cost ~$9/SWA/month.

## CI/CD

| Item | Value |
| --- | --- |
| PR & main build validation | [`.github/workflows/docs-site-deploy.yml`](../.github/workflows/docs-site-deploy.yml) (GitHub Actions, credential-free) |
| Canary & Prod deployment | [`.azure-pipelines/docs-site-deploy.yml`](../.azure-pipelines/docs-site-deploy.yml) (Azure DevOps 1ES Official pipeline `Logic-Apps-Automation-Docs`, definition `490778` in `msazure/One`) |
| Deploy tool | `@azure/static-web-apps-cli@2` (`swa deploy`) |
| Build | Credential-free Astro build on 1ES Ubuntu with `CFSClean` network isolation, restoring packages through the `LogicApps` Azure Artifacts npm upstream (`.azure-pipelines/ado.npmrc`). Per-target AFD lockdown is injected before deploy by [`docs-site/scripts/apply-lockdown.mjs`](./scripts/apply-lockdown.mjs). |
| Auth | Azure DevOps Workload Identity Federation (WIF) backed by isolated single-SWA User-Assigned Managed Identities — no stored secrets or deployment tokens. |

| Trigger | Action |
| --- | --- |
| `pull_request` on `docs-site/**` | GitHub Actions: credential-free `npm run check`, `npm run build`, Python link checker tests & validation |
| `push` to `main` on `docs-site/**` or `.azure-pipelines/*` | Azure DevOps (`490778`): build, validate, apply canary lockdown, deploy to `otto-docs-canary-swa`, run AFD `200` + direct origin `403` smoke probes |
| Manual ADO run (`target=canary`) | Build and deploy canary (`dryRun=true` validates build & lockdown without Azure login or upload) |
| Manual ADO run (`target=prod`, `main` only) | Gated by ADO Branch Control (`refs/heads/main`, `refs/tags/release`), Manual Approval, and Exclusive Lock on `otto-docs-prod-arm` → build, apply prod lockdown, deploy to `otto-docs-swa`, run AFD `200` + direct origin `403` smoke probes |

### Auth model (isolated WIF, no stored credentials)

Canary and Production use separate User-Assigned Managed Identities (UAMIs)
and separate Azure DevOps Workload Identity Federation service connections in
`msazure/One`. Each UAMI has `Contributor` scoped strictly to its single Static
Web App resource (not the resource group or subscription), and each ADO service
connection is authorized strictly for pipeline `490778`.

| Setting | Canary | Prod |
| --- | --- | --- |
| UAMI | `otto-docs-canary-deploy-mi` (`clientId: defd84eb-b8ce-42f3-a48f-f2910c03f637`) | `otto-docs-prod-deploy-mi` (`clientId: bf93dbf3-f90f-40c0-be40-8a4617150e2e`) |
| RBAC scope | `Contributor` on `/subscriptions/49cff46c-0b82-4a1b-a533-ede69747bb0b/resourceGroups/otto-docs-canary-rg/providers/Microsoft.Web/staticSites/otto-docs-canary-swa` | `Contributor` on `/subscriptions/49cff46c-0b82-4a1b-a533-ede69747bb0b/resourceGroups/otto-docs-rg/providers/Microsoft.Web/staticSites/otto-docs-swa` |
| ADO Service Connection | `otto-docs-canary-arm` | `otto-docs-prod-arm` |
| Pipeline permissions | Pipeline `490778` only (`allPipelines: false`) | Pipeline `490778` only (`allPipelines: false`) |
| ADO Checks | Exclusive Lock (+ Branch Control `refs/heads/main,refs/tags/release`) | Exclusive Lock + Branch Control (`refs/heads/main,refs/tags/release`) + Manual Approval |

End-to-end auth flow per deploy:

1. The 1ES Build stage builds and validates `docs-site/dist` completely credential-free and publishes the `docs-dist` pipeline artifact.
2. The Deploy stage verifies the target branch guard, injects `forwardingGateway` via `docs-site/scripts/apply-lockdown.mjs`, and authenticates through `AzureCLI@2` using ADO WIF (`otto-docs-canary-arm` or `otto-docs-prod-arm`).
3. The Deploy step verifies the target SWA is on `Standard` SKU, fetches the deployment token just-in-time via `az staticwebapp secrets list`, masks it (`##vso[task.setsecret]`), and passes it via `SWA_CLI_DEPLOYMENT_TOKEN` to `npx @azure/static-web-apps-cli@2 deploy` with `--swa-config-location` pinned to the locked-down staging directory.
4. Post-deploy smoke probes assert HTTP `200` on the public AFD URL and HTTP `403` on the direct `*.azurestaticapps.net` origin.

To rotate (or after a suspected leak):

```bash
# Canary
az staticwebapp secrets reset-api-key --name otto-docs-canary-swa --resource-group otto-docs-canary-rg

# Prod
az staticwebapp secrets reset-api-key --name otto-docs-swa --resource-group otto-docs-rg
```

No pipeline or secret-store update is needed after rotation — the deploy stage
fetches the new token just-in-time on the next run.

## Front Door routing

Both environments are fronted by Azure Front Door:

| AFD piece | Canary | Prod |
| --- | --- | --- |
| Profile | `otto-portal-canary-afd` (RG `otto-portal-canary-rg`, sub `49cff46c-0b82-4a1b-a533-ede69747bb0b`) | `auto-portal-afd` (RG `auto-portal-afd-rg`, sub `4bb604d0-3eaa-4194-ab38-26cdc69a7f44`) |
| Custom domain | `otto-canary.azure.com` (AFD-managed cert) | `auto.azure.com` (AFD-managed cert) |
| AFD `frontDoorId` | `2ca9cd4d-6df1-47b7-b8e2-24ba2bd17727` | `fd12a176-4667-4e79-8d3d-0bd88e863ff7` |
| Docs origin | `lemon-mud-0e10bdd1e.7.azurestaticapps.net` | `kind-river-0d9e9ac1e.7.azurestaticapps.net` |
| Docs route | `patternsToMatch: ['/docs', '/docs/*']`, HTTPS only, `linkToDefaultDomain: Disabled` | same |
| Default route | `/*` → portal ACA origins | same |

The portal's `default-route` (matching `/*` → portal ACA origins) and the
`docs-route` coexist on the same endpoint; AFD picks the more specific
pattern, so `/docs/foo` always goes to the SWA and `/anything-else` always
goes to the portal. `linkToDefaultDomain` is **Disabled** on both routes,
so the AFD-default `*.azurefd.net` hostname is intentionally non-routable —
all traffic must come through the registered custom domain.

> **Route propagation.** Newly-created AFD routes show
> `deploymentStatus: NotStarted` and can take **up to ~30 minutes** to take
> effect even though `provisioningState: Succeeded`. Don't assume a freshly
> added docs route is broken until you've waited at least 15 minutes.

## Lockdown — direct SWA hostnames return 403

We never want users to discover and bookmark the raw
`*.azurestaticapps.net` URL — that bypasses our AFD WAF, rule sets, custom
domain, and CDN. Both SWAs are configured to reject any request that doesn't
carry the expected AFD identifier headers.

This works through the `forwardingGateway` block injected into
`dist/staticwebapp.config.json` by
[`docs-site/scripts/apply-lockdown.mjs`](./scripts/apply-lockdown.mjs)
during deploy:

```json
{
  "forwardingGateway": {
    "requiredHeaders": { "X-Azure-FDID": "<profile.frontDoorId>" },
    "allowedForwardedHosts": ["<custom-domain>"]
  }
}
```

AFD attaches `X-Azure-FDID` (its own profile ID) and `X-Forwarded-Host`
(the request's original host) to every backend request. SWA inspects both
and returns `403 Forbidden` if either is missing or doesn't match — so a
direct `curl https://kind-river-…azurestaticapps.net/docs/` returns 403,
but a request via `https://auto.azure.com/docs/` passes through.

| Caveat | Detail |
| --- | --- |
| **SKU** | `forwardingGateway` is enforced only on **Standard** SKU. Free SKU silently ignores it. The deploy pipeline fails fast if the target SWA is not on `Standard` SKU. |
| **Single FDID per env** | Each SWA pins to exactly one AFD profile via `requiredHeaders`; we can't share a single SWA across canary and prod AFDs. Per-env injection is therefore required and lives in the deploy pipeline. |
| **`X-Azure-FDID` is per-profile** | Stamped on every AFD response and discoverable in the Azure Portal / via `az afd profile show -o json --query frontDoorId`. Update [`apply-lockdown.mjs`](./scripts/apply-lockdown.mjs) if the AFD profile is ever recreated or cut over. |

Verification (post-deploy):

```bash
# Both direct hostnames must 403
curl -sI https://kind-river-0d9e9ac1e.7.azurestaticapps.net/docs/ -o /dev/null -w '%{http_code}\n'  # → 403
curl -sI https://lemon-mud-0e10bdd1e.7.azurestaticapps.net/docs/ -o /dev/null -w '%{http_code}\n'   # → 403

# Both AFD-fronted hostnames must 200
curl -sI https://auto.azure.com/docs/ -o /dev/null -w '%{http_code}\n'        # → 200
curl -sI https://otto-canary.azure.com/docs/ -o /dev/null -w '%{http_code}\n' # → 200
```

## One-time setup (recorded for disaster recovery)

```bash
SUB=49cff46c-0b82-4a1b-a533-ede69747bb0b
az account set --subscription "$SUB"

# ---- Resource groups -----------------------------------------------------
az group create --name otto-docs-canary-rg --location westus2 \
  --tags environment=canary project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

az group create --name otto-docs-rg --location westus2 \
  --tags environment=prod project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

# ---- Static Web Apps (Standard SKU — required for forwardingGateway) ----
az staticwebapp create --name otto-docs-canary-swa --resource-group otto-docs-canary-rg \
  --location westus2 --sku Standard \
  --tags environment=canary project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

az staticwebapp create --name otto-docs-swa --resource-group otto-docs-rg \
  --location westus2 --sku Standard \
  --tags environment=prod project=otto-docs team=serverless-paas owner=krmitta@microsoft.com

# ---- Isolated UAMIs + single-SWA RBAC (for ADO WIF service connections) --
az identity create --name otto-docs-canary-deploy-mi --resource-group otto-docs-canary-rg --location westus2
az identity create --name otto-docs-prod-deploy-mi   --resource-group otto-docs-rg        --location westus2

CANARY_MI_OID=$(az identity show --name otto-docs-canary-deploy-mi --resource-group otto-docs-canary-rg --query principalId -o tsv)
PROD_MI_OID=$(az identity show --name otto-docs-prod-deploy-mi --resource-group otto-docs-rg --query principalId -o tsv)

az role assignment create \
  --assignee-object-id "$CANARY_MI_OID" --assignee-principal-type ServicePrincipal \
  --role Contributor \
  --scope "/subscriptions/$SUB/resourceGroups/otto-docs-canary-rg/providers/Microsoft.Web/staticSites/otto-docs-canary-swa"

az role assignment create \
  --assignee-object-id "$PROD_MI_OID" --assignee-principal-type ServicePrincipal \
  --role Contributor \
  --scope "/subscriptions/$SUB/resourceGroups/otto-docs-rg/providers/Microsoft.Web/staticSites/otto-docs-swa"

# Bind Federated Identity Credentials from the ADO WIF service connections
# (`otto-docs-canary-arm` and `otto-docs-prod-arm` in `msazure/One`) onto each UAMI:
#   az identity federated-credential create --name ado-otto-docs-<env>-arm \
#     --identity-name otto-docs-<env>-deploy-mi --resource-group <rg> \
#     --issuer <ado-wif-issuer> --subject <ado-wif-subject> --audiences api://AzureADTokenExchange
```

ADO-side setup (`msazure/One`):

1. Create pipeline `Logic-Apps-Automation-Docs` (definition `490778`) pointing at `.azure-pipelines/docs-site-deploy.yml` in `Azure/Logic-Apps-Automation`.
2. Create WIF service connections `otto-docs-canary-arm` and `otto-docs-prod-arm` targeting each UAMI, authorized strictly for pipeline `490778` (`allPipelines: false`).
3. Attach Exclusive Lock + Branch Control (`refs/heads/main,refs/tags/release`) to both connections, plus Manual Approval to `otto-docs-prod-arm`.

## Operational notes

- **Cost**: Both SWAs are Standard SKU (~$9/SWA/month). The lockdown
  (`forwardingGateway`) requires Standard; Free silently ignores it. AFD
  Standard adds ~$35/profile/month plus per-GB egress.
- **Cache**: SWA serves cached static content from the edge; deploys roll
  in atomically — no manual purge needed. AFD also caches static responses
  per the route's compression / query-string-caching settings.
- **Logs**: Deployment history is visible in Azure DevOps pipeline `490778`
  and in the Azure Portal under each SWA's *Overview → Browse* tab. AFD access
  logs go to the profile's Diagnostic Settings (when enabled).
- **Alerts**: Not configured. We can add an Application Insights availability
  test (or simple AFD-side healthProbe) later if docs become production-critical.
