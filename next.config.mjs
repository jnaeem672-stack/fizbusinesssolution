/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // English and Arabic pages have separate root layouts (correct lang and dir in the first HTML),
  // so addresses that match no route use app/global-not-found.tsx.
  experimental: {
    globalNotFound: true,
  },
  // One address for Google: send www to the main domain (path and query, including gclid, are kept).
  async redirects() {
    return [
      // City pages merged into the country pages on 21 Oct 2026 (thin pages with almost no searches)
      { source: '/assignment-help-coventry', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-cardiff', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-derby', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-edinburgh', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-hull', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-leicester', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-middlesbrough', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-newcastle', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-northampton', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-nottingham', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-oxford', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-portsmouth', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-sheffield', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-southampton', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-sunderland', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-wolverhampton', destination: '/assignment-help-uk', permanent: true },
      { source: '/assignment-help-abha', destination: '/assignment-help-saudi-arabia', permanent: true },
      { source: '/assignment-help-madinah', destination: '/assignment-help-saudi-arabia', permanent: true },
      { source: '/assignment-help-qassim', destination: '/assignment-help-saudi-arabia', permanent: true },
      { source: '/assignment-help-tabuk', destination: '/assignment-help-saudi-arabia', permanent: true },
      { source: '/assignment-help-taif', destination: '/assignment-help-saudi-arabia', permanent: true },
      { source: '/assignment-help-abu-dhabi', destination: '/assignment-help-uae', permanent: true },
      { source: '/ar/assignment-help-abha', destination: '/ar/assignment-help-saudi-arabia', permanent: true },
      { source: '/ar/assignment-help-madinah', destination: '/ar/assignment-help-saudi-arabia', permanent: true },
      { source: '/ar/assignment-help-qassim', destination: '/ar/assignment-help-saudi-arabia', permanent: true },
      { source: '/ar/assignment-help-tabuk', destination: '/ar/assignment-help-saudi-arabia', permanent: true },
      { source: '/ar/assignment-help-taif', destination: '/ar/assignment-help-saudi-arabia', permanent: true },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.fizbusinessolutions.com' }],
        destination: 'https://fizbusinessolutions.com/:path*',
        permanent: true,
      },
      // Same rule when the hosting proxy passes the visitor's address in X-Forwarded-Host
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-host', value: 'www.fizbusinessolutions.com' }],
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
