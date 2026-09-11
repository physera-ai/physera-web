import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.38", "192.168.0.200", "10.190.244.22"],
  async redirects() {
    return [
      { source: "/thesis", destination: "/manifesto", permanent: true },
      { source: "/research/cyberbench", destination: "/research/cyberlatch", permanent: true },
    ];
  },
};

export default nextConfig;
