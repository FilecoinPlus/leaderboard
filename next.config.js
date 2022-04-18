/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  ...nextConfig,
  lessVarsFilePath: './styles/variables.less',
  // modifyVars: { '@primary-color': '#04f' },
  // lessVarsFilePathAppendToEndOfContent: true,
  // cssLoaderOptions: {},

  webpack(config) {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
});
