export type DemoNavItem = {
  href: string;
  label: string;
  group?: string;
};

export type DemoBrandMeta = {
  slug: string;
  name: string;
  subtitle: string;
  accent: string; // tailwind text/bg accent class pair helper
  accentBg: string;
  accentText: string;
};
