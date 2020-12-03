import * as Types from '../../next-env';

export default async function Registration(
  _,
  params: Types.Schema.Params.Registration,
  context: any
): Promise<Types.Schema.Values.Registration> {
  console.log(313, context);
  return {
    result: 'success',
    message: 'Success',
    token: params.input.email,
  };
}