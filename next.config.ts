import type { NextConfig } from "next";
// Static export so the demo can be hosted on GitHub Pages. BASE_PATH is set in CI (e.g. "/nextjs-saas-dashboard").
const basePath = process.env.BASE_PATH || "";
const nextConfig: NextConfig = { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } };
export default nextConfig;
