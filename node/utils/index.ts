import transporter from './transporter';
import * as Types from '../../next-env';
import * as lib from '../lib';
import getConfig from 'next/config';
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
 * @param dateNow {number}
 */
export function sendConfirmEmail(email: string, dateNow: Date): Promise<Types.OrmResult<any>> {
  const key = lib.encodeBase64(dateNow.toString());
  const link = `${appOrigin}/confirm?e=${email}&k=${key}`;
  const userMessage: Types.Email = {
    from: SMTP_EMAIL,
    to: email,
    subject: 'Подтверждение адреса',
    text: `Здравствуйте! Ваш адрес почты был указан при регистрации на нашем сайте. Чтобы подтвердить данный адрес пожалуйста перейдите по следующей ссылке ${link},которая действительна в течении ${LINK_EXPIRE} дней.`,
    html: `Здравствуйте! Ваш адрес почты был указан при регистрации на нашем сайте. Чтобы подтвердить данный адрес пожалуйста перейдите по <a href="${link}">ссылке</a>, <i>которая действительна в течении ${LINK_EXPIRE} дней.</i>`,
  };
  return sendEmail(userMessage, 'Error send email to registered user');
}

export function getForgotEmail(
  email: string,
  dateNow: number,
  first_name: string
): Promise<Types.OrmResult<any>> {
  const key = lib.encodeBase64(new Date(dateNow).toString());
  const link = `${appOrigin}/change-user-pwd?e=${email}&k=${key}`;
  const userMessage = {
    from: SMTP_EMAIL,
    to: email,
    subject: 'Смена пароля',
    text: `Здравствуйте ${first_name}! Был инициирован процесс смены пароля, если это были вы, пожалуйста перейдите по следующей ссылке ${link},которая действительна в течении ${LINK_EXPIRE} дней.`,
    html: `Здравствуйте ${first_name}! Был инициирован процесс смены пароля, если это были вы, пожалуйста перейдите по <a href="${link}">ссылке</a>, <i>которая действительна в течении ${LINK_EXPIRE} дней.</i>`,
  };
  return sendEmail(userMessage, 'Error send email to forgot password user');
}
