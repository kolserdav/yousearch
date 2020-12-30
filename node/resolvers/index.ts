import Registration from './user/Registration';
import Login from './user/Login';
import { Resolver } from '../schemas';
import Search from './video/Subtitles';
import Captions from './video/Captions';
import Info from './video/Info';
import Auth from './user/Auth';
import Create from './link/Create';
import GetLink from './link/Get';
import Confirm from './user/Confirm';

const resolvers: Resolver = {
  Query: {
    auth: Auth,
    link: GetLink,
  },
  Mutation: {
    registration: Registration,
    login: Login,
    subtitles: Search,
    captions: Captions,
    info: Info,
    link: Create,
    confirm: Confirm,
  },
};

export { resolvers };
