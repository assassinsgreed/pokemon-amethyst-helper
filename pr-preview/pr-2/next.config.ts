import type { NextConfig } from "next";

const prBasePath = process.env.PR_PREVIEW_PATH ? `/${process.env.PR_PREVIEW_PATH}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: prBasePath,
  assetPrefix: prBasePath,
};

export default nextConfig;
