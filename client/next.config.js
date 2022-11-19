/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false, // To disable automatically opening the report in your default browser, set openAnalyzer to false.
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["."],
  },
  poweredByHeader: false,
  images: {
    domains: ["lh3.googleusercontent.com", "randomuser.me"],
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/base-api/:path*",
          destination: `${process.env.API_BASE_URL}/api/v1/:path*`,
        },
      ],
      fallback: [
        {
          source: "/base-api/:path*",
          destination: `${process.env.API_BASE_URL}/api/v1/:path*`,
        },
      ],
    };
  },
};

module.exports = withBundleAnalyzer(nextConfig);
