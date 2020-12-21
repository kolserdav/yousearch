/**
 * Handle requests to GraphQL server
 * match two methods:
 * @requestQuery - for query requests
 * @requestMutation - for mutations
 */
import {
  ApolloClient,
  InMemoryCache,
  QueryOptions,
  MutationOptions,
  createHttpLink,
} from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import * as Types from '../../next-env';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const dev = process.env.NODE_ENV === 'development';
const serverApi = process.env.NEXT_PUBLIC_SERVER_API;
const server = typeof window === 'undefined';

const httpLink = createHttpLink({
  uri: serverApi,
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: 'Bearer L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg',
      lang: cookies.get('lang'),
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
  }
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
          if (dev) console.error(e);
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
          if (dev) console.error(e);
          resolve(e.message);
        });
    });
  },
});

export { requestQuery, requestMutate };
