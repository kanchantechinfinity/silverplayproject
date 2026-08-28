import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/shopifyLoader.ts",
  },
};

export default nextConfig;
