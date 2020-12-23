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
  type Registration = {
    result: Types.Result;
    message: string;
    token?: string;
  };
  interface RegistrationRequest extends ServerResponse {
    registration?: Registration;
  }
  /** Subtitle values */
  type SubtitlesItem = {
    start: string;
    dur: string;
    text: string;
  };
  type Subtitles = {
    result: Types.Result;
    message: string;
    items?: SubtitlesItem[];
  };
  interface SubtitlesRequest extends ServerResponse {
    subtitles?: Subtitles;
  }
  /** Caption values */
  type CaptionsItem = {
    lang: string;
    type: string;
  };
  type Captions = {
    result: Types.Result;
    message: string;
    items?: CaptionsItem[];
  };
  interface CaptionsRequest extends ServerResponse {
    captions?: Captions;
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
  /** Subtitles params */
  type SubtitlesKeys = keyof Values.Subtitles;
  type Subtitles = {
    input: {
      search: string;
      videoID: string;
      lang: string;
    };
    results: Array<SubtitlesKeys[] | string>;
  };
  /** Captions params */
  type CaptionsKeys = keyof Values.Captions;
  type Captions = {
    input: {
      videoID: string;
    };
    results: Array<CaptionsKeys[] | string>;
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
  subtitles: Types.RequestHandler<Params.Subtitles, Values.Subtitles>;
  captions: Types.RequestHandler<Params.Captions, Values.Captions>;
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

  type SubtitlesItem {
    start: String!
    dur: String!
    text: String!
  }

  type Subtitles {
    result: Result!
    message: String!
    items: [SubtitlesItem]
  }

  input SubtitlesInput {
    search: String!
    videoID: String!
    lang: String!
  }

  type CaptionsItem {
    lang: String!
    type: String!
  }

  type Captions {
    result: Result!
    message: String!
    items: [CaptionsItem]
  }

  input CaptionsInput {
    videoID: String!
  }

  type Query {
    test: String
  }

  type Mutation {
    registration(input: RegistrationInput!): Registration!
    login(input: LoginInput!): Login!
    subtitles(input: SubtitlesInput!): Subtitles!
    captions(input: CaptionsInput!): Captions!
  }
`;
