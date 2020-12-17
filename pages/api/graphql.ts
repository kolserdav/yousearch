/**
 * GraphQL server listen
 */
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../node/schemas';
import { resolvers } from '../../node/resolvers';

const dev = process.env.NODE_ENV === 'development';

const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  // @ts-ignore
  resolvers,
  introspection: dev,
  playground: dev,
  context: ({ req }) => {
    return {
      headers: req.headers,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
