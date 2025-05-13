import type { NextConfig } from "next";

// Use the PR preview base path if set (for preview.yml), otherwise default to root
const prBasePath = process.env.NEXT_PUBLIC_PR_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: prBasePath,
  assetPrefix: prBasePath,
  images: {
    unoptimized: true, // Required for static export
  },
  // No need for custom rewrites or redirects for static export
};

export default nextConfig;
