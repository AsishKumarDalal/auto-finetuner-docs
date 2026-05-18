import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Automatically apply sub-path prefix only in production (GitHub Pages)
  // to avoid breaking the local development server at http://localhost:3000
  basePath: process.env.NODE_ENV === "production" ? "/auto-finetuner-docs" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/auto-finetuner-docs" : "",
};

export default nextConfig;
