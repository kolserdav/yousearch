import * as Types from '../../../next-env';

/**
 * 
 * @param parent parent route
 * @param params request params
 * @param context 
 */
const Registration: Types.RequestHandler<Types.Schema.Params.Registration, Types.Schema.Values.Registration> = async (
  parent,
  params,
  context
) => {
  console.log(params)
  return {
    result: 'success',
    message: 'Success',
    token: params.input.email,
  };
}

export default Registration;