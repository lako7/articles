/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '', // You can omit this if not needed
            },
        ],
    },
};

export default nextConfig;
