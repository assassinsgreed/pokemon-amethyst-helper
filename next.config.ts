import type { NextConfig } from "next";

const prBasePath = process.env.NEXT_PUBLIC_PR_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: prBasePath,
  assetPrefix: prBasePath,
};

export default nextConfig;
