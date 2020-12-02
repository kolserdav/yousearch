/// <reference types="next" />
/// <reference types="next/types/global" />
import * as Schema from './node/schemas';
export { Schema };

export type ActionTypes = 'USER_FETCH_REQUEST' | 'USER_FETCH_FAILED' | 'USER_FETCH' | 'INITIAL';

export type Action<T> = {
  type: ActionTypes;
  body: T;
};

export type Resolvers = {
  Query: Schema.Query;
};

export type Reducer<T> = {
  type: ActionTypes;
  body: Action<T>;
};
