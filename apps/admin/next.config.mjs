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
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com',
            },
        ],
    },

    transpilePackages: ['shared'],
};

export default nextConfig;
