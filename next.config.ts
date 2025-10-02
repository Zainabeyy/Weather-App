import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA= withPWAInit({
  dest:'public',
  register:true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagsapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
// export default nextConfig;

export default withPWA(nextConfig);
