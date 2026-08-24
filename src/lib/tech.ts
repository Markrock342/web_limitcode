export type TechGroup =
  | "Languages"
  | "Frontend"
  | "Mobile"
  | "Backend"
  | "Database"
  | "Hosting"
  | "Integration"
  | "Tools"
  | "AI";

export type TechItem = {
  name: string;
  group: TechGroup;
  /** simple-icons slug — empty when using local */
  icon: string;
  /** brand hex without # */
  color: string;
  /** Local SVG under /public/tech */
  local?: string;
};

export const TECH: TechItem[] = [
  // Languages
  { name: "TypeScript", group: "Languages", icon: "typescript", color: "3178C6" },
  { name: "JavaScript", group: "Languages", icon: "javascript", color: "F7DF1E" },
  { name: "Python", group: "Languages", icon: "python", color: "3776AB" },
  { name: "Dart", group: "Languages", icon: "dart", color: "0175C2" },
  { name: "SQL", group: "Languages", icon: "postgresql", color: "4169E1" },
  { name: "Go", group: "Languages", icon: "go", color: "00ADD8" },
  // Frontend
  { name: "React", group: "Frontend", icon: "react", color: "61DAFB" },
  { name: "Next.js", group: "Frontend", icon: "nextdotjs", color: "FFFFFF" },
  { name: "Tailwind CSS", group: "Frontend", icon: "tailwindcss", color: "06B6D4" },
  { name: "Vite", group: "Frontend", icon: "vite", color: "646CFF" },
  // Mobile
  { name: "React Native", group: "Mobile", icon: "react", color: "61DAFB" },
  { name: "Expo", group: "Mobile", icon: "expo", color: "FFFFFF" },
  { name: "Flutter", group: "Mobile", icon: "flutter", color: "02569B" },
  { name: "Capacitor", group: "Mobile", icon: "capacitor", color: "119EFF" },
  // Backend
  { name: "Node.js", group: "Backend", icon: "nodedotjs", color: "339933" },
  { name: "NestJS", group: "Backend", icon: "nestjs", color: "E0234E" },
  { name: "Prisma", group: "Backend", icon: "prisma", color: "FFFFFF" },
  { name: "Firebase", group: "Backend", icon: "firebase", color: "FFCA28" },
  { name: "Cloud Functions", group: "Backend", icon: "googlecloud", color: "4285F4" },
  // Database
  { name: "Supabase", group: "Database", icon: "supabase", color: "3FCF8E" },
  { name: "PostgreSQL", group: "Database", icon: "postgresql", color: "4169E1" },
  { name: "Firestore", group: "Database", icon: "firebase", color: "FFCA28" },
  { name: "Redis", group: "Database", icon: "redis", color: "FF4438" },
  { name: "MongoDB", group: "Database", icon: "mongodb", color: "47A248" },
  // Hosting
  { name: "Vercel", group: "Hosting", icon: "vercel", color: "FFFFFF" },
  { name: "Docker", group: "Hosting", icon: "docker", color: "2496ED" },
  { name: "Cloudflare", group: "Hosting", icon: "cloudflare", color: "F38020" },
  { name: "AWS", group: "Hosting", icon: "", color: "FF9900", local: "/tech/aws.svg" },
  { name: "Railway", group: "Hosting", icon: "railway", color: "FFFFFF" },
  // Integration
  { name: "LINE OA", group: "Integration", icon: "line", color: "00C300" },
  { name: "Google Maps API", group: "Integration", icon: "googlemaps", color: "4285F4" },
  { name: "Stripe", group: "Integration", icon: "stripe", color: "635BFF" },
  { name: "Resend", group: "Integration", icon: "resend", color: "FFFFFF" },
  { name: "Sentry", group: "Integration", icon: "sentry", color: "362D59" },
  // Tools
  { name: "Cursor", group: "Tools", icon: "", color: "FFFFFF", local: "/tech/cursor.svg" },
  { name: "VS Code", group: "Tools", icon: "", color: "007ACC", local: "/tech/vscode.svg" },
  { name: "GitHub", group: "Tools", icon: "", color: "FFFFFF", local: "/tech/github.svg" },
  { name: "Kiro", group: "Tools", icon: "", color: "9046FF", local: "/tech/kiro.svg" },
  { name: "Antigravity", group: "Tools", icon: "", color: "FFE432", local: "/tech/antigravity.svg" },
  { name: "Devin", group: "Tools", icon: "", color: "21C19A", local: "/tech/devin.svg" },
  { name: "Codex", group: "Tools", icon: "", color: "FFFFFF", local: "/tech/codex.svg" },
  // AI
  { name: "OpenAI", group: "AI", icon: "", color: "FFFFFF", local: "/tech/openai.svg" },
  { name: "GPT-5.6 Sol", group: "AI", icon: "", color: "10A37F", local: "/tech/gpt.svg" },
  { name: "Opus 5", group: "AI", icon: "", color: "D97757", local: "/tech/opus.svg" },
  { name: "Fable 5", group: "AI", icon: "", color: "A78BFA", local: "/tech/fable.svg" },
  { name: "DeepSeek V4 Pro", group: "AI", icon: "", color: "4D6BFE", local: "/tech/deepseek.svg" },
  { name: "Composer 2.5", group: "AI", icon: "", color: "FFFFFF", local: "/tech/composer.svg" },
  { name: "Grok 4.6", group: "AI", icon: "", color: "FFFFFF", local: "/tech/grok.svg" },
  { name: "Gemini 3.7 Flash", group: "AI", icon: "", color: "8E75B2", local: "/tech/gemini.svg" },
];

export const TECH_GROUPS: TechGroup[] = [
  "Languages",
  "Frontend",
  "Mobile",
  "Backend",
  "Database",
  "Hosting",
  "Integration",
  "Tools",
  "AI",
];

export const GROUP_STYLE: Record<
  TechGroup,
  { title: string; accent: string; glow: string; label: string }
> = {
  Languages: {
    title: "ภาษา",
    accent: "from-rose-400 to-pink-500",
    glow: "bg-rose-400/20",
    label: "text-rose-300",
  },
  Frontend: {
    title: "Frontend",
    accent: "from-cyan-400 to-sky-500",
    glow: "bg-cyan-400/20",
    label: "text-cyan-300",
  },
  Mobile: {
    title: "Mobile",
    accent: "from-violet-400 to-purple-500",
    glow: "bg-violet-400/20",
    label: "text-violet-300",
  },
  Backend: {
    title: "Backend",
    accent: "from-amber-400 to-orange-500",
    glow: "bg-amber-400/20",
    label: "text-amber-300",
  },
  Database: {
    title: "Database",
    accent: "from-blue-400 to-indigo-500",
    glow: "bg-blue-400/20",
    label: "text-blue-300",
  },
  Hosting: {
    title: "Hosting",
    accent: "from-slate-200 to-white",
    glow: "bg-white/10",
    label: "text-slate-200",
  },
  Integration: {
    title: "Integration",
    accent: "from-emerald-400 to-green-500",
    glow: "bg-emerald-400/20",
    label: "text-emerald-300",
  },
  Tools: {
    title: "Tools",
    accent: "from-fuchsia-400 to-pink-500",
    glow: "bg-fuchsia-400/20",
    label: "text-fuchsia-300",
  },
  AI: {
    title: "AI",
    accent: "from-teal-300 to-cyan-400",
    glow: "bg-teal-400/20",
    label: "text-teal-300",
  },
};

/** Simple Icons CDN — brand SVG logos */
export function techIconUrl(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

export function techLogoSrc(item: TechItem) {
  if (item.local) return item.local;
  return techIconUrl(item.icon, item.color);
}
