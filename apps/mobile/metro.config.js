const path = require('path');
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');
const config = getDefaultConfig(projectRoot);

const monorepoPackages = {
  '@repo/types': path.resolve(monorepoRoot, 'packages/types'),
  '@repo/ui': path.resolve(monorepoRoot, 'packages/ui'),
};

config.watchFolders = [projectRoot, ...Object.values(monorepoPackages)];
config.resolver.extraNodeModules = monorepoPackages;
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];
config.resolver.sourceExts.push("sql");
config.transformer.minifierConfig = {
  compress: {
    drop_console: ["log", "info"],
  },
};


module.exports = withNativeWind(config, { input: "./src/styles/global.css" });
