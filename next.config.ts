import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Prevent ESLint errors from failing production builds (useful to unblock deploys)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
