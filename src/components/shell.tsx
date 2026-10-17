"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarChart3, Bell, CreditCard, LayoutDashboard, LogOut, Search, Settings, Users } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "#", label: "Reports", icon: BarChart3 },
  { href: "#", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const r = useRouter();
  // Demo-only "auth": a cookie set by the login form. Not real authentication.
  useEffect(() => { if (!document.cookie.includes("pulse_demo_session=1")) r.replace("/login"); }, [r]);
  const active = (href: string) => href === path || href + "/" === path;
  const logout = () => { document.cookie = "pulse_demo_session=; path=/; max-age=0"; r.push("/login"); };
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-zinc-200 bg-white px-3 py-5 dark:border-zinc-800 dark:bg-zinc-900 md:flex">
        <div className="px-2"><Logo /></div>
        <nav className="mt-8 space-y-1">
          {nav.map(({ href, label, icon: I }) => {
            const isActive = active(href);
            return (
              <Link key={label} href={href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300" : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800")}>
                <I size={17} /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-4 text-white">
          <p className="text-sm font-semibold">Upgrade to Scale</p>
          <p className="mt-1 text-xs text-white/80">Unlock cohorts, forecasts and SSO.</p>
          <button className="mt-3 w-full rounded-md bg-white/20 py-1.5 text-xs font-medium hover:bg-white/30">See plans</button>
        </div>
        <button onClick={logout} className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><LogOut size={16} /> Sign out</button>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-zinc-200 bg-white/80 px-6 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input placeholder="Search customers, invoices, reports…" className="h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-950" />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-zinc-200 px-1.5 text-[10px] text-zinc-400 dark:border-zinc-700">⌘K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 sm:inline">Demo data</span>
            <button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"><Bell size={16} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" /></button>
            <ThemeToggle />
            <div className="ml-2 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-pink-500 text-sm font-semibold text-white">JD</div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
