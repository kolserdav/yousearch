import Registration from './user/Registration';
import Login from './user/Login';
import Search from './video/Subtitles';
import Captions from './video/Captions';
import Info from './video/Info';
import Auth from './user/Auth';
import Create from './link/Create';
import GetLink from './link/Get';
import Confirm from './user/Confirm';
import Forgot from './user/Forgot';
import ChangePass from './user/ChangePass';
import SendConfirm from './user/SendConfirm';
import Visit from './user/Visit';

const resolvers: Schema.Resolver = {
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
    forgot: Forgot,
    changePass: ChangePass,
    sendConfirm: SendConfirm,
    visit: Visit,
  },
};

export { resolvers };
