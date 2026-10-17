import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = { title: "Pulse — SaaS Analytics Dashboard (demo)", description: "Portfolio demo: SaaS analytics dashboard built with Next.js, TypeScript, Tailwind and Recharts." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
