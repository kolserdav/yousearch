import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * Set session cookie _qt method
 * @param token {string}
 */
export const setSessionCookie = (token: string): void => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  cookies.set('_qt', token, { expires: date, sameSite: 'strict' });
};
