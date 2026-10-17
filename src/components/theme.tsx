"use client";
import { ThemeProvider as P, useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <P attribute="class" defaultTheme="light" enableSystem={false}>{children}</P>;
}
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  const dark = m && resolvedTheme === "dark";
  return (
    <button aria-label="Toggle theme" onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
