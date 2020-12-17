import * as Schema from '../../schemas';

export default async function Registration(
  parent,
  params: Schema.Params.Registration,
  context: any
): Promise<Schema.Values.Registration> {
  console.log(params)
  return {
    result: 'success',
    message: 'Success',
    token: params.input.email,
  };
}
