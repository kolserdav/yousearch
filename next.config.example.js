/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const WorkerPlugin = require('worker-plugin');
module.exports = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  serverRuntimeConfig: {
    // backend environment variables
    PROJECT_ROOT: __dirname,
    MIN_PASSWORD_LENGTH: 6,
    HASH_SALT_LENGTH: 10,
    LINK_EXPIRE: 3,
    APP_ORIGIN: 'https://next.uyem.ru',
    APP_ORIGIN_LOCAL: 'http://localhost:3000',
    API_URL: 'https://www.googleapis.com/youtube/v3',
    // TODO settings required
    JWT_SECRET: 'any secret phrase',
    API_KEY: 'You (YouTube Data API v3) key',
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: 587,
    SMTP_EMAIL: 'example@gmail.com',
    SMTP_PASS: 'strongpass',
    GOOGLE_CLIENT_ID: 'Your OAUTH2 client id',
    GOOGLE_CLIENT_SECRET: 'Your OAUTH2 client secret',
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
