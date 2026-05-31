# Otto Docs Site — Infrastructure

The docs site is an Astro/Starlight build hosted on Azure Static Web Apps.
There are two SWAs — one for canary (auto-deploys on every push to `main`)
and one for prod (gated, manual). Both build from the same source with the
same `base: '/docs'` config and are fronted by Azure Front Door — direct
hits on the `*.azurestaticapps.net` hostnames return 403 by design (see
**Lockdown** below).

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
| Public URL | `https://otto-canary.azure.com/docs/` via AFD `otto-portal-canary-afd` | `https://auto.azure.com/docs/` via AFD `otto-portal-afd` |
| AFD `frontDoorId` | `2ca9cd4d-6df1-47b7-b8e2-24ba2bd17727` | `c1504f11-9bfe-40e3-b58f-923f88dc0689` |
| Tags | `environment=canary` | `environment=prod` |

Both SWAs share `project=otto-docs`, `team=serverless-paas`,
`owner=krmitta@microsoft.com`.

Standard SKU is required for `forwardingGateway` enforcement; Free SKU
silently ignores it. The two SKUs cost ~$9/SWA/month. PR preview
environments use the same Standard SWA but skip the lockdown injection
(see **Lockdown** below), so each preview is reachable directly on its
auto-generated `*-<pr>.eastus2.7.azurestaticapps.net` host.

## CI/CD

| Item | Value |
| --- | --- |
| Workflow | [`.github/workflows/docs-site-deploy.yml`](../.github/workflows/docs-site-deploy.yml) |
| Deploy action | [`Azure/static-web-apps-deploy@v1`](https://github.com/Azure/static-web-apps-deploy) |
| Build | Single Astro build per run; the same artifact deploys to canary and/or prod. Per-target lockdown is layered in just before deploy by [`docs-site/scripts/apply-lockdown.mjs`](./scripts/apply-lockdown.mjs). |
| Auth | GitHub OIDC — no long-lived deployment tokens stored anywhere. |

| Trigger | Action |
| --- | --- |
| `push` to `main` on `docs-site/**` | Build → deploy canary (with canary lockdown) |
| `pull_request` from in-repo branch | Build → deploy preview environment on canary SWA (no lockdown) |
| `pull_request` from fork | Build only (no secret access) |
| `pull_request` closed | Tear down preview environment |
| `workflow_dispatch` target=`canary` | Build → deploy canary (only allowed from `refs/heads/main`) |
| `workflow_dispatch` target=`prod` | Build → deploy prod (gated by `docs-prod` environment reviewers) |

### Auth model (no stored credentials)

All Azure operations flow through the shared **Otto E2E GitHub Actions** SP
(reused across docs and portal canary workflows). There are no docs-specific
GitHub secrets beyond the org-wide Azure identity.

| Identity | Otto E2E GitHub Actions (`appId e8323013-aff3-46b9-8f7e-96ea41edf48a`) |
| --- | --- |
| Tenant | `72f988bf-86f1-41af-91ab-2d7cd011db47` |
| Required GitHub secrets | `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` |
| Federated credentials | `repository_owner_id:6844498:repository_id:1250745995:ref:refs/heads/main` (push), `…:pull_request` (PR previews), `…:environment:docs-prod` (gated prod deploys) |
| Role on canary RG | `Contributor` scoped only to `otto-docs-canary-rg` |
| Role on prod RG | `Contributor` scoped only to `otto-docs-rg` |

> **Subject format caveat.** The Azure GitHub organisation overrides OIDC
> subject claims to be **ID-based**, not name-based — `repository_owner_id`
> and `repository_id` numeric IDs replace the org/repo names. Federated
> credentials whose subject uses the legacy `repo:Azure/Logic-Apps-Automation:…`
> format silently fail to match (AADSTS700213). Always use the numeric form
> for new credentials. Owner ID `6844498` = `Azure`; repo ID `1250745995` =
> `Logic-Apps-Automation`.

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

In-repo PRs each get a preview environment hosted by the canary SWA.
Fork PRs build but don't deploy (GitHub does not pass secrets to fork
workflows, by design). Maintainers can manually deploy a fork PR's branch
with a `workflow_dispatch` run after review.

Closing or merging the PR automatically tears down the preview (the
`close_pr_preview` job). Preview deploys intentionally skip the
`apply-lockdown.mjs` step so the auto-generated preview hostname is
reachable directly — the reviewer can open the link without going through
AFD.

## Front Door routing

Both environments are fronted by their own AFD profile in the same
subscription:

| AFD piece | Canary | Prod |
| --- | --- | --- |
| Profile | `otto-portal-canary-afd` (RG `otto-portal-canary-rg`) | `otto-portal-afd` (RG `otto-portal-rg`) |
| Endpoint | `otto-portal-canary` | `otto-portal` |
| Custom domain | `otto-canary` (`otto-canary.azure.com`, AFD-managed cert) | `auto-azure-com` (`auto.azure.com`, AFD-managed cert) |
| Docs origin group | `otto-docs-canary-origins` (probe `HEAD /`, HTTPS, 100s) | `otto-docs-origins` |
| Docs origin | `otto-docs-canary-swa` → `lemon-mud-0e10bdd1e.7.azurestaticapps.net` | `otto-docs-swa-origin` → `kind-river-0d9e9ac1e.7.azurestaticapps.net` |
| Docs route | `docs-route` — `patternsToMatch: ['/docs', '/docs/*']`, HTTPS only, `linkToDefaultDomain: Disabled` | same |
| Default route | `default-route` — `/*` → portal ACA origins | same |

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
domain, and CDN. Both production SWAs are configured to reject any request
that doesn't carry the expected AFD identifier headers.

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
| **SKU** | `forwardingGateway` is enforced only on **Standard** SKU. Free SKU silently ignores it. |
| **Single FDID per env** | Each SWA pins to exactly one AFD profile via `requiredHeaders`; we can't share a single SWA across canary and prod AFDs. Per-env injection is therefore required and lives in the deploy workflow. |
| **PR previews** | Preview environments inherit a non-fronted hostname; the workflow `if: github.event_name != 'pull_request'` guard skips lockdown so PR reviewers can open the preview link directly. |
| **`X-Azure-FDID` is per-profile** | Stamped on every AFD response and discoverable in the Azure Portal / via `az afd profile show -o json --query frontDoorId`. Update [`apply-lockdown.mjs`](./scripts/apply-lockdown.mjs) if the AFD profile is ever recreated. |

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

# Federated credentials for this repo (Azure/Logic-Apps-Automation).
# Subject format MUST be ID-based to match the Azure org's OIDC claim
# customization — name-based subjects silently fail with AADSTS700213.
REPO_OWNER_ID=6844498        # Azure
REPO_ID=1250745995           # Logic-Apps-Automation
for cred in \
  "{\"name\":\"laa-main-numeric\",\"issuer\":\"https://token.actions.githubusercontent.com\",\"subject\":\"repository_owner_id:$REPO_OWNER_ID:repository_id:$REPO_ID:ref:refs/heads/main\",\"description\":\"docs canary deploys on main push\",\"audiences\":[\"api://AzureADTokenExchange\"]}" \
  "{\"name\":\"laa-pr-numeric\",\"issuer\":\"https://token.actions.githubusercontent.com\",\"subject\":\"repository_owner_id:$REPO_OWNER_ID:repository_id:$REPO_ID:pull_request\",\"description\":\"docs PR preview deploys\",\"audiences\":[\"api://AzureADTokenExchange\"]}" \
  "{\"name\":\"laa-env-docs-prod-numeric\",\"issuer\":\"https://token.actions.githubusercontent.com\",\"subject\":\"repository_owner_id:$REPO_OWNER_ID:repository_id:$REPO_ID:environment:docs-prod\",\"description\":\"docs prod gated deploys\",\"audiences\":[\"api://AzureADTokenExchange\"]}"
do
  az ad app federated-credential create --id "$SP_APP_OBJ" --parameters "$cred"
done

# ---- AFD docs routing ----------------------------------------------------
# Prod (existing portal AFD)
PROD_PROFILE=otto-portal-afd
PROD_AFD_RG=otto-portal-rg
PROD_ENDPOINT=otto-portal
PROD_CD=auto-azure-com   # custom-domain resource name for auto.azure.com
PROD_SWA_HOST=kind-river-0d9e9ac1e.7.azurestaticapps.net

az afd origin-group create --profile-name $PROD_PROFILE --resource-group $PROD_AFD_RG \
  --origin-group-name otto-docs-origins \
  --probe-protocol Https --probe-path / --probe-request-type HEAD --probe-interval-in-seconds 100 \
  --sample-size 4 --successful-samples-required 3 --additional-latency-in-milliseconds 50
az afd origin create --profile-name $PROD_PROFILE --resource-group $PROD_AFD_RG \
  --origin-group-name otto-docs-origins --origin-name otto-docs-swa-origin \
  --host-name $PROD_SWA_HOST --origin-host-header $PROD_SWA_HOST \
  --https-port 443 --priority 1 --weight 1000 --enabled-state Enabled
az afd route create --profile-name $PROD_PROFILE --resource-group $PROD_AFD_RG \
  --endpoint-name $PROD_ENDPOINT --route-name docs-route \
  --origin-group otto-docs-origins --custom-domains $PROD_CD \
  --patterns-to-match '/docs' '/docs/*' \
  --supported-protocols Http Https --forwarding-protocol HttpsOnly \
  --https-redirect Enabled --link-to-default-domain Disabled

# Canary (mirror)
CANARY_PROFILE=otto-portal-canary-afd
CANARY_AFD_RG=otto-portal-canary-rg
CANARY_ENDPOINT=otto-portal-canary
CANARY_CD=otto-canary    # custom-domain resource name for otto-canary.azure.com
CANARY_SWA_HOST=lemon-mud-0e10bdd1e.7.azurestaticapps.net

az afd origin-group create --profile-name $CANARY_PROFILE --resource-group $CANARY_AFD_RG \
  --origin-group-name otto-docs-canary-origins \
  --probe-protocol Https --probe-path / --probe-request-type HEAD --probe-interval-in-seconds 100 \
  --sample-size 4 --successful-samples-required 3 --additional-latency-in-milliseconds 50
az afd origin create --profile-name $CANARY_PROFILE --resource-group $CANARY_AFD_RG \
  --origin-group-name otto-docs-canary-origins --origin-name otto-docs-canary-swa \
  --host-name $CANARY_SWA_HOST --origin-host-header $CANARY_SWA_HOST \
  --https-port 443 --priority 1 --weight 1000 --enabled-state Enabled
az afd route create --profile-name $CANARY_PROFILE --resource-group $CANARY_AFD_RG \
  --endpoint-name $CANARY_ENDPOINT --route-name docs-route \
  --origin-group otto-docs-canary-origins --custom-domains $CANARY_CD \
  --patterns-to-match '/docs' '/docs/*' \
  --supported-protocols Http Https --forwarding-protocol HttpsOnly \
  --https-redirect Enabled --link-to-default-domain Disabled
```

Repo-side one-time setup (GitHub UI — requires repo admin):

1. **Settings → Secrets and variables → Actions → New repository secret**, add
   - `AZURE_CLIENT_ID = e8323013-aff3-46b9-8f7e-96ea41edf48a`
   - `AZURE_TENANT_ID = 72f988bf-86f1-41af-91ab-2d7cd011db47`
   - `AZURE_SUBSCRIPTION_ID = 49cff46c-0b82-4a1b-a533-ede69747bb0b`
2. **Settings → Environments → New environment** named `docs-prod`,
   configure **Required reviewers** (recommended: 1+ team maintainer).
   Optionally restrict to `main`-only deploy branch.

## Operational notes

- **Cost**: Both SWAs are Standard SKU (~$9/SWA/month). The lockdown
  (`forwardingGateway`) requires Standard; Free silently ignores it. AFD
  Standard adds ~$35/profile/month plus per-GB egress.
- **Cache**: SWA serves cached static content from the edge; deploys roll
  in atomically — no manual purge needed. AFD also caches static responses
  per the route's compression / query-string-caching settings.
- **Logs**: Deployment history is visible in the Azure Portal under each
  SWA's *Overview → Browse* tab. AFD access logs go to the profile's
  Diagnostic Settings (when enabled).
- **Alerts**: Not configured. We can add an Application Insights availability
  test (or simple AFD-side healthProbe) later if docs become production-critical.
