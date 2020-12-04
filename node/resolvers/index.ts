import axios from 'axios';
import Registration from './user/registration';
import * as Types from '../../next-env';
import { Resolver } from '../schemas';

const resolvers: Resolver = {
  Query: {
    getUsers: async (): Promise<Types.Schema.Values.User[]> => {
      const users = await axios.get("https://api.github.com/users");
      return users.data.map(({ id, login, avatar_url }: Types.Schema.Values.User) => ({
        id,
        login,
        avatar_url,
      }));
    },
    getUser: async (_: any, args: Types.Schema.Params.User): Promise<Types.Schema.Values.User> => {
      const user: any = await axios.get(
        `https://api.github.com/users/${args.input.name}`
      )
        .catch(e => e);
      return {
        id: user.data.id,
        login: user.data.login,
        avatar_url: user.data.avatar_url,
      };
    },
  },
  Mutation: {
    registration: Registration,
  },
};

export { resolvers };
