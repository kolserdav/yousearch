/**
 * Handle requests to GraphQL server
 * match two methods:
 * @requestQuery - for query requests
 * @requestMutation - for mutations
 */
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  QueryOptions,
  MutationOptions,
} from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import * as Types from '../../next-env';

const dev = process.env.NODE_ENV === 'development';
const serverApi = process.env.NEXT_PUBLIC_SERVER_API;
const server = typeof window === 'undefined';

/**
 * Apollo server micro client
 */
const client = new ApolloClient({
  ssrMode: server,
  link: new HttpLink({
    uri: serverApi,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPosts: concatPagination(),
        },
      },
    },
  }),
});

/**
 * Request for query
 * @param callback {Types.RequestCallback<any, QueryOptions<Record<string, any>, any>>}
 */
const requestQuery = (
  callback: Types.RequestCallback<any, QueryOptions<Record<string, any>, any>>
): Types.Request<any> => ({
  context: this,
  fn: async (context: Types.Action<any>) => {
    return await new Promise((resolve) => {
      client
        .query(callback(context))
        .then((result) => {
          if ((result.error && dev) || (result.error && server)) {
            console.error(`<${Date()}>`, '[Error query]', result.error);
          }
          resolve(result.data);
        })
        .catch((e: Error) => {
          resolve(e.message);
        });
    });
  },
});

/**
 * Request for mutation
 * @param callback {Types.RequestCallback<any, MutationOptions<Record<string, any>, any>>}
 */
const requestMutate = (
  callback: Types.RequestCallback<any, MutationOptions<Record<string, any>, any>>
): Types.Request<any> => ({
  context: this,
  fn: async (context: Types.Action<any>): Promise<Record<string, any> | string> => {
    return await new Promise((resolve) => {
      client
        .mutate(callback(context))
        .then((result) => {
          if ((result.errors && dev) || (result.errors && server)) {
            console.error(`<${Date()}>`, '[Error mutation]', result.errors);
          }
          resolve(result.data);
        })
        .catch((e: Error) => {
          resolve(e.message);
        });
    });
  },
});

export { requestQuery, requestMutate };
