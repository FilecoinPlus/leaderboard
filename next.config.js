/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({...nextConfig,
  // modifyVars: { '@primary-color': '#04f' },
  lessVarsFilePath: './styles/variables.less',
  // lessVarsFilePathAppendToEndOfContent: true,
  // cssLoaderOptions: {},

  webpack(config) {
    return config;
  },
});
