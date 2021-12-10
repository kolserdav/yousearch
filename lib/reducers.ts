/**
 * Universal reducer for all cases of store
 */

const initialType: All = 'INITIAL';

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
  state.type = action.type;
  state.body = action.body;
  return Object.assign(state, { [action.type]: action });
}
