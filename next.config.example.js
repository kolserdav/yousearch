/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const WorkerPlugin = require('worker-plugin');
module.exports = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  serverRuntimeConfig: {
    // backend environment variables
    PROJECT_ROOT: __dirname,
    MIN_PASSWORD_LENGTH: 6,
    HASH_SALT_LENGTH: 10,
    JWT_SECRET: 'any secret phrase',
    API_KEY: 'You (YouTube Data API v3) key',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new WorkerPlugin({
          // use "self" as the global object when receiving hot updates.
          globalObject: 'self',
        })
      );
    }
    return config;
  },
};
