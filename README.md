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
    LINK_EXPIRE: 3,
    API_URL: 'https://www.googleapis.com/youtube/v3',
    JWT_SECRET: 'any secret phrase',
    API_KEY: 'You google api key',
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: 587,
    SMTP_EMAIL: 'example@gmail.com',
    SMTP_PASS: 'strongpass',
  },
};

```

### Deployment

`yarn deploy`


Demo: https://next.uyem.ru