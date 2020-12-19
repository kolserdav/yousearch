import { gql } from 'apollo-server-micro';
import { Schema } from 'inspector';
import * as Types from '../../next-env';

declare interface ServerResponse {
  readonly [key: string /** Handler name */]: { 
    result: Types.Result;
    message: string;
  };
}

export declare namespace Values {
  /** User values */
  interface User {
    result: Types.Result;
    message: string;
    id?: number;
    login?: string;
    avatar_url?: string;
  }
  interface UserRequest extends ServerResponse {
    getUser?: User;
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

export declare namespace Params {
  /** User params */
  type UserKeys = keyof Values.User;
  type User = {
    input: {
      name: string;
    };
    results: UserKeys[];
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
  getUsers: Types.RequestHandler<Params.User, Values.User[]>
  getUser: Types.RequestHandler<Params.User, Values.User>
}


export interface Mutation extends Types.RequestInterface {
  registration: Types.RequestHandler<Params.Registration, Values.Registration>;
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
