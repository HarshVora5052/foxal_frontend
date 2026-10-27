/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
      {
        protocol: 'http',
        hostname: 'foxal.gamer.free',
      },
      {
        protocol: 'https',
        hostname: 'foxal.gamer.free',
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
