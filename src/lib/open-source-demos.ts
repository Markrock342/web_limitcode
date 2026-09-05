import type { Demo, OssKind } from "./demo-types";
import type { IconName } from "./site";

export type { OssKind } from "./demo-types";

type Kind = OssKind;

type Seed = {
  slug: string;
  name: string;
  tagline: string;
  kind: Kind;
  /** Public interactive demo / app UI — not a marketing homepage */
  url: string;
  repo: string;
  license: string;
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

/**
 * Curated public product UIs only (clickable demos / apps).
 * Marketing sites and login-only walls are excluded.
 */
const SEEDS: Seed[] = [
  {
    slug: "calcom",
    name: "Cal.com",
    tagline: "Live booking sandbox",
    kind: "booking",
    url: "https://demo.cal.com",
    repo: "https://github.com/calcom/cal.com",
    license: "AGPL-3.0",
  },
  {
    slug: "refine-crm",
    name: "Refine CRM",
    tagline: "Clickable CRM dashboard",
    kind: "crm",
    url: "https://example.crm.refine.dev",
    repo: "https://github.com/refinedev/refine",
    license: "MIT",
  },
  {
    slug: "espocrm",
    name: "EspoCRM",
    tagline: "CRM demo (public login)",
    kind: "crm",
    url: "https://demo.us.espocrm.com",
    repo: "https://github.com/espocrm/espocrm",
    license: "AGPL-3.0",
  },
  {
    slug: "medusa",
    name: "Medusa Store",
    tagline: "Headless storefront",
    kind: "shop",
    url: "https://next.medusajs.com/us/collections/clothing",
    repo: "https://github.com/medusajs/medusa",
    license: "MIT",
  },
  {
    slug: "sylius",
    name: "Sylius",
    tagline: "Shop demo storefront",
    kind: "shop",
    url: "https://demo.sylius.com",
    repo: "https://github.com/Sylius/Sylius",
    license: "MIT",
  },
  {
    slug: "bagisto",
    name: "Bagisto",
    tagline: "Laravel shop demo",
    kind: "shop",
    url: "https://demo.bagisto.com",
    repo: "https://github.com/bagisto/bagisto",
    license: "MIT",
  },
  {
    slug: "spree",
    name: "Spree Commerce",
    tagline: "Rails storefront demo",
    kind: "shop",
    url: "https://demo.spreecommerce.org",
    repo: "https://github.com/spree/spree",
    license: "BSD-3-Clause",
  },
  {
    slug: "ghost",
    name: "Ghost",
    tagline: "Publishing demo site",
    kind: "cms",
    url: "https://demo.ghost.io",
    repo: "https://github.com/TryGhost/Ghost",
    license: "MIT",
  },
  {
    slug: "dolibarr",
    name: "Dolibarr",
    tagline: "ERP / CRM demo profiles",
    kind: "erp",
    url: "https://demo.dolibarr.org",
    repo: "https://github.com/Dolibarr/dolibarr",
    license: "GPL-3.0",
  },
  {
    slug: "ant-pro",
    name: "Ant Design Pro",
    tagline: "Admin UI preview",
    kind: "ops",
    url: "https://preview.pro.ant.design",
    repo: "https://github.com/ant-design/ant-design-pro",
    license: "MIT",
  },
  {
    slug: "umami",
    name: "Umami",
    tagline: "Live analytics share",
    kind: "analytics",
    url: "https://cloud.umami.is/share/LGazGOecbDtaIwDr/umami.is",
    repo: "https://github.com/umami-software/umami",
    license: "MIT",
  },
  {
    slug: "grafana",
    name: "Grafana",
    tagline: "Play dashboards",
    kind: "analytics",
    url: "https://play.grafana.org/",
    repo: "https://github.com/grafana/grafana",
    license: "AGPL-3.0",
  },
  {
    slug: "matomo",
    name: "Matomo",
    tagline: "Analytics demo",
    kind: "analytics",
    url: "https://demo.matomo.cloud",
    repo: "https://github.com/matomo-org/matomo",
    license: "GPL-3.0",
  },
  {
    slug: "bookstack",
    name: "BookStack",
    tagline: "Wiki demo",
    kind: "docs",
    url: "https://demo.bookstackapp.com",
    repo: "https://github.com/BookStackApp/BookStack",
    license: "MIT",
  },
  {
    slug: "affine",
    name: "AFFiNE",
    tagline: "Docs & whiteboard app",
    kind: "docs",
    url: "https://app.affine.pro",
    repo: "https://github.com/toeverything/AFFiNE",
    license: "MIT",
  },
  {
    slug: "excalidraw",
    name: "Excalidraw",
    tagline: "Live whiteboard",
    kind: "docs",
    url: "https://excalidraw.com",
    repo: "https://github.com/excalidraw/excalidraw",
    license: "MIT",
  },
  {
    slug: "drawio",
    name: "draw.io",
    tagline: "Diagram editor",
    kind: "docs",
    url: "https://app.diagrams.net/?splash=0",
    repo: "https://github.com/jgraph/drawio",
    license: "Apache-2.0",
  },
  {
    slug: "penpot",
    name: "Penpot",
    tagline: "Design tool app",
    kind: "docs",
    url: "https://design.penpot.app",
    repo: "https://github.com/penpot/penpot",
    license: "MPL-2.0",
  },
  {
    slug: "hoppscotch",
    name: "Hoppscotch",
    tagline: "API client in browser",
    kind: "dev",
    url: "https://hoppscotch.io",
    repo: "https://github.com/hoppscotch/hoppscotch",
    license: "MIT",
  },
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
  return {
    slug: `oss-${seed.slug}`,
    name: seed.name,
    category: "โอเพนซอร์ส",
    icon: meta.icon,
    tagline: seed.tagline,
    description: seed.tagline,
    liveUrl: seed.url,
    preview: `/showcase/oss-${seed.slug}.jpg`,
    swatch: meta.swatch,
    accentText: meta.accent,
    tags: [meta.tag, seed.license, "Live demo"],
    features: [
      `License: ${seed.license}`,
      `Source: ${repoHost}`,
      "Opens a live product UI",
    ],
    openSource: {
      repo: seed.repo,
      license: seed.license,
      kind: seed.kind,
      domain,
    },
  };
}

export const OPEN_SOURCE_DEMOS: Demo[] = SEEDS.map(toDemo);

export const OPEN_SOURCE_COUNT = OPEN_SOURCE_DEMOS.length;
