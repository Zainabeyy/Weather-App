// types/next-pwa.d.ts
declare module "next-pwa" {
  import { NextConfig } from "next";

  export interface PWAOptions {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: string[];
    [key: string]: unknown;
  }

  type NextPWA = (options?: PWAOptions) => (config: NextConfig) => NextConfig;

  const nextPWA: NextPWA;
  export default nextPWA;
}
