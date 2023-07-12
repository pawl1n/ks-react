/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/admin",
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        basePath: false,
        permanent: false,
      },
    ];
  },
  images: {
    unoptimized: false,
    remotePatterns: [],
  },

  transpilePackages: ['shared'],
};

export default nextConfig;
