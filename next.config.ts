// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   cacheComponents:true,
//   reactCompiler: true,
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,

  allowedDevOrigins: [
    "outburst-grouped-dimple.ngrok-free.dev",
  ],
};

export default nextConfig;