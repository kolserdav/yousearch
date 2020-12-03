import { gql } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache, ApolloQueryResult } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities'
import * as Types from '../../../next-env';
import { requestQuery, requestMutate } from '../../../lib/request';

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

export const fetchTest = requestQuery((context) => ({
  variables: {
    input: context.body.input,
  },
  query: gql`
    query ($input: String!) {
      getUser(name: $input) {
        ${context.body.results}
      }
    }
  `,
}));

export const registration = requestMutate((context) => ({
  variables: {
    input: context.body.input,
  },
  mutation: gql`
    mutation ($input: Registration!) {
      registration(input: $input) {
        ${context.body.results}
      }
    }
  `,
}));
