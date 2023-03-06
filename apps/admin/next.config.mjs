/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  // basePath: "/admin",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/dashboard',
          basePath: false,
          permanent: false
      }
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
    ],
  },
}

export default nextConfig