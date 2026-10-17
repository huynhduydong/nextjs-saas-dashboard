"use client";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "next-themes";
import { channels, revenueSeries, signupSeries } from "@/lib/data";

function useColors() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return { grid: dark ? "#27272a" : "#f4f4f5", axis: dark ? "#71717a" : "#a1a1aa", tipBg: dark ? "#18181b" : "#ffffff", tipBorder: dark ? "#3f3f46" : "#e4e4e7" };
}
const k = (v: number) => `$${Math.round(v / 1000)}k`;

export function RevenueChart() {
  const c = useColors();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={revenueSeries} margin={{ left: -8, right: 8, top: 10 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
          <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f472b6" stopOpacity={0.25} /><stop offset="100%" stopColor="#f472b6" stopOpacity={0} /></linearGradient>
        </defs>
        <CartesianGrid stroke={c.grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: c.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={k} tick={{ fill: c.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} contentStyle={{ background: c.tipBg, border: `1px solid ${c.tipBorder}`, borderRadius: 10, fontSize: 12 }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#rev)" />
        <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f472b6" strokeWidth={2} fill="url(#exp)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SignupChart() {
  const c = useColors();
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={signupSeries.slice(-6)} margin={{ left: -16, right: 8, top: 10 }} barGap={4}>
        <CartesianGrid stroke={c.grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: c.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: c.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: c.grid }} contentStyle={{ background: c.tipBg, border: `1px solid ${c.tipBorder}`, borderRadius: 10, fontSize: 12 }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="trials" name="Trials" fill="#a5b4fc" radius={[6, 6, 0, 0]} />
        <Bar dataKey="paid" name="Converted" fill="#4f46e5" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ChannelChart() {
  const c = useColors();
  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width="55%" height={220}>
        <PieChart>
          <Pie data={channels} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={3} stroke="none">
            {channels.map((x) => <Cell key={x.name} fill={x.color} />)}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: c.tipBg, border: `1px solid ${c.tipBorder}`, borderRadius: 10, fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="flex-1 space-y-3">
        {channels.map((x) => (
          <li key={x.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300"><span className="h-2.5 w-2.5 rounded-full" style={{ background: x.color }} />{x.name}</span>
            <span className="font-semibold">{x.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
