/**
 * Any methods
 */
import jwt from 'jsonwebtoken';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { JWT_SECRET } = serverRuntimeConfig;

interface GetParsedToken {
  // eslint-disable-next-line no-unused-vars
  (id: number): string;
}

/**
 * Get JWT token from user data
 * @param data {Orm.User}
 * @param headers {any}
 */
export const getParsedToken: GetParsedToken = (id) => {
  const parsedToken: ParsedToken = {
    id,
  };
  return jwt.sign(parsedToken, JWT_SECRET);
};

interface ParseToken {
  // eslint-disable-next-line no-unused-vars
  (token: string): ParsedToken | null;
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

/**
 *  Encode base64 string
 * @param data {string}
 */
export function encodeBase64(data: string): string {
  return Buffer.from(data).toString('base64');
}

/**
 * Decode base64 string
 * @param data
 */
export function decodeBase64(data: string): string {
  const buff = Buffer.alloc(data.length, data, 'base64');
  return buff.toString('ascii');
}

/**
 * Capitalize first letter
 * @param string {string}
 */
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
