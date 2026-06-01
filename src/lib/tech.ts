export type TechGroup =
  | "Frontend"
  | "Mobile"
  | "Backend"
  | "Database"
  | "Hosting"
  | "Integration";

export type TechItem = {
  name: string;
  group: TechGroup;
  /** simple-icons slug — https://simpleicons.org */
  icon: string;
  /** brand hex without # */
  color: string;
};

export const TECH: TechItem[] = [
  { name: "React", group: "Frontend", icon: "react", color: "61DAFB" },
  { name: "Next.js", group: "Frontend", icon: "nextdotjs", color: "FFFFFF" },
  { name: "React Native", group: "Mobile", icon: "react", color: "61DAFB" },
  { name: "Expo", group: "Mobile", icon: "expo", color: "FFFFFF" },
  { name: "Node.js", group: "Backend", icon: "nodedotjs", color: "339933" },
  { name: "Firebase", group: "Backend", icon: "firebase", color: "FFCA28" },
  { name: "Cloud Functions", group: "Backend", icon: "googlecloud", color: "4285F4" },
  { name: "Firestore", group: "Database", icon: "firebase", color: "FFCA28" },
  { name: "PostgreSQL", group: "Database", icon: "postgresql", color: "4169E1" },
  { name: "Vercel", group: "Hosting", icon: "vercel", color: "FFFFFF" },
  { name: "Google Maps API", group: "Integration", icon: "googlemaps", color: "4285F4" },
  { name: "LINE OA", group: "Integration", icon: "line", color: "00C300" },
];

export const TECH_GROUPS: TechGroup[] = [
  "Frontend",
  "Mobile",
  "Backend",
  "Database",
  "Hosting",
  "Integration",
];

export const GROUP_STYLE: Record<
  TechGroup,
  { accent: string; glow: string; label: string }
> = {
  Frontend: { accent: "from-cyan-400 to-sky-500", glow: "bg-cyan-400/20", label: "text-cyan-300" },
  Mobile: { accent: "from-violet-400 to-purple-500", glow: "bg-violet-400/20", label: "text-violet-300" },
  Backend: { accent: "from-amber-400 to-orange-500", glow: "bg-amber-400/20", label: "text-amber-300" },
  Database: { accent: "from-blue-400 to-indigo-500", glow: "bg-blue-400/20", label: "text-blue-300" },
  Hosting: { accent: "from-slate-200 to-white", glow: "bg-white/10", label: "text-slate-200" },
  Integration: { accent: "from-emerald-400 to-green-500", glow: "bg-emerald-400/20", label: "text-emerald-300" },
};

/** Simple Icons CDN — brand SVG logos */
export function techIconUrl(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}
