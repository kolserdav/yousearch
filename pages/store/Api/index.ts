import { gql } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache, ApolloQueryResult } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities'
import * as Types from '../../../next-env';

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

export const fetchTest = {
  context: this,
  fn: (context: Types.Action<Types.Schema.Params.User>, ...args: any[]): any => {
    return new Promise((resolve, reject) => {
      client
        .query({
          variables: {
            name: context.body.name,
          },
          query: gql`
            query ($name: String!) {
              getUser(name: $name) {
                ${context.body.results}
              }
            }
          `,
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((result: ApolloQueryResult<any>) => {
          if (result.error && dev) {
            console.error(`<${Date()}>`, '[User fetch error]', result.error);
          }
          resolve(result.data.getUser);
        })
        .catch(e => reject(e));
    });
  },
};
