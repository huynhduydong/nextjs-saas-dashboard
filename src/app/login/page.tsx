"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme";
import { GitBranch, Loader2 } from "lucide-react";

export default function Login() {
  const r = useRouter();
  const [email, setEmail] = useState("demo@pulse.example");
  const [pw, setPw] = useState("demo1234");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter a valid email address.");
    if (pw.length < 6) return setErr("Password must be at least 6 characters.");
    setErr(""); setLoading(true);
    document.cookie = "pulse_demo_session=1; path=/; max-age=86400";
    setTimeout(() => r.push("/dashboard"), 500);
  }
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="relative flex items-center gap-2 text-lg font-semibold"><span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">◎</span> Pulse</div>
        <div className="relative max-w-md">
          <h2 className="text-4xl font-semibold leading-tight">Every SaaS metric that matters, in one calm dashboard.</h2>
          <p className="mt-4 text-white/80">MRR, churn, cohorts and customer health — updated in real time, ready for your next board meeting.</p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[["$98k", "MRR"], ["4.8k", "Subscribers"], ["2.3%", "Churn"]].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-white/10 p-4 backdrop-blur"><div className="text-2xl font-semibold">{v}</div><div className="text-xs text-white/70">{l}</div></div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-white/60">Portfolio demo · all data is synthetic</p>
      </div>
      <div className="flex flex-col p-6 sm:p-12">
        <div className="flex items-center justify-between"><div className="lg:invisible"><Logo /></div><ThemeToggle /></div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Sign in to your workspace. Demo credentials are pre-filled.</p>
          <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
            <label className="block space-y-1.5"><span className="text-sm font-medium">Email</span><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label className="block space-y-1.5">
              <span className="flex justify-between text-sm font-medium">Password <a className="font-normal text-indigo-600 hover:underline dark:text-indigo-400" href="#">Forgot?</a></span>
              <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
            </label>
            {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
            <Button type="submit" className="h-10 w-full" disabled={loading}>{loading && <Loader2 className="animate-spin" size={16} />} Sign in</Button>
            <div className="relative py-2 text-center text-xs text-zinc-400"><span className="relative z-10 bg-zinc-50 px-2 dark:bg-zinc-950">or continue with</span><div className="absolute inset-x-0 top-1/2 border-t border-zinc-200 dark:border-zinc-800" /></div>
            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" onClick={submit}><GitBranch size={16} /> GitHub</Button>
              <Button type="button" variant="outline" onClick={submit}><span className="font-bold text-indigo-500">G</span> Google</Button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-zinc-500">No account? <a href="#" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">Start a 14-day trial</a></p>
        </div>
      </div>
    </div>
  );
}
