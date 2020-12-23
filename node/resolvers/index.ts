import axios from 'axios';
import Registration from './user/Registration';
import Login from './user/Login';
import * as Types from '../../next-env';
import { Resolver } from '../schemas';
import Search from './subtitles/Search';
import Captions from './subtitles/Captions';

const resolvers: Resolver = {
  Query: {
  },
  Mutation: {
    registration: Registration,
    login: Login,
    subtitles: Search,
    captions: Captions,
  },
};

export { resolvers };
