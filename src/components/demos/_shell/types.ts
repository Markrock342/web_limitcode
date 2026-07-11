export type DemoNavItem = {
  href: string;
  label: string;
  group?: string;
  /** ถ้าไม่ใส่ = ทุกคนเห็น · staff = เฉพาะ staff · member = member+staff · guest = ยังไม่ล็อกอินก็เห็น */
  access?: "all" | "guest" | "member" | "staff";
};

export type DemoBrandMeta = {
  slug: string;
  name: string;
  subtitle: string;
  accent: string;
  accentBg: string;
  accentText: string;
};
