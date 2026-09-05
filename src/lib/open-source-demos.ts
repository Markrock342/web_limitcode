import type { Demo } from "./demos";
import type { IconName } from "./site";

export type OssKind =
  | "booking"
  | "crm"
  | "shop"
  | "cms"
  | "chat"
  | "erp"
  | "ops"
  | "forms"
  | "analytics"
  | "auth"
  | "docs"
  | "automation"
  | "ai"
  | "dev";

type Kind = OssKind;

type Seed = {
  slug: string;
  name: string;
  tagline: string;
  kind: Kind;
  url: string;
  repo: string;
  license: string;
  preview?: string;
};

const KIND: Record<
  Kind,
  { icon: IconName; swatch: string; accent: string; tag: string }
> = {
  booking: {
    icon: "calendar",
    swatch: "from-slate-900 via-slate-700 to-sky-500",
    accent: "text-slate-800",
    tag: "Booking",
  },
  crm: {
    icon: "layers",
    swatch: "from-sky-900 via-sky-600 to-cyan-400",
    accent: "text-sky-800",
    tag: "CRM",
  },
  shop: {
    icon: "cart",
    swatch: "from-zinc-900 via-violet-700 to-fuchsia-400",
    accent: "text-violet-800",
    tag: "Shop",
  },
  cms: {
    icon: "dashboard",
    swatch: "from-violet-900 via-violet-600 to-indigo-400",
    accent: "text-violet-800",
    tag: "CMS",
  },
  chat: {
    icon: "chat",
    swatch: "from-blue-700 via-sky-500 to-indigo-400",
    accent: "text-sky-700",
    tag: "Inbox",
  },
  erp: {
    icon: "dashboard",
    swatch: "from-[#0b1f3a] via-slate-600 to-amber-400",
    accent: "text-slate-800",
    tag: "ERP",
  },
  ops: {
    icon: "rocket",
    swatch: "from-emerald-900 via-teal-600 to-lime-400",
    accent: "text-emerald-800",
    tag: "Ops",
  },
  forms: {
    icon: "layers",
    swatch: "from-indigo-900 via-indigo-600 to-sky-400",
    accent: "text-indigo-800",
    tag: "Forms",
  },
  analytics: {
    icon: "dashboard",
    swatch: "from-orange-900 via-amber-600 to-yellow-400",
    accent: "text-amber-800",
    tag: "Analytics",
  },
  auth: {
    icon: "shield",
    swatch: "from-slate-900 via-emerald-700 to-teal-400",
    accent: "text-emerald-800",
    tag: "Auth",
  },
  docs: {
    icon: "globe",
    swatch: "from-slate-800 via-blue-700 to-sky-400",
    accent: "text-blue-800",
    tag: "Docs",
  },
  automation: {
    icon: "spark",
    swatch: "from-rose-900 via-pink-600 to-orange-400",
    accent: "text-rose-800",
    tag: "Automation",
  },
  ai: {
    icon: "spark",
    swatch: "from-violet-950 via-fuchsia-600 to-cyan-400",
    accent: "text-violet-800",
    tag: "AI",
  },
  dev: {
    icon: "rocket",
    swatch: "from-ink via-brand-700 to-sky-400",
    accent: "text-brand-800",
    tag: "Dev tools",
  },
};

/** Compact seed list — official public sites, not studio work */
const SEEDS: Seed[] = [
  // Booking / scheduling
  { slug: "calcom", name: "Cal.com", tagline: "Open scheduling", kind: "booking", url: "https://cal.com", repo: "https://github.com/calcom/cal.com", license: "AGPL-3.0", preview: "/showcase/oss-calcom.jpg" },
  { slug: "calcom-demo", name: "Cal.com Embeds", tagline: "Live booking embeds", kind: "booking", url: "https://demo.cal.com", repo: "https://github.com/calcom/cal.com", license: "AGPL-3.0" },
  { slug: "easyappointments", name: "Easy!Appointments", tagline: "Appointment booking", kind: "booking", url: "https://easyappointments.org", repo: "https://github.com/alextselegidis/easyappointments", license: "GPL-3.0" },
  { slug: "bookstack", name: "BookStack", tagline: "Wiki / knowledge base", kind: "docs", url: "https://www.bookstackapp.com", repo: "https://github.com/BookStackApp/BookStack", license: "MIT" },

  // CRM / sales
  { slug: "refine-crm", name: "Refine CRM", tagline: "Clickable CRM demo", kind: "crm", url: "https://example.crm.refine.dev", repo: "https://github.com/refinedev/refine", license: "MIT", preview: "/showcase/oss-refine-crm.jpg" },
  { slug: "twenty", name: "Twenty", tagline: "Open-source CRM", kind: "crm", url: "https://twenty.com", repo: "https://github.com/twentyhq/twenty", license: "AGPL-3.0" },
  { slug: "espocrm", name: "EspoCRM", tagline: "Classic CRM demo", kind: "crm", url: "https://demo.espocrm.com", repo: "https://github.com/espocrm/espocrm", license: "AGPL-3.0" },
  { slug: "suitecrm", name: "SuiteCRM", tagline: "Enterprise CRM", kind: "crm", url: "https://suitecrm.com", repo: "https://github.com/salesagility/SuiteCRM", license: "AGPL-3.0" },
  { slug: "erxes", name: "erxes", tagline: "Growth / CRM suite", kind: "crm", url: "https://erxes.io", repo: "https://github.com/erxes/erxes", license: "AGPL-3.0" },
  { slug: "monica", name: "Monica", tagline: "Personal CRM", kind: "crm", url: "https://www.monicahq.com", repo: "https://github.com/monicahq/monica", license: "AGPL-3.0" },
  { slug: "solidus", name: "Solidus", tagline: "Rails e-commerce", kind: "shop", url: "https://solidus.io", repo: "https://github.com/solidusio/solidus", license: "BSD-3-Clause" },

  // Shop / commerce
  { slug: "medusa", name: "Medusa Store", tagline: "Headless commerce store", kind: "shop", url: "https://next.medusajs.com/us/collections/clothing", repo: "https://github.com/medusajs/medusa", license: "MIT", preview: "/showcase/oss-medusa.jpg" },
  { slug: "saleor", name: "Saleor", tagline: "GraphQL commerce", kind: "shop", url: "https://demo.saleor.io", repo: "https://github.com/saleor/saleor", license: "BSD-3-Clause" },
  { slug: "vendure", name: "Vendure", tagline: "Node headless shop", kind: "shop", url: "https://www.vendure.io", repo: "https://github.com/vendure-ecommerce/vendure", license: "GPL-3.0" },
  { slug: "spree", name: "Spree Commerce", tagline: "Rails storefront", kind: "shop", url: "https://spreecommerce.org", repo: "https://github.com/spree/spree", license: "BSD-3-Clause" },
  { slug: "bagisto", name: "Bagisto", tagline: "Laravel e-commerce", kind: "shop", url: "https://bagisto.com", repo: "https://github.com/bagisto/bagisto", license: "MIT" },
  { slug: "shopware", name: "Shopware", tagline: "Open commerce platform", kind: "shop", url: "https://www.shopware.com", repo: "https://github.com/shopware/shopware", license: "MIT" },
  { slug: "sylius", name: "Sylius", tagline: "Symfony e-commerce", kind: "shop", url: "https://sylius.com", repo: "https://github.com/Sylius/Sylius", license: "MIT" },
  { slug: "nopcommerce", name: "nopCommerce", tagline: ".NET store", kind: "shop", url: "https://www.nopcommerce.com", repo: "https://github.com/nopSolutions/nopCommerce", license: "GPL-3.0" },
  { slug: "opencart", name: "OpenCart", tagline: "PHP storefront", kind: "shop", url: "https://www.opencart.com", repo: "https://github.com/opencart/opencart", license: "GPL-3.0" },
  { slug: "prestashop", name: "PrestaShop", tagline: "Online store CMS", kind: "shop", url: "https://www.prestashop.com", repo: "https://github.com/PrestaShop/PrestaShop", license: "OSL-3.0" },
  { slug: "magento-os", name: "Adobe Commerce OS", tagline: "Magento Open Source", kind: "shop", url: "https://business.adobe.com/products/magento/open-source.html", repo: "https://github.com/magento/magento2", license: "OSL-3.0" },
  { slug: "evershop", name: "EverShop", tagline: "Node commerce", kind: "shop", url: "https://evershop.io", repo: "https://github.com/evershopcommerce/evershop", license: "GPL-3.0" },
  { slug: "reaction", name: "Reaction Commerce", tagline: "Realtime commerce API", kind: "shop", url: "https://www.reactioncommerce.com", repo: "https://github.com/reactioncommerce/reaction", license: "GPL-3.0" },

  // CMS / headless
  { slug: "directus", name: "Directus", tagline: "Data platform / CMS", kind: "cms", url: "https://directus.com", repo: "https://github.com/directus/directus", license: "GPL-3.0", preview: "/showcase/oss-directus.jpg" },
  { slug: "strapi", name: "Strapi", tagline: "Headless CMS", kind: "cms", url: "https://strapi.io", repo: "https://github.com/strapi/strapi", license: "MIT" },
  { slug: "payload", name: "Payload", tagline: "Next.js CMS", kind: "cms", url: "https://payloadcms.com", repo: "https://github.com/payloadcms/payload", license: "MIT" },
  { slug: "ghost", name: "Ghost", tagline: "Publishing CMS", kind: "cms", url: "https://ghost.org", repo: "https://github.com/TryGhost/Ghost", license: "MIT" },
  { slug: "wordpress", name: "WordPress", tagline: "Classic CMS", kind: "cms", url: "https://wordpress.org", repo: "https://github.com/WordPress/WordPress", license: "GPL-2.0" },
  { slug: "drupal", name: "Drupal", tagline: "Enterprise CMS", kind: "cms", url: "https://www.drupal.org", repo: "https://github.com/drupal/drupal", license: "GPL-2.0" },
  { slug: "keystone", name: "KeystoneJS", tagline: "GraphQL CMS", kind: "cms", url: "https://keystonejs.com", repo: "https://github.com/keystonejs/keystone", license: "MIT" },
  { slug: "sanity", name: "Sanity", tagline: "Composable content", kind: "cms", url: "https://www.sanity.io", repo: "https://github.com/sanity-io/sanity", license: "MIT" },
  { slug: "decap", name: "Decap CMS", tagline: "Git-based CMS", kind: "cms", url: "https://decapcms.org", repo: "https://github.com/decaporg/decap-cms", license: "MIT" },
  { slug: "wagtail", name: "Wagtail", tagline: "Django CMS", kind: "cms", url: "https://wagtail.org", repo: "https://github.com/wagtail/wagtail", license: "BSD-3-Clause" },
  { slug: "typo3", name: "TYPO3", tagline: "Enterprise CMS", kind: "cms", url: "https://typo3.org", repo: "https://github.com/TYPO3/typo3", license: "GPL-2.0" },
  { slug: "pico", name: "Pico", tagline: "Flat-file CMS", kind: "cms", url: "https://picocms.org", repo: "https://github.com/picocms/Pico", license: "MIT" },
  { slug: "grav", name: "Grav", tagline: "Flat-file CMS", kind: "cms", url: "https://getgrav.org", repo: "https://github.com/getgrav/grav", license: "MIT" },

  // Chat / support
  { slug: "chatwoot", name: "Chatwoot", tagline: "Omnichannel inbox", kind: "chat", url: "https://www.chatwoot.com", repo: "https://github.com/chatwoot/chatwoot", license: "MIT", preview: "/showcase/oss-chatwoot.jpg" },
  { slug: "papercups", name: "Papercups", tagline: "Live chat widget", kind: "chat", url: "https://papercups.io", repo: "https://github.com/papercups-io/papercups", license: "MIT" },
  { slug: "chaskiq", name: "Chaskiq", tagline: "Messaging platform", kind: "chat", url: "https://chaskiq.io", repo: "https://github.com/chaskiq/chaskiq", license: "AGPL-3.0" },
  { slug: "typebot", name: "Typebot", tagline: "Chatbot builder", kind: "chat", url: "https://typebot.io", repo: "https://github.com/baptisteArno/typebot.io", license: "AGPL-3.0" },
  { slug: "botpress", name: "Botpress", tagline: "Chatbot studio", kind: "chat", url: "https://botpress.com", repo: "https://github.com/botpress/botpress", license: "MIT" },
  { slug: "rocketchat", name: "Rocket.Chat", tagline: "Team messaging", kind: "chat", url: "https://www.rocket.chat", repo: "https://github.com/RocketChat/Rocket.Chat", license: "MIT" },
  { slug: "mattermost", name: "Mattermost", tagline: "Team collaboration", kind: "chat", url: "https://mattermost.com", repo: "https://github.com/mattermost/mattermost", license: "AGPL-3.0" },
  { slug: "zulip", name: "Zulip", tagline: "Threaded team chat", kind: "chat", url: "https://zulip.com", repo: "https://github.com/zulip/zulip", license: "Apache-2.0" },
  { slug: "freescout", name: "FreeScout", tagline: "Help desk inbox", kind: "chat", url: "https://freescout.net", repo: "https://github.com/freescout-helpdesk/freescout", license: "AGPL-3.0" },
  { slug: "uvdesk", name: "UVdesk", tagline: "Helpdesk system", kind: "chat", url: "https://www.uvdesk.com", repo: "https://github.com/uvdesk/community-skeleton", license: "MIT" },

  // ERP / business ops
  { slug: "erpnext", name: "ERPNext", tagline: "Full ERP suite", kind: "erp", url: "https://erpnext.com", repo: "https://github.com/frappe/erpnext", license: "GPL-3.0" },
  { slug: "odoo", name: "Odoo", tagline: "Apps for business", kind: "erp", url: "https://www.odoo.com", repo: "https://github.com/odoo/odoo", license: "LGPL-3.0" },
  { slug: "dolibarr", name: "Dolibarr", tagline: "ERP / CRM", kind: "erp", url: "https://www.dolibarr.org", repo: "https://github.com/Dolibarr/dolibarr", license: "GPL-3.0" },
  { slug: "akaunting", name: "Akaunting", tagline: "Online accounting", kind: "erp", url: "https://akaunting.com", repo: "https://github.com/akaunting/akaunting", license: "GPL-3.0" },
  { slug: "invoice-ninja", name: "Invoice Ninja", tagline: "Invoicing", kind: "erp", url: "https://www.invoiceninja.com", repo: "https://github.com/invoiceninja/invoiceninja", license: "Elastic-2.0" },
  { slug: "crater", name: "Crater", tagline: "Invoices & expenses", kind: "erp", url: "https://craterapp.com", repo: "https://github.com/crater-invoice/crater", license: "AAL" },
  { slug: "kimai", name: "Kimai", tagline: "Time tracking", kind: "ops", url: "https://www.kimai.org", repo: "https://github.com/kimai/kimai", license: "AGPL-3.0" },
  { slug: "solidtime", name: "Solidtime", tagline: "Time tracking", kind: "ops", url: "https://www.solidtime.io", repo: "https://github.com/solidtime-io/solidtime", license: "AGPL-3.0" },
  { slug: "plane", name: "Plane", tagline: "Project management", kind: "ops", url: "https://plane.so", repo: "https://github.com/makeplane/plane", license: "AGPL-3.0" },
  { slug: "openproject", name: "OpenProject", tagline: "Project collaboration", kind: "ops", url: "https://www.openproject.org", repo: "https://github.com/opf/openproject", license: "GPL-3.0" },
  { slug: "taiga", name: "Taiga", tagline: "Agile project tool", kind: "ops", url: "https://taiga.io", repo: "https://github.com/taigaio/taiga", license: "MPL-2.0" },
  { slug: "kanboard", name: "Kanboard", tagline: "Kanban boards", kind: "ops", url: "https://kanboard.org", repo: "https://github.com/kanboard/kanboard", license: "MIT" },
  { slug: "focalboard", name: "Focalboard", tagline: "Project boards", kind: "ops", url: "https://www.focalboard.com", repo: "https://github.com/mattermost/focalboard", license: "AGPL / MIT" },
  { slug: "affine", name: "AFFiNE", tagline: "Docs & whiteboard", kind: "docs", url: "https://affine.pro", repo: "https://github.com/toeverything/AFFiNE", license: "MIT" },
  { slug: "appflowy", name: "AppFlowy", tagline: "Notion-style workspace", kind: "docs", url: "https://appflowy.io", repo: "https://github.com/AppFlowy-IO/AppFlowy", license: "AGPL-3.0" },
  { slug: "outline", name: "Outline", tagline: "Team knowledge base", kind: "docs", url: "https://www.getoutline.com", repo: "https://github.com/outline/outline", license: "BSL-1.1" },
  { slug: "documenso", name: "Documenso", tagline: "E-sign documents", kind: "forms", url: "https://documenso.com", repo: "https://github.com/documenso/documenso", license: "AGPL-3.0" },
  { slug: "formbricks", name: "Formbricks", tagline: "Experience surveys", kind: "forms", url: "https://formbricks.com", repo: "https://github.com/formbricks/formbricks", license: "AGPL-3.0" },
  { slug: "typeform-oss", name: "OhMyForm", tagline: "Open forms", kind: "forms", url: "https://ohmyform.com", repo: "https://github.com/ohmyform/ohmyform", license: "AGPL-3.0" },
  { slug: "formkit", name: "FormKit", tagline: "Vue form framework", kind: "forms", url: "https://formkit.com", repo: "https://github.com/formkit/formkit", license: "MIT" },
  { slug: "surveyjs", name: "SurveyJS", tagline: "Survey builder", kind: "forms", url: "https://surveyjs.io", repo: "https://github.com/surveyjs/survey-library", license: "MIT" },

  // Analytics / product
  { slug: "posthog", name: "PostHog", tagline: "Product analytics", kind: "analytics", url: "https://posthog.com", repo: "https://github.com/PostHog/posthog", license: "MIT" },
  { slug: "matomo", name: "Matomo", tagline: "Web analytics", kind: "analytics", url: "https://matomo.org", repo: "https://github.com/matomo-org/matomo", license: "GPL-3.0" },
  { slug: "plausible", name: "Plausible", tagline: "Privacy analytics", kind: "analytics", url: "https://plausible.io", repo: "https://github.com/plausible/analytics", license: "AGPL-3.0" },
  { slug: "umami", name: "Umami", tagline: "Simple analytics", kind: "analytics", url: "https://umami.is", repo: "https://github.com/umami-software/umami", license: "MIT" },
  { slug: "metabase", name: "Metabase", tagline: "Business intelligence", kind: "analytics", url: "https://www.metabase.com", repo: "https://github.com/metabase/metabase", license: "AGPL-3.0" },
  { slug: "superset", name: "Apache Superset", tagline: "Data exploration", kind: "analytics", url: "https://superset.apache.org", repo: "https://github.com/apache/superset", license: "Apache-2.0" },
  { slug: "grafana", name: "Grafana", tagline: "Observability dashboards", kind: "analytics", url: "https://grafana.com", repo: "https://github.com/grafana/grafana", license: "AGPL-3.0" },
  { slug: "nocodb", name: "NocoDB", tagline: "Airtable alternative", kind: "ops", url: "https://nocodb.com", repo: "https://github.com/nocodb/nocodb", license: "AGPL-3.0" },
  { slug: "baserow", name: "Baserow", tagline: "No-code database", kind: "ops", url: "https://baserow.io", repo: "https://github.com/bram2w/baserow", license: "MIT" },
  { slug: "appsmith", name: "Appsmith", tagline: "Internal tools", kind: "ops", url: "https://www.appsmith.com", repo: "https://github.com/appsmithorg/appsmith", license: "Apache-2.0" },
  { slug: "tooljet", name: "ToolJet", tagline: "Low-code internal apps", kind: "ops", url: "https://www.tooljet.com", repo: "https://github.com/ToolJet/ToolJet", license: "AGPL-3.0" },
  { slug: "budibase", name: "Budibase", tagline: "Low-code platform", kind: "ops", url: "https://budibase.com", repo: "https://github.com/Budibase/budibase", license: "GPL-3.0" },

  // Auth / identity
  { slug: "supabase", name: "Supabase", tagline: "Backend + Auth", kind: "auth", url: "https://supabase.com", repo: "https://github.com/supabase/supabase", license: "Apache-2.0" },
  { slug: "appwrite", name: "Appwrite", tagline: "Backend platform", kind: "auth", url: "https://appwrite.io", repo: "https://github.com/appwrite/appwrite", license: "BSD-3-Clause" },
  { slug: "pocketbase", name: "PocketBase", tagline: "Backend in one file", kind: "auth", url: "https://pocketbase.io", repo: "https://github.com/pocketbase/pocketbase", license: "MIT" },
  { slug: "keycloak", name: "Keycloak", tagline: "Identity & SSO", kind: "auth", url: "https://www.keycloak.org", repo: "https://github.com/keycloak/keycloak", license: "Apache-2.0" },
  { slug: "authentik", name: "authentik", tagline: "Identity provider", kind: "auth", url: "https://goauthentik.io", repo: "https://github.com/goauthentik/authentik", license: "GPL-3.0" },
  { slug: "casdoor", name: "Casdoor", tagline: "UI-first IdP", kind: "auth", url: "https://casdoor.org", repo: "https://github.com/casdoor/casdoor", license: "Apache-2.0" },
  { slug: "logto", name: "Logto", tagline: "Auth & user management", kind: "auth", url: "https://logto.io", repo: "https://github.com/logto-io/logto", license: "MPL-2.0" },
  { slug: "ory", name: "Ory", tagline: "Auth & permissions", kind: "auth", url: "https://www.ory.sh", repo: "https://github.com/ory/kratos", license: "Apache-2.0" },

  // Automation / AI
  { slug: "n8n", name: "n8n", tagline: "Workflow automation", kind: "automation", url: "https://n8n.io", repo: "https://github.com/n8n-io/n8n", license: "Sustainable Use" },
  { slug: "activepieces", name: "Activepieces", tagline: "No-code automation", kind: "automation", url: "https://www.activepieces.com", repo: "https://github.com/activepieces/activepieces", license: "MIT" },
  { slug: "windmill", name: "Windmill", tagline: "Scripts as workflows", kind: "automation", url: "https://www.windmill.dev", repo: "https://github.com/windmill-labs/windmill", license: "AGPL-3.0" },
  { slug: "huginn", name: "Huginn", tagline: "Agent automation", kind: "automation", url: "https://github.com/huginn/huginn", repo: "https://github.com/huginn/huginn", license: "MIT" },
  { slug: "langflow", name: "Langflow", tagline: "AI flow builder", kind: "ai", url: "https://www.langflow.org", repo: "https://github.com/langflow-ai/langflow", license: "MIT" },
  { slug: "flowise", name: "Flowise", tagline: "LLM orchestration UI", kind: "ai", url: "https://flowiseai.com", repo: "https://github.com/FlowiseAI/Flowise", license: "Apache-2.0" },
  { slug: "dify", name: "Dify", tagline: "LLM app platform", kind: "ai", url: "https://dify.ai", repo: "https://github.com/langgenius/dify", license: "Apache-2.0" },
  { slug: "openwebui", name: "Open WebUI", tagline: "ChatGPT-style UI", kind: "ai", url: "https://openwebui.com", repo: "https://github.com/open-webui/open-webui", license: "BSD-3-Clause" },
  { slug: "anythingllm", name: "AnythingLLM", tagline: "Private AI workspace", kind: "ai", url: "https://anythingllm.com", repo: "https://github.com/Mintplex-Labs/anything-llm", license: "MIT" },
  { slug: "ollama", name: "Ollama", tagline: "Local LLM runner", kind: "ai", url: "https://ollama.com", repo: "https://github.com/ollama/ollama", license: "MIT" },
  // Business-adjacent platforms & tools
  { slug: "meilisearch", name: "Meilisearch", tagline: "Search engine", kind: "ops", url: "https://www.meilisearch.com", repo: "https://github.com/meilisearch/meilisearch", license: "MIT" },
  { slug: "typesense", name: "Typesense", tagline: "Typo-tolerant search", kind: "ops", url: "https://typesense.org", repo: "https://github.com/typesense/typesense", license: "GPL-3.0" },
  { slug: "listmonk", name: "Listmonk", tagline: "Newsletter / mailing", kind: "ops", url: "https://listmonk.app", repo: "https://github.com/knadh/listmonk", license: "AGPL-3.0" },
  { slug: "postal", name: "Postal", tagline: "Mail server", kind: "ops", url: "https://docs.postalserver.io", repo: "https://github.com/postalserver/postal", license: "MIT" },
  { slug: "nextcloud", name: "Nextcloud", tagline: "Files & collaboration", kind: "ops", url: "https://nextcloud.com", repo: "https://github.com/nextcloud/server", license: "AGPL-3.0" },
  { slug: "onlyoffice", name: "ONLYOFFICE", tagline: "Docs collaboration", kind: "docs", url: "https://www.onlyoffice.com", repo: "https://github.com/ONLYOFFICE/DocumentServer", license: "AGPL-3.0" },
  { slug: "penpot", name: "Penpot", tagline: "Design tool", kind: "ops", url: "https://penpot.app", repo: "https://github.com/penpot/penpot", license: "MPL-2.0" },
  { slug: "excalidraw", name: "Excalidraw", tagline: "Whiteboard sketches", kind: "docs", url: "https://excalidraw.com", repo: "https://github.com/excalidraw/excalidraw", license: "MIT" },
  { slug: "drawio", name: "draw.io", tagline: "Diagrams", kind: "docs", url: "https://app.diagrams.net", repo: "https://github.com/jgraph/drawio", license: "Apache-2.0" },
  { slug: "coolify", name: "Coolify", tagline: "Self-host PaaS", kind: "ops", url: "https://coolify.io", repo: "https://github.com/coollabsio/coolify", license: "Apache-2.0" },
  { slug: "caprover", name: "CapRover", tagline: "App deployment PaaS", kind: "ops", url: "https://caprover.com", repo: "https://github.com/caprover/caprover", license: "Apache-2.0" },
  { slug: "umami-demo", name: "Umami Demo", tagline: "Live analytics demo", kind: "analytics", url: "https://cloud.umami.is/share/LGazGOecbDtaIwDr/umami.is", repo: "https://github.com/umami-software/umami", license: "MIT" },
  { slug: "ghost-demo", name: "Ghost Demo", tagline: "Publishing demo", kind: "cms", url: "https://demo.ghost.io", repo: "https://github.com/TryGhost/Ghost", license: "MIT" },
  { slug: "frappe-helpdesk", name: "Frappe Helpdesk", tagline: "Support tickets", kind: "chat", url: "https://frappe.io/helpdesk", repo: "https://github.com/frappe/helpdesk", license: "AGPL-3.0" },
  { slug: "frappe-lms", name: "Frappe LMS", tagline: "Learning platform", kind: "ops", url: "https://frappe.io/learning", repo: "https://github.com/frappe/lms", license: "AGPL-3.0" },
  { slug: "frappe-crm", name: "Frappe CRM", tagline: "Sales CRM", kind: "crm", url: "https://frappe.io/crm", repo: "https://github.com/frappe/crm", license: "AGPL-3.0" },
  { slug: "vue-vben-admin", name: "Vue Vben Admin", tagline: "Admin starter", kind: "ops", url: "https://www.vben.pro", repo: "https://github.com/vbenjs/vue-vben-admin", license: "MIT" },
  { slug: "ant-pro", name: "Ant Design Pro", tagline: "Enterprise admin UI", kind: "ops", url: "https://pro.ant.design", repo: "https://github.com/ant-design/ant-design-pro", license: "MIT" },
];

export const OSS_KIND_ORDER: OssKind[] = [
  "booking",
  "crm",
  "shop",
  "erp",
  "cms",
  "chat",
  "ops",
  "forms",
  "analytics",
  "auth",
  "docs",
  "automation",
  "ai",
  "dev",
];

function hostFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function toDemo(seed: Seed): Demo {
  const meta = KIND[seed.kind];
  const repoHost = seed.repo.replace(/^https?:\/\//, "");
  const domain = hostFromUrl(seed.url);
  const preview = seed.preview || `/showcase/oss-covers/${seed.slug}.jpg`;
  return {
    slug: `oss-${seed.slug}`,
    name: seed.name,
    category: "โอเพนซอร์ส",
    icon: meta.icon,
    tagline: seed.tagline,
    description: seed.tagline,
    liveUrl: seed.url,
    preview,
    swatch: meta.swatch,
    accentText: meta.accent,
    tags: [meta.tag, seed.license, "Open source"],
    features: [`License: ${seed.license}`, `Source: ${repoHost}`, "Opens the official site"],
    openSource: {
      repo: seed.repo,
      license: seed.license,
      kind: seed.kind,
      domain,
    },
  };
}

export const OPEN_SOURCE_DEMOS: Demo[] = SEEDS.map(toDemo).slice(0, 100);

export const OPEN_SOURCE_COUNT = OPEN_SOURCE_DEMOS.length;
