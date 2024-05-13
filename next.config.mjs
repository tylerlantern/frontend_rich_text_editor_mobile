import CopyPlugin from 'copy-webpack-plugin';
/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
  webpack: (config) => {
    return config
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

export default nextConfig;
