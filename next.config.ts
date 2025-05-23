import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  experimental: {
    ppr: true,
  },
  pageExtensions: [
    "page.tsx",
    "page.ts",
    // FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
    // Instead, use `not-found.ts` as a workaround
    // "ts" is required to resolve `not-found.ts`
    "ts"
  ],
};

export default nextConfig;
