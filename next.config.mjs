import { createMDX } from "fumadocs-mdx/next";

const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
};

const withMDX = createMDX();

export default withMDX(nextConfig);
