/**
 * Handle requests to GraphQL server
 * match two methods:
 * @requestQuery - for query requests
 * @requestMutation - for mutations
 */
import {
  ApolloClient,
  ApolloError,
  InMemoryCache,
  QueryOptions,
  MutationOptions,
  createHttpLink,
} from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'universal-cookie';
import * as lib from '../lib';

const cookies = new Cookies();
const dev = process.env.NODE_ENV === 'development';
const serverApiLocal = process.env.NEXT_PUBLIC_SERVER_API;
const serverApiRemote = process.env.NEXT_PUBLIC_SERVER_API_REMOTE;
const serverApi = dev ? serverApiLocal : serverApiRemote;
const server = typeof window === 'undefined';

const httpLink = createHttpLink({
  uri: serverApi,
  credentials: 'same-origin',
});

const authLink = setContext((_, ctx) => {
  const token = cookies.get(lib.TOKEN_COOKIE_NAME);
  const { headers } = ctx;
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
      lang: cookies.get('lang') || 'en',
      xqt: cookies.get('_qt') || '',
    },
  };
});

/**
 * Apollo server micro client
 */
const client = new ApolloClient({
  ssrMode: server,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          allPosts: concatPagination(),
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

/**
 * Request for query
 * @param callback {RequestCallback<any, QueryOptions<Record<string, any>, any>>}
 */
const requestQuery = (
  callback: RequestCallback<any, QueryOptions<Record<string, any>, any>>
): any => ({
  context: this,
  fn: async (context: Action<any>) => {
    return await new Promise((resolve) => {
      client
        .query(callback(context))
        .then((result) => {
          if ((result.error && dev) || (result.error && server)) {
            console.error(`<${Date()}>`, '[Error query]', result.error);
          }
          resolve(result.data);
        })
        .catch((e: ApolloError) => {
          // @ts-ignore
          if (dev) console.error(`<${Date()}>`, '[Error query: catch]', e.networkError.result);
          resolve(e.message);
        });
    });
  },
});

/**
 * Request for mutation
 * @param callback {RequestCallback<any, MutationOptions<Record<string, any>, any>>}
 */
const requestMutate = (
  callback: RequestCallback<any, MutationOptions<Record<string, any>, any>>
): any => ({
  context: this,
  fn: async (context: Action<any>): Promise<Record<string, any> | string> => {
    return await new Promise((resolve) => {
      client
        .mutate(callback(context))
        .then((result) => {
          if ((result.errors && dev) || (result.errors && server)) {
            console.error(`<${Date()}>`, '[Error mutation]', result.errors);
            resolve(result.errors[0].message);
          }
          resolve(result.data);
        })
        .catch((e: ApolloError) => {
          // @ts-ignore
          if (dev) console.error(`<${Date()}>`, '[Error mutation: catch]', e.networkError.result);
          resolve(e.message);
        });
    });
  },
});

export { requestQuery, requestMutate };
