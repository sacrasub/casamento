import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/casamento", // Subdiretório no GitHub Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
