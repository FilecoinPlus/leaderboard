/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { images: { layoutRaw: true } },
  // images: {
  //   formats: ['image/avif', 'image/webp'],
  // }
};
// const aliyunTheme = require('@ant-design/aliyun-theme');
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  ...nextConfig,
  lessVarsFilePath: './styles/variables.less',
  // lessVarsFilePathAppendToEndOfContent: true,
  // cssLoaderOptions: {},
  // modifyVars: aliyunTheme,

  webpack(config, options) {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;

    return config;
  },
});
