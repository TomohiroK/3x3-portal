

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '3x3exe.com' },
      { protocol: 'https', hostname: '*.3x3exe.com' },
      { protocol: 'https', hostname: '*.vercel.app' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Security headers are managed in vercel.json to avoid duplication
};

export default nextConfig;
