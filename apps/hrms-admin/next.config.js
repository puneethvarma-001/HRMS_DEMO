/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hrms/design-system', '@hrms/rbac-engine', '@hrms/api-client', '@hrms/utils'],
  experimental: {
    // Enable Partial Prerendering
    ppr: true,
  },
};

module.exports = nextConfig;
