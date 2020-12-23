import bcrypt from 'bcrypt';
import * as Types from '../../../next-env';
import * as orm from '../../orm';
import * as lib from '../../lib';
import * as srv from '../../../services';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { MIN_PASSWORD_LENGTH } = serverRuntimeConfig;

/**
 * Registion route
 * @param _parent parent route
 * @param params {Types.Schema.Params.Login} request params
 * @param context context (headers)
 */
const Login: Types.RequestHandler<Types.Schema.Params.Login, Types.Schema.Values.Login> = async (
  _parent,
  params,
  context
) => {
  const { headers } = context;
  const { lang } = headers;
  const t = srv.getLang(lang);
  // Check params
  const { input } = params;
  if (!input) {
    return {
      result: 'warning',
      message: t.server.user.warningInputParamsNotSend,
    };
  }
  if (!input.email) {
    return {
      result: 'warning',
      message: t.server.user.warningEmailNotSend,
    };
  }
  if (!srv.validateEmail(input.email)) {
    return {
      result: 'warning',
      message: t.server.user.warningEmailNotValid,
    };
  }
  if (!input.password) {
    return {
      result: 'warning',
      message: t.server.user.warningPasswordNotSend,
    };
  }
  if (input.password.length < MIN_PASSWORD_LENGTH) {
    return {
      result: 'warning',
      message: `${t.server.user.warningPasswordTooShort} ${t.server.user.infoMinimumPasswordLength} ${MIN_PASSWORD_LENGTH}`,
    };
  }
  // Get user data
  const user = await orm.user.getByEmail(params.input.email);
  if (user.error) {
    console.warn(headers);
    return {
      result: 'error',
      message: t.server.user.errorGetByEmail,
      stdErrMessage: user.message,
    };
  }
  if (user.data === undefined) {
    return {
      result: 'warning',
      message: t.server.user.warningEmailNotRegister,
    };
  }
  const { data } = user;
  const checkPass = await new Promise((resolve) => {
    bcrypt.compare(params.input.password, data.password, (err, result) => {
      resolve(result);
    });
  });
  if (!checkPass) {
    return {
      result: 'warning',
      message: t.server.user.warningEmailOrPasswordNotMatch,
    };
  }
  const token = lib.getParsedToken(data, headers);
  return {
    result: 'success',
    message: t.server.user.successLogin,
    token,
  };
};

export default Login;
