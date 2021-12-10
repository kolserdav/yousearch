import { gql } from 'apollo-server-micro';

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

  enum Roles {
    user
    guest
  }

  input VisitInput {
    is_old: Boolean!
    user_agent: String
    role: Roles
    path: String!
    error: String!
    ip: String
    width: Int!
    height: Int!
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
    visit(input: VisitInput!): Response!
  }
`;
