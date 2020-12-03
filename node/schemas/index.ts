import { gql } from 'apollo-server-micro';
import * as Types from '../../next-env';

export declare namespace Values {
  type User = {
    id?: number;
    login?: string;
    avatar_url?: string;
  };
  type Registration = {
    token: string;
  };
  type All = User | Registration;
}

export declare namespace Params {
  type UserKeys = keyof Values.User;
  type RegistrationKeys = keyof Values.Registration;
  type User = {
    input: {
      name: string;
    };
    results: UserKeys[];
  };
  type Registration = {
    input: {
      name?: string;
      email: string;
      pasword: string;
      passwordRepeat: string;
    };
    results: RegistrationKeys[];
  };
  type All = User | Registration;
}

export interface Query {
  getUsers: (_: any) => Promise<Values.User[]>;
  getUser: (params: Params.User) => Promise<Values.User>;
}

export interface Mutation {
  registration: (_: any, params: Params.Registration) => Promise<Values.Registration>;
}

export interface Resolver {
  Query: Query;
  Mutation: Mutation;
}

export const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  input UserInput {
    name: String!
  }

  input RegistrationInput {
    email: String!
    name: String
    password: String!
    passwordRepeat: String!
  }

  type Registration {
    token: String
  }

  type Query {
    getUsers: [User]
    getUser(input: UserInput!): User!
  }

  type Mutation {
    registration(input: RegistrationInput!): Registration!
  }
`;
