import axios from "axios";
import { IResolvers } from 'apollo-server-micro';
import * as Types from '../../next-env';

const resolvers: IResolvers<any, any> = {
  Query: {
    getUsers: async (e: Error): Promise<Types.Schema.Values.User[]> => {
      console.log(333, e)
      const users = await axios.get("https://api.github.com/users");
      return users.data.map(({ id, login, avatar_url }: Types.Schema.Values.User) => ({
        id,
        login,
        avatar_url
      }));
    },
    getUser: async (e: Error, args: Types.Schema.Params.User): Promise<Types.Schema.Values.User> => {
      console.log(1,e)
      const user: any = await axios.get(
        `https://api.github.com/users/${args.name}`
      )
        .catch(e => e);
      return {
        id: user.data.id,
        login: user.data.login,
        avatar_url: user.data.avatar_url
      };
    }
  }
};

export { resolvers };