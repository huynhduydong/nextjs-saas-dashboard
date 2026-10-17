"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const r = useRouter();
  useEffect(() => { r.replace(document.cookie.includes("pulse_demo_session=1") ? "/dashboard" : "/login"); }, [r]);
  return null;
}
