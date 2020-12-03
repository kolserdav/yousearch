import { gql } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache, ApolloQueryResult, QueryOptions, MutationOptions, FetchResult } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import * as Types from '../next-env';

const dev = process.env.NODE_ENV === 'development';
const server = typeof window === 'undefined';

const client = new ApolloClient({
  ssrMode: server,
  link: new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
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

// eslint-disable-next-line no-unused-vars
type RequestCallback<T> = (context: Types.Action<Types.Schema.Params.All>, ...args: any[]) => T;

interface Request {
  context: unknown;
  fn: (
    // eslint-disable-next-line no-unused-vars
    context: Types.Action<Types.Schema.Params.All>,
    ...args: any[]
  ) => Promise<FetchResult<any>>;
}

const requestQuery = (
  callback: RequestCallback<QueryOptions<Record<string, any>, any>>
): Request => ({
  context: this,
  fn: (context) => {
    return new Promise((resolve, reject) => {
      console.log(callback(context))
      client
        .query(callback(context))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((result) => {
          if (result.error && dev) {
            console.error(`<${Date()}>`, '[Error request]', result.error);
          }
          console.log(result);
          resolve(result);
        })
        .catch(e => reject(e));
    }).catch(e => {
      console.error(e);
    });
  },
});

const requestMutate = (
  callback: RequestCallback<MutationOptions<Record<string, any>, any>>): Request => ({
  context: this,
  fn: (context) => {
    return new Promise((resolve, reject) => {
      console.log(callback(context))
      client
        .mutate(callback(context))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((result) => {
          if (result.errors && dev) {
            console.error(`<${Date()}>`, '[Error request]', result.errors);
          }
          console.log(result);
          resolve(result);
        })
        .catch(e => reject(e));
    }).catch(e => {
      console.error(e);
    });
  },
});

export { requestQuery, requestMutate };
