/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Get lang values
 * @param locale - current locale
 */
export const getLang = (locale: LanguageValue): Language => {
  const loc = locale ? locale : 'en';
  return require(`../locales/${loc}/lang`).default;
};

/**
 * Check string that is email
 * @param email target email
 */
export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
