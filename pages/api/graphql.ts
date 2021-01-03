/**
 * GraphQL server listen
 */
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../node/schemas';
import { resolvers } from '../../node/resolvers';
import * as orm from '../../node/orm/index';

/**
 * Handle unhandled rejections
 */
process.on('unhandledRejection', (e) => {
  console.error(`<${Date()}>`, '(SERVER_ERROR_UNHANDLED_REJECTION)', e);
});

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (e) => {
  console.error(`<${Date()}>`, '(SERVER_ERROR_UNCAUGHT_EXCEPTION)', e);
});

// If need recreate tables
const drop = false;

/**
 * Create tables function, run while first running server after app starting
 */
const createTables = async () => {
  // Create table users
  const users = await orm.user.createTableUsers();
  if (users.error) {
    console.warn('WARNING: Table users not created', users.data);
  } else {
    console.info('INFO: Table users created!', users.data);
  }
  // Create table links
  const links = await orm.link.createTableLinks();
  if (links.error) {
    console.warn('WARNING: Table links not created', links.data);
  } else {
    console.info('INFO: Table links created!', links.data);
  }
  // Create table visits
  const visits = await orm.user.createTableVisits();
  if (visits.error) {
    console.warn('WARNING: Table visits not created', visits.data);
  } else {
    console.info('INFO: Table visits created!', visits.data);
  }
};

const dropTables = async () => {
  // Drop table users
  const users = await orm.user.dropTableUsers();
  if (users.error) {
    console.warn('WARNING: Table users not dropped', users.data);
  } else {
    console.info('INFO: Table users dropped!', users.data);
  }
  // Drop table links
  const links = await orm.link.dropTableLinks();
  if (links.error) {
    console.warn('WARNING: Table links not dropped', links.data);
  } else {
    console.info('INFO: Table links dropped!', links.data);
  }
  // Drop table visits
  const visits = await orm.user.dropTableVisits();
  if (visits.error) {
    console.warn('WARNING: Table visits not dropped', visits.data);
  } else {
    console.info('INFO: Table visits dropped!', visits.data);
  }
};

drop ? dropTables() : createTables();

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
