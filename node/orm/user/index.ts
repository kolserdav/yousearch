import Sqlite3 from 'sqlite3';
import getConfig from 'next/config';
import path from 'path';
import bcrypt from 'bcrypt';
import * as Types from '../../../next-env';
const { serverRuntimeConfig } = getConfig();
const { PROJECT_ROOT } = serverRuntimeConfig;
const sqlite3 = Sqlite3.verbose();
const db = new sqlite3.Database(path.resolve(PROJECT_ROOT, 'database/you.db'));

/**
 * Create table users
 */
export const createTableUsers: Types.OrmHandler<void, any> = () => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS users (email TEXT, password TEXT, created DATETIME DEFAULT CURRENT_TIMESTAMP)',
        (err: Error, row: any[]) => {
          if (err) {
            console.error(`<${Date()}> (ERROR_CREATE_TABLE_USERS)`, err);
            resolve({
              error: 1,
              data: err.message,
            });
          } else {
            resolve({
              error: 0,
              data: row,
            });
          }
        }
      );
    });
  });
};

/**
 * Drop table users
 */
export const dropTableUsers: Types.OrmHandler<void, any> = () => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run('DROP table users', (err: Error, row: any[]) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_DROP_TABLE_USERS)`, err);
          resolve({
            error: 1,
            data: err.message,
          });
        } else {
          resolve({
            error: 0,
            data: row,
          });
        }
      });
    });
  });
};

/**
 * Get user by email
 */
export const getByEmail: Types.OrmHandler<
  Types.Schema.Params.Registration,
  Types.Schema.Values.User
> = (params) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.get(
        `SELECT * FROM users WHERE email="${params.input.email}"`,
        (err: Error, row: Types.Schema.Values.User) => {
          console.log(row)
          if (err) {
            console.error(`<${Date()}> (ERROR_CREATE_TABLE_USERS)`, err);
            resolve({
              error: 1,
              data: err.message,
            });
          } else {
            resolve({
              error: 0,
              data: row,
            });
          }
        }
      );
    });
  });
};

/**
 * Get user by email
 */
export const createNew: Types.OrmHandler<
  Types.Schema.Params.Registration,
  Types.Schema.Values.User[]
> = (params) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      const smtp = db.prepare(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        (err: Error, row: Types.Schema.Values.User[]) => {
          if (err) {
            console.error(`<${Date()}> (ERROR_CREATE_TABLE_USERS)`, err);
            resolve({
              error: 1,
              data: err.message,
            });
          } else {
            resolve({
              error: 0,
              data: row,
            });
          }
        }
      );
      const { password } = params.input;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error(`<${Date()}> (ERROR_GET_SALT)`, err);
        bcrypt.hash(password, salt, (e, hash) => {
          if (err) console.error(`<${Date()}> (ERROR_GENERATE_HASH)`, e, { password });
          smtp.run(params.input.email, hash);
          smtp.finalize();
        });
      });
    });
  });
};
