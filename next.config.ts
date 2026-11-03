import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = isGithubActions && process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.replace(/.*?\//, "")}`
  : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: repo || undefined,
  assetPrefix: repo ? `${repo}/` : undefined,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
