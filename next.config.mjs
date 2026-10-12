/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // One address for Google: send www to the main domain (path and query, including gclid, are kept).
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.fizbusinessolutions.com' }],
        destination: 'https://fizbusinessolutions.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
};

export default nextConfig;
