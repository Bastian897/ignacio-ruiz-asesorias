import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  agentRules: false,
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/guia-7-senales.html", destination: "/guia-7-senales", permanent: true },
      { source: "/terminos.html", destination: "/terminos", permanent: true },
    ];
  },
};

export default nextConfig;
