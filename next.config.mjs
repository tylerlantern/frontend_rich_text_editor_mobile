import CopyPlugin from 'copy-webpack-plugin';
/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
  async headers() {
    const origin = process.env.NEXT_PUBLIC_BASE_URL
    return [
      {
        source: "/v1/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: origin },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  webpack: (config) => {
    return config
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

export default nextConfig;
