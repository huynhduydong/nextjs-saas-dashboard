import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Badge, Button, Card, CardHeader } from "@/components/ui";
import { ChannelChart, RevenueChart, SignupChart } from "@/components/charts";
import { activity, customers, kpis } from "@/lib/data";
import { cn, usd } from "@/lib/cn";

export default function Overview() {
  const top = [...customers].sort((a, b) => b.mrr - a.mrr).slice(0, 6);
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Good evening, Jordan</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Here&apos;s how your business performed over the last 12 months.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-zinc-200 bg-white p-0.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">
            {["7d", "30d", "12m"].map((p) => <span key={p} className={cn("rounded-md px-3 py-1.5", p === "12m" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-500")}>{p}</span>)}
          </div>
          <Button variant="outline"><Download size={15} /> Export</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((x) => {
          const good = x.invert ? x.delta < 0 : x.delta > 0;
          return (
            <Card key={x.label} className="p-5">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{x.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{x.value}</p>
              <p className="mt-2 flex items-center gap-1 text-xs">
                <span className={cn("inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium", good ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400")}>
                  {x.delta > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{Math.abs(x.delta)}%
                </span>
                <span className="text-zinc-400">{x.hint}</span>
              </p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Revenue vs. expenses" subtitle="Monthly, USD" right={<span className="text-sm font-semibold text-emerald-600">+68% YoY</span>} />
          <div className="p-3 pt-4"><RevenueChart /></div>
        </Card>
        <Card>
          <CardHeader title="Acquisition channels" subtitle="Share of new subscribers" />
          <div className="p-5"><ChannelChart /></div>
          <div className="mx-5 mb-5 rounded-lg bg-zinc-50 p-3 text-xs text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400">Organic grew <b className="text-zinc-900 dark:text-zinc-100">+9 pts</b> after the SEO content push in Q3.</div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader title="Trial conversion" subtitle="Last 6 months" />
          <div className="p-3 pt-4"><SignupChart /></div>
        </Card>
        <Card className="xl:col-span-2 overflow-hidden">
          <CardHeader title="Top accounts" subtitle="By monthly recurring revenue" right={<Link href="/dashboard/customers" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">View all</Link>} />
          <table className="mt-4 w-full text-sm">
            <thead className="border-y border-zinc-100 bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60">
              <tr><th className="px-5 py-2.5 font-medium">Customer</th><th className="px-3 font-medium">Plan</th><th className="px-3 font-medium">Status</th><th className="px-5 text-right font-medium">MRR</th></tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {top.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="px-5 py-3"><div className="font-medium">{c.company}</div><div className="text-xs text-zinc-500">{c.name}</div></td>
                  <td className="px-3">{c.plan}</td>
                  <td className="px-3"><Badge>{c.status}</Badge></td>
                  <td className="px-5 text-right font-mono tabular-nums">{usd(c.mrr)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent activity" subtitle="Subscription events across all workspaces" />
        <ul className="grid gap-x-8 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {activity.map((a) => (
            <li key={a.who + a.what} className="flex items-start gap-3 py-2.5">
              <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", a.tone === "up" ? "bg-emerald-500" : a.tone === "down" ? "bg-red-500" : "bg-sky-500")} />
              <div className="text-sm"><b className="font-medium">{a.who}</b> <span className="text-zinc-500 dark:text-zinc-400">{a.what}</span><div className="text-xs text-zinc-400">{a.when}</div></div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
