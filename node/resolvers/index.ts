import axios from 'axios';
import Registration from './user/Registration';
import Login from './user/Login';
import * as Types from '../../next-env';
import { Resolver } from '../schemas';
import Search from './video/Subtitles';
import Captions from './video/Captions';
import Info from './video/Info';
import Auth from './user/Auth';

const resolvers: Resolver = {
  Query: {
    auth: Auth,
  },
  Mutation: {
    registration: Registration,
    login: Login,
    subtitles: Search,
    captions: Captions,
    info: Info,
  },
};

export { resolvers };
