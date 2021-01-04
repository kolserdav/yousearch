import transporter from './transporter';
import * as Types from '../../next-env';
import * as lib from '../lib';
import getConfig from 'next/config';
import t from '../../locales/en/lang';
const { serverRuntimeConfig } = getConfig();
const { SMTP_EMAIL, LINK_EXPIRE, APP_ORIGIN_LOCAL, APP_ORIGIN } = serverRuntimeConfig;

const dev = process.env.NODE_ENV === 'development';
const appOrigin = dev ? APP_ORIGIN_LOCAL : APP_ORIGIN;

/**
 * Send email private method
 * @param message
 * @param errMess
 */
function sendEmail(message: Types.Email, errMess: string): Promise<Types.OrmResult<any>> {
  return new Promise((resolve) => {
    transporter
      .sendMail(message)
      .then((data) => {
        resolve({
          error: 0,
          data,
          message: 'Email sended',
        });
      })
      .catch((e) => {
        console.error(`<${Date()}>`, `[${errMess}]`, e);
        resolve({
          error: 1,
          data: e.message,
          message: errMess,
        });
      });
  });
}

/**
 * Send email with confirm link
 * @param email {string}
 * @param datePass {string}
 * @param t {Types.Language}
 */
export function sendConfirmEmail(
  email: string,
  datePass: string,
  t: Types.Language
): Promise<Types.OrmResult<any>> {
  const key = lib.encodeBase64(datePass);
  const link = `${appOrigin}/confirm?e=${email}&k=${key}`;
  const userMessage: Types.Email = {
    from: SMTP_EMAIL,
    to: email,
    subject: lib.capitalize(t.server.letter.proofOfAddress),
    text: `${lib.capitalize(t.server.letter.hello)}! ${lib.capitalize(
      t.server.letter.youEmailAddress
    )}. ${lib.capitalize(t.server.letter.toConfirmAddress)} ${t.server.letter.link} ${link}, ${
      t.server.letter.whichIsValid
    } ${LINK_EXPIRE} ${t.server.letter.days}.`,
    html: `${lib.capitalize(t.server.letter.hello)}! ${lib.capitalize(
      t.server.letter.youEmailAddress
    )}. ${lib.capitalize(t.server.letter.toConfirmAddress)} <a href="${link}">${
      t.server.letter.link
    }</a>, <i>${t.server.letter.whichIsValid} ${LINK_EXPIRE} ${t.server.letter.days}.</i>`,
  };
  return sendEmail(userMessage, 'Error send email to registered user');
}

/**
 * Send email with change passsword link
 * @param email {string}
 * @param datePass {string}
 * @param t {Types.Language}
 */
export function sendForgotEmail(
  email: string,
  datePass: string,
  t: Types.Language
): Promise<Types.OrmResult<any>> {
  const key = lib.encodeBase64(datePass);
  const link = `${appOrigin}/change-pwd?e=${email}&k=${key}`;
  const userMessage = {
    from: SMTP_EMAIL,
    to: email,
    subject: lib.capitalize(t.server.letter.changePassword),
    text: `${lib.capitalize(t.server.letter.hello)}! ${lib.capitalize(
      t.server.letter.wasInitiated
    )} ${t.server.letter.link} ${link}, ${t.server.letter.whichIsValid} ${LINK_EXPIRE} ${
      t.server.letter.days
    }.`,
    html: `${lib.capitalize(t.server.letter.hello)}! ${lib.capitalize(
      t.server.letter.wasInitiated
    )} <a href="${link}">${t.server.letter.link}</a>, <i>${
      t.server.letter.whichIsValid
    } ${LINK_EXPIRE} ${t.server.letter.days}.</i>`,
  };
  return sendEmail(userMessage, 'Error send email to forgot password user');
}
