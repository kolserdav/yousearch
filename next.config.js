/* eslint-disable no-undef */
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
    JWT_SECRET: '8fTnhRkPcbKGoEkP4',
  },
};
