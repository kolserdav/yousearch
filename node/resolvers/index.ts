import axios from 'axios';
import Registration from './user/Registration';
import Login from './user/Login';
import * as Types from '../../next-env';
import { Resolver } from '../schemas';

const resolvers: Resolver = {
  Query: {
  },
  Mutation: {
    registration: Registration,
    login: Login,
  },
};

export { resolvers };
