/**
 * Any methods
 */
import jwt from 'jsonwebtoken';
import getConfig from 'next/config';
import * as Types from '../../next-env';
const { serverRuntimeConfig } = getConfig();
const { JWT_SECRET } = serverRuntimeConfig;

interface GetParsedToken {
  // eslint-disable-next-line no-unused-vars
  (data: Types.Orm.User, headers: any): string;
}

/**
 * Get JWT token from user data
 * @param data {Types.Orm.User}
 * @param headers {any}
 */
export const getParsedToken: GetParsedToken = (data, headers) => {
  const { email, password, id } = data;
  const parsedToken: Types.ParsedToken = {
    id,
    email,
    password,
    userAgent: headers['user-agent'],
  };
  return jwt.sign(parsedToken, JWT_SECRET);
};

interface ParseToken {
  // eslint-disable-next-line no-unused-vars
  (token: string): Types.ParsedToken | null;
}
/**
 * Get parsed token from jwt
 * @param token {string} jwt token
 */
export const parseToken: ParseToken = (token) => {
  let parsed = null;
  try {
    parsed = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    console.log(`<${Date()}> (ERROR_PARSE_TOKEN)`, token);
  }
  return parsed;
};
