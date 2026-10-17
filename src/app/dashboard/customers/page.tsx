"use client";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Badge, Button, Card, Input } from "@/components/ui";
import { customers, plans, statuses } from "@/lib/data";
import { cn, usd } from "@/lib/cn";

type SortKey = "company" | "mrr" | "seats" | "joined";
export default function Customers() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [plan, setPlan] = useState<string>("All");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "mrr", dir: -1 });
  const [page, setPage] = useState(0);
  const per = 10;

  const rows = useMemo(() => {
    const t = q.toLowerCase();
    return customers
      .filter((c) => (status === "All" || c.status === status) && (plan === "All" || c.plan === plan))
      .filter((c) => !t || [c.name, c.company, c.email, c.id].some((v) => v.toLowerCase().includes(t)))
      .sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : -1) * sort.dir);
  }, [q, status, plan, sort]);
  const pages = Math.max(1, Math.ceil(rows.length / per));
  const view = rows.slice(page * per, page * per + per);
  const total = rows.reduce((s, c) => s + c.mrr, 0);
  const th = (key: SortKey, label: string, right = false) => (
    <th className={cn("px-4 py-3 font-medium", right && "text-right")}>
      <button onClick={() => setSort((s) => ({ key, dir: s.key === key ? (s.dir === 1 ? -1 : 1) : -1 }))} className="inline-flex items-center gap-1 uppercase hover:text-zinc-900 dark:hover:text-zinc-100">
        {label}{sort.key === key && <span>{sort.dir === 1 ? "↑" : "↓"}</span>}
      </button>
    </th>
  );
  const sel = "h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-950";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{rows.length} accounts · {usd(total)} MRR in current view</p>
        </div>
        <Button><Plus size={16} /> Add customer</Button>
      </div>
      <Card className="overflow-hidden">
        <div className="flex flex-wrap gap-3 border-b border-zinc-100 p-4 dark:border-zinc-800">
          <Input placeholder="Search by name, company, email or ID…" value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} className="max-w-sm" />
          <select aria-label="Status" className={sel} value={status} onChange={(e) => { setStatus(e.target.value); setPage(0); }}>
            <option>All</option>{statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select aria-label="Plan" className={sel} value={plan} onChange={(e) => { setPlan(e.target.value); setPage(0); }}>
            <option>All</option>{plans.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-900/60">
              <tr>{th("company", "Customer")}<th className="px-4 font-medium">Plan</th><th className="px-4 font-medium">Status</th>{th("seats", "Seats", true)}{th("mrr", "MRR", true)}<th className="px-4 font-medium">Country</th>{th("joined", "Joined")}</tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {view.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">{c.name.split(" ").map((p) => p[0]).join("")}</div>
                      <div><div className="font-medium">{c.company}</div><div className="text-xs text-zinc-500">{c.email}</div></div>
                    </div>
                  </td>
                  <td className="px-4">{c.plan}</td>
                  <td className="px-4"><Badge>{c.status}</Badge></td>
                  <td className="px-4 text-right tabular-nums">{c.seats}</td>
                  <td className="px-4 text-right font-mono tabular-nums">{usd(c.mrr)}</td>
                  <td className="px-4 text-zinc-500">{c.country}</td>
                  <td className="px-4 text-zinc-500">{c.joined}</td>
                </tr>
              ))}
              {!view.length && <tr><td colSpan={7} className="p-10 text-center text-zinc-500">No customers match these filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3 text-sm text-zinc-500 dark:border-zinc-800">
          <span>Page {page + 1} of {pages}</span>
          <div className="flex gap-2">
            <Button variant="outline" aria-label="Previous page" disabled={page === 0} onClick={() => setPage((p) => p - 1)}><ChevronLeft size={16} /></Button>
            <Button variant="outline" aria-label="Next page" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}><ChevronRight size={16} /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
