import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  basePath: "/emoji-dance-party",
  assetPrefix: "/emoji-dance-party/",
};

export default nextConfig;

