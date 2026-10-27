/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'www.foxal.in',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/products',
        destination: '/shop',
      },
    ];
  },
};

export default nextConfig;
