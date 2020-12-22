/**
 * Requests to server
 */
import { gql } from '@apollo/client';
import { requestQuery, requestMutate } from '../../lib/request';

/**
 * Fetch user by name
 */
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

/**
 * User registration
 */
export const registration = requestMutate((context) => ({
  variables: {
    input: context.body.input,
  },
  mutation: gql`
    mutation ($input: RegistrationInput!) {
      registration(input: $input) {
        result,
        ${context.body.results}
      }
    }
  `,
}));

/**
 * User login
 */
export const login = requestMutate((context) => ({
  variables: {
    input: context.body.input,
  },
  mutation: gql`
    mutation ($input: LoginInput!) {
      login(input: $input) {
        result,
        ${context.body.results}
      }
    }
  `,
}));
