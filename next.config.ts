import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.38",
    "192.168.0.200",
    "10.190.244.22",
    "scrounger-crazily-unwatched.ngrok-free.dev",
  ],
  async redirects() {
    return [
      { source: "/research/cyberbench", destination: "/research/cyberlatch", permanent: true },
      { source: "/research/animation-bench", destination: "/research/animation", permanent: true },
    ];
  },
};

export default nextConfig;
