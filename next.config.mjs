import CopyPlugin from 'copy-webpack-plugin';
/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
  webpack: (config) => {
    // append the CopyPlugin to copy the file to your public dir
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: "node_modules/froala-editor", to: "../public/froala-editor" },
        ],
      }),
    )
    // Important: return the modified config
    return config
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

export default nextConfig;
