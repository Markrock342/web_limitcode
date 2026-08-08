"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BLUE = "#2563EB";
const SKY = "#38BDF8";
const NAVY = "#0E1A34";
const GREEN = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const VIOLET = "#8B5CF6";

export const CHART_COLORS = [BLUE, SKY, GREEN, AMBER, VIOLET, RED, NAVY];

const compact = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `${(v / 1_000).toFixed(0)}K` : `${v}`;

const tooltipFmt = (v: unknown) =>
  `฿${Number(v ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const axisStyle = { fontSize: 11, fill: "#64748B" };

/** รายได้ + กำไรขั้นต้นรายเดือน */
export function RevenueChart({ data }: { data: { month: string; revenue: number; gp: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis tickFormatter={compact} tick={axisStyle} tickLine={false} axisLine={false} width={44} />
        <Tooltip formatter={tooltipFmt} contentStyle={{ fontSize: 12, borderRadius: 10 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="revenue" name="ยอดขาย" fill={BLUE} radius={[4, 4, 0, 0]} maxBarSize={26} />
        <Line dataKey="gp" name="กำไรขั้นต้น" stroke={GREEN} strokeWidth={2.5} dot={false} type="monotone" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

/** โดนัท — สัดส่วน */
export function DonutChart({ data, height = 230 }: { data: { name: string; value: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="82%" paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={tooltipFmt} contentStyle={{ fontSize: 12, borderRadius: 10 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

/** แท่งแนวนอน — ยอดขายตามพนักงานขาย ฯลฯ */
export function HBarChart({ data, height = 200 }: { data: { name: string; value: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
        <XAxis type="number" tickFormatter={compact} tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="name" tick={axisStyle} width={86} tickLine={false} axisLine={false} />
        <Tooltip formatter={tooltipFmt} contentStyle={{ fontSize: 12, borderRadius: 10 }} />
        <Bar dataKey="value" fill={BLUE} radius={[0, 4, 4, 0]} maxBarSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** ซื้อจีน vs ไทย */
export function PurchaseSplitChart({
  data,
}: {
  data: { month: string; china: number; thailand: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis tickFormatter={compact} tick={axisStyle} tickLine={false} axisLine={false} width={44} />
        <Tooltip formatter={tooltipFmt} contentStyle={{ fontSize: 12, borderRadius: 10 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="china" name="นำเข้าจีน" stackId="a" fill={NAVY} radius={[0, 0, 0, 0]} maxBarSize={26} />
        <Bar dataKey="thailand" name="ซื้อในไทย" stackId="a" fill={SKY} radius={[4, 4, 0, 0]} maxBarSize={26} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** AR/AP Aging */
export function AgingChart({ data, height = 210 }: { data: { bucket: string; amount: number }[]; height?: number }) {
  const colors = [GREEN, SKY, AMBER, "#F97316", RED];
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey="bucket" tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis tickFormatter={compact} tick={axisStyle} tickLine={false} axisLine={false} width={44} />
        <Tooltip formatter={tooltipFmt} contentStyle={{ fontSize: 12, borderRadius: 10 }} />
        <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={38}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/** พื้นที่เล็ก ๆ สำหรับ mini trend */
export function MiniArea({ data, color = BLUE }: { data: { v: number }[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={54}>
      <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`mini-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area dataKey="v" stroke={color} strokeWidth={2} fill={`url(#mini-${color})`} type="monotone" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
