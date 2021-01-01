import { gql } from 'apollo-server-micro';
import * as Types from '../../next-env';

/**
 * Valuest types of requests
 */
export declare namespace Values {
  /** Global interfaces */
  interface Response {
    result: Types.Result;
    message: string;
  }
  interface ServerResponse {
    readonly [key: string /** Handler name */]: Response; 
  }
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
    warning?: string;
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
    lang?: string;
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
  /** Info values */
  type Image = {
    url: string;
    width: string;
    height: string;
  };
  type Info = {
    result: Types.Result;
    message: string;
    title?: string;
    image?: Image;
  };
  interface InfoRequest extends ServerResponse {
    info?: Info;
  }
  /** Auth values */
  type Auth = {
    result: Types.Result;
    message: string;
    email?: string;
    confirm?: boolean;
    role?: Types.UserRoles;
  };
  interface AuthRequest extends ServerResponse {
    auth?: Auth;
  }
  /** Link values */
  type Link = {
    result: Types.Result;
    message: string;
    link?: string;
    description?: string;
  };
  interface LinkRequest extends ServerResponse {
    link?: Link;
  }
  /**
   * Confirm
   */
  interface ConfirmRequest extends ServerResponse {
    confirm?: Response;
  }
  /** Forgot values */
  interface ForgotRequest extends ServerResponse {
    forgot?: Response;
  }
  /** Change pass values */
  interface ChangePassRequest extends ServerResponse {
    changePass?: Response;
  }
  /** SendConfirm values */
  interface SendConfirmRequest extends ServerResponse {
    sendConfirm?: Response;
  }
}

/**
 * Params types of requests
 */
export declare namespace Params {
  /** Global params */
  type ID = {
    input: {
      id: number;
    };
    results: string[];
  };
  type ResponseKeys = keyof Values.Response;
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
  /** Link params */
  type LinkKeys = keyof Values.Response;
  type Link = {
    input: {
      link: string;
      userId?: number;
      description: string;
    };
    results: Array<LinkKeys[] | string>;
  };
  /** Confirm params */
  type ConfirmKeys = keyof Values.Response;
  type Confirm = {
    input: {
      email: string;
      key: string;
    };
    results: Array<ConfirmKeys[]>;
  };
  /** Forgot params */
  type ForgotKeys = keyof Values.Response;
  type Forgot = {
    input: {
      email: string;
    };
    results: Array<ForgotKeys[]>;
  };
  /** Change pass params */
  type ChangePass = {
    input: {
      key: string;
      email: string;
      password: string;
      passwordRepeat: string;
    };
    results: Array<ResponseKeys[]>;
  };
}

export interface Query extends Types.RequestInterface {
  auth: Types.RequestHandler<void, Values.Auth>;
  link: Types.RequestHandler<Params.ID, Values.Link>;
}

/**
 * Mutation methods first set here
 */
export interface Mutation extends Types.RequestInterface {
  registration: Types.RequestHandler<Params.Registration, Values.Registration>;
  login: Types.RequestHandler<Params.Login, Values.Login>;
  subtitles: Types.RequestHandler<Params.Subtitles, Values.Subtitles>;
  captions: Types.RequestHandler<Params.Captions, Values.Captions>;
  info: Types.RequestHandler<Params.Captions, Values.Info>;
  link: Types.RequestHandler<Params.Link, Values.Link>;
  confirm: Types.RequestHandler<Params.Confirm, Values.Response>;
  forgot: Types.RequestHandler<Params.Forgot, Values.Response>;
  changePass: Types.RequestHandler<Params.ChangePass, Values.Response>;
  sendConfirm: Types.RequestHandler<Params.Forgot, Values.Response>;
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

  input Id {
    id: Int!
  }

  type Response {
    result: Result!
    message: String!
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
    warning: String
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
    lang: String
    items: [SubtitlesItem]
  }

  input SubtitlesInput {
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

  type Image {
    url: String!
    width: Int!
    height: Int!
  }

  type Info {
    result: Result!
    message: String!
    title: String
    image: Image
  }

  type Auth {
    result: Result!
    message: String!
    email: String
    role: String
    confirm: Boolean
  }

  input LinkInput {
    link: String!
    description: String!
  }

  type Link {
    result: Result!
    message: String!
    link: String
    description: String
  }

  input ConfirmInput {
    email: String!
    key: String!
  }

  input ForgotInput {
    email: String!
  }

  input ChangePassInput {
    key: String!
    email: String!
    password: String!
    passwordRepeat: String!
  }

  type Query {
    auth: Auth!
    link(input: Id!): Link!
  }

  type Mutation {
    registration(input: RegistrationInput!): Registration!
    login(input: LoginInput!): Login!
    subtitles(input: SubtitlesInput!): Subtitles!
    captions(input: CaptionsInput!): Captions!
    info(input: CaptionsInput!): Info!
    link(input: LinkInput!): Link!
    confirm(input: ConfirmInput!): Response!
    forgot(input: ForgotInput!): Response!
    changePass(input: ChangePassInput!): Response!
    sendConfirm(input: ForgotInput!): Response!
  }
`;
