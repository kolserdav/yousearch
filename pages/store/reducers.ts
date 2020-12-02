import * as Types from '../../next-env';

const initialState: Types.Reducer<Types.Schema.Values.All> = {
  type: 'INITIAL',
  body: {
    type: 'INITIAL',
    body: {},
  },
};

export default function reducer(
  state: Types.Reducer<Types.Schema.Values.All> = initialState,
  action: Types.Action<Types.Schema.Params.All>
): Types.Reducer<Types.Schema.Values.All> {
  state.type = action.type;
  return Object.assign(state, { [action.type]: action });
}
