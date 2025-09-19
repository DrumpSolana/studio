
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: [
      "https://5000-firebase-studio-1752612745899.cluster-hf4yr35cmnbd4vhbxvfvc6cp5q.cloudworkstations.dev",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752640504/Drump_Cheese_Ball_4_daedqc.png',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
