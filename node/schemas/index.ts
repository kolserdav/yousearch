import { gql } from 'apollo-server-micro';
import { Schema } from 'inspector';
import * as Types from '../../next-env';

declare interface ServerResponse {
  readonly [key: string /** Handler name */]: { 
    result: Types.Result;
    message: string;
  };
}

/**
 * Valuest types of requests
 */
export declare namespace Values {
  /** Login values */
  type Login = {
    result: Types.Result;
    message: string;
    token?: string;
  };
  interface LoginRequest extends ServerResponse {
    login?: Login;
  }
  /** Registration values */
  interface Registration {
    result: Types.Result;
    message: string;
    token?: string;
  }
  interface RegistrationRequest extends ServerResponse {
    registration?: Registration;
  }
}

/**
 * Params types of requests
 */
export declare namespace Params {
  /** Login params */
  type LoginKeys = keyof Values.Login;
  type Login = {
    input: {
      email: string;
      password: string;
    };
    results: LoginKeys[];
  };
  /** Registration params */
  type RegistrationKeys = keyof Values.Registration;
  type Registration = {
    input: {
      email: string;
      password: string;
      passwordRepeat: string;
    };
    results: RegistrationKeys[];
  };
}

export interface Query extends Types.RequestInterface {
  
}

/**
 * Mutation methods first set here
 */
export interface Mutation extends Types.RequestInterface {
  registration: Types.RequestHandler<Params.Registration, Values.Registration>;
  login: Types.RequestHandler<Params.Login, Values.Login>;
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

  type Login {
    result: Result!
    message: String!
    token: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Registration {
    result: Result!
    message: String!
    token: String
  }

  input RegistrationInput {
    email: String!
    password: String!
    passwordRepeat: String!
  }

  type Query {
    test: String
  }

  type Mutation {
    registration(input: RegistrationInput!): Registration!
    login(input: LoginInput!): Login!
  }
`;
