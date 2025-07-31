/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["@repo/ui", "undici"],
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = {
  config,
};
