/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { images: { layoutRaw: true } },
  // images: {
  //   formats: ['image/avif', 'image/webp'],
  // }
};

module.exports = {
  ...nextConfig,

  webpack(config, options) {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;

    return config;
  },
};
