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
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    trailingSlash: false,
    generateEtags: false,
  };
  
  export default nextConfig;
  