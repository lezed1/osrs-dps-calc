/** @type {import('next').NextConfig} */
const shouldAnalyse = process.env.ANALYSE === 'true';

let nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['runescape.wiki', 'oldschool.runescape.wiki'],
  },
  transpilePackages: [
    'd3',
    'd3-array',
    'internmap'
  ],
}

if (process.env.NEXT_PUBLIC_BASE_PATH) {
  nextConfig.basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  nextConfig.redirects = async () => [
    {
      source: '/',
      destination: process.env.NEXT_PUBLIC_BASE_PATH,
      basePath: false,
      permanent: true,
    },
  ];
}

if (shouldAnalyse) {
  const withNextBundleAnalyzer = require('@next/bundle-analyzer')();
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = nextConfig
