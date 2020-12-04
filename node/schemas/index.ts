import { gql } from 'apollo-server-micro';
import * as Types from '../../next-env';

export interface ServerResponse {
  readonly [key: string]: {
    result: Types.Result;
    message: string;
  };
}

export declare namespace Values {
  interface User extends ServerResponse {
    getUser?: {
      result: Types.Result;
      message: string;
      id?: number;
      login?: string;
      avatar_url?: string;
    };
  }

  interface Registration {
    result: Types.Result;
    message: string;
    token?: string;
  }

  export interface RegistrationRequest extends ServerResponse {
    registration?: Registration;
  }
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
}

export interface Query {
  getUsers: (parent: any) => Promise<Values.User[]>;
  getUser: (parent, params: Params.User) => Promise<Values.User>;
}

export interface Mutation {
  registration: (parent: any, params: Params.Registration, context: any, info: any) => Promise<Values.Registration>;
}

export interface Resolver {
  Query: Query;
  Mutation: Mutation;
}

export const typeDefs = gql`
  enum Result {
    error
    warning
    success
  }

  type User {
    result: Result!
    message: String!
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
    result: Result!
    message: String!
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
