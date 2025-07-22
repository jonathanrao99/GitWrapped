/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
      unoptimized: false,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      optimizeCss: true,
    },
    output: 'standalone',
  };
  
  export default nextConfig;
  