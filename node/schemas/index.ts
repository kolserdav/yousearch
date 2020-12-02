import { gql } from 'apollo-server-micro';
import * as Types from '../../next-env';

export declare namespace Values {
  type All = User;
  type User = {
    id?: number;
    login?: string;
    avatar_url?: string;
  };
}

export declare namespace Params {
  type All = User;
  type UserKeys = keyof Values.User;
  type User = {
    name: string;
    results: UserKeys[];
  };
}

export interface Query {
  getUsers: (e: Error) => Promise<Values.User[]>;
  getUser: (e: Error, name: string) => Promise<Values.User>;
}

export const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  type Query {
    getUsers: [User]
    getUser(name: String!): User!
  }
`;
