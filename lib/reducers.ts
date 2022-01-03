/**
 * Universal reducer for all cases of store
 */

const initialType: any = 'INITIAL';

const initialState: Reducer<any> = {
  type: initialType,
  body: {
    type: initialType,
    body: {},
  },
};

export default function reducer(
  state: Reducer<any> = initialState,
  action: Action<any>
): Reducer<any> {
  const { type, body }: any = action;
  state.type = type;
  state.body = body;
  return Object.assign(state, { [type]: action });
}
