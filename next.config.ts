import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
