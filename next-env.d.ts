/// <reference types="next" />
/// <reference types="next/types/global" />
import * as Schema from './node/schemas';
export { Schema };

export declare type ActionTypesUserFetch =
  | 'USER_FETCH_REQUEST'
  | 'USER_FETCH_FAILED'
  | 'USER_FETCH';
export declare type ActionTypesTypesRegistration =
  | 'REGISTRATION_REQUEST'
  | 'REGISTRATION_FAILED'
  | 'REGISTRATION';
export declare type ActionTypes = ActionTypesUserFetch | ActionTypesTypesRegistration | 'INITIAL';

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
