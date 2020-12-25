### Requirements

```
node.js v^12.19.0
yarn v^1.22.10
```

### Instalation

```
git clone https://github.com/kolserdav/nextjs-graphql my-dir
cd my-dir
yarn install
```

Then setup file next.config.js
```javascript
  module.exports = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
    MIN_PASSWORD_LENGTH: 6,
    HASH_SALT_LENGTH: 10,
    JWT_SECRET: 'any secret phrase', // here
    API_KEY: 'You google api key', // and here
  },
};

```


Demo: https://next.uyem.ru