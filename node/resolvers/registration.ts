import * as Types from '../../next-env';

export default async function Registration(_, params: Types.Schema.Params.Registration): Promise<Types.Schema.Values.Registration> {
  return {
    token: params.input.name,
  }
}