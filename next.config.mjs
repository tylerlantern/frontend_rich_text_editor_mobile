/** @type {import('next').NextConfig} */

import CopyPlugin from 'copy-webpack-plugin';

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
  }
}

console.log('nextConfig', nextConfig)
// const nextConfig = {}

export default nextConfig;
