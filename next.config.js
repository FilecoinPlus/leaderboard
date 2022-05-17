// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const withLess = require('next-with-less');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { images: { layoutRaw: true } },
  // images: {
  //   formats: ['image/avif', 'image/webp'],
  // }
};

module.exports = withLess({
  ...nextConfig,

  lessLoaderOptions: {
    /* ... */
    lessOptions: {
      /* ... */
      modifyVars: {
        // 'primary-color': '#9900FF',
        // 'border-radius-base': '2px',
        /* ... */
      },
    },
  },

  webpack(config, options) {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;

    // config.module.rules.push(
    //   {
    //     test: /\.(css)$/,
    //     use: [MiniCssExtractPlugin.loader, 'css-loader'],
    //   },
    //   {
    //     test: /\.(less)$/,
    //     use: [
    //       MiniCssExtractPlugin.loader,
    //       'css-loader',
    //       {
    //         loader: 'less-loader',
    //         options: {
    //           lessOptions: {
    //             javascriptEnabled: true,
    //             math: 'always',
    //           },
    //         },
    //       },
    //     ],
    //   },
    // );

    // config.plugins.push(
    //   new MiniCssExtractPlugin({
    //     filename: 'static/[name].css',
    //   }),
    // );

    return config;
  },
});
