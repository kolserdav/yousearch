/* eslint-disable @typescript-eslint/no-var-requires */
import { Language, LanguageValue } from '../next-env';

/**
 * Get lang values
 * @param locale - current locale
 */
export const getLang = (locale: LanguageValue): Language => {
  return require(`../locales/${locale}/lang`).default;
};
