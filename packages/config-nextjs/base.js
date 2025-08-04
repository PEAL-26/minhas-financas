const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
const config = async (phase) => {
  
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
  
    if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
      const withSerwist = (await import("@serwist/next")).default({
        swSrc: "src/workers/sw.ts",
        swDest: "public/sw.js",
      });
      return  withSerwist(config)
    }
  
    return  config ;
  
}

module.exports = { config };
