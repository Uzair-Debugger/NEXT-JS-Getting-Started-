import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // config options here 
  reactCompiler: true,
  experimental: { 
    /* 
     turbopack file system caching which allows for significant faster compile time across restarts. 
     All internal vercel app already using this feature. 
  */
    turbopackFileSystemCacheForDev: true,
  }

};

export default nextConfig;
