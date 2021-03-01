import Sqlite3 from 'sqlite3';
import getConfig from 'next/config';
import path from 'path';
import bcrypt from 'bcrypt';
import * as Types from '../../../next-env';
const { serverRuntimeConfig } = getConfig();
const { PROJECT_ROOT, HASH_SALT_LENGTH } = serverRuntimeConfig;
const sqlite3 = Sqlite3.verbose();
const db = new sqlite3.Database(path.resolve(PROJECT_ROOT, 'database/you.db'));
/**
 * Create table users
 */
export const createTableUsers: Types.OrmHandler<void, any> = () => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS users (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          confirm BOOLEAN DEFAULT FALSE,\
          email TEXT,\
          password TEXT,\
          created DATETIME DEFAULT CURRENT_TIMESTAMP,\
          updated DATETIME DEFAULT CURRENT_TIMESTAMP)\
        ',
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
 * Create table visits
 */
export const createTableVisits: Types.OrmHandler<void, any> = () => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS visits (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          user_agent TEXT,\
          ip TEXT,\
          role TEXT,\
          path TEXT,\
          error TEXT,\
          is_old BOOLEAN,\
          width INTEGER,\
          height INTEGER,\
          created DATETIME DEFAULT CURRENT_TIMESTAMP\
          )\
        ',
        (err: Error, row: any[]) => {
          if (err) {
            console.error(`<${Date()}> (ERROR_CREATE_TABLE_VISITS)`, err);
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
 * Drop table visits
 */
export const dropTableVisits: Types.OrmHandler<void, any> = () => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run('DROP table visits', (err: Error, row: any[]) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_DROP_TABLE_VISITS)`, err);
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
export const getByEmail: Types.OrmHandler<string, Types.Orm.User> = (email) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.get(`SELECT * FROM users WHERE email="${email}"`, (err: Error, row: Types.Orm.User) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_GET_BY_EMAIL)`, err);
          resolve({
            error: 1,
            message: err.message,
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
 * Get user by id
 */
export const getById: Types.OrmHandler<number, Types.Orm.User> = (id) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.get(`SELECT * FROM users WHERE id="${id}"`, (err: Error, row: Types.Orm.User) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_GET_USER_BY_ID)`, err);
          resolve({
            error: 1,
            message: err.message,
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
 * Create new user
 */
export const createNew: Types.OrmHandler<
  Types.Schema.Params.Registration,
  Types.Schema.Values.Registration | string
> = (params) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      const smtp = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)', (err: Error) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_PREPARE_INSERT_INTO_USERS)`, err);
          resolve({
            error: 1,
            data: err.message,
          });
        }
      });
      const { password } = params.input;
      bcrypt.genSalt(HASH_SALT_LENGTH, (err, salt) => {
        if (err) console.error(`<${Date()}> (ERROR_GET_SALT)`, err);
        bcrypt.hash(password, salt, (e, hash) => {
          if (err) console.error(`<${Date()}> (ERROR_GENERATE_HASH)`, e, { password });
          smtp.get(
            params.input.email,
            hash,
            (err: Error, row: Types.Schema.Values.Registration) => {
              if (err) {
                console.error(`<${Date()}> (ERROR_INSERT_INTO_USERS)`, err);
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
          smtp.finalize();
        });
      });
    });
  });
};

/**
 * Create new visit
 */
export const visit: Types.OrmHandler<Types.Schema.Params.Visit, Types.Schema.Values.Response> = (
  params
) => {
  const { input } = params;

  return new Promise((resolve) => {
    db.serialize(() => {
      const smtp = db.prepare(
        'INSERT INTO visits (path, error, role, user_agent, ip, is_old, width, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        (err: Error) => {
          if (err) {
            console.error(`<${Date()}> (ERROR_PREPARE_INSERT_INTO_VISITS)`, err);
            resolve({
              error: 1,
              message: err.message,
            });
          }
        }
      );
      smtp.get(
        input.path,
        input.error,
        input.role,
        input.user_agent,
        input.ip,
        input.is_old,
        input.width,
        input.height,
        (err: Error, row: Types.Schema.Values.Registration) => {
          if (err) {
            console.error(`<${Date()}> (ERROR_INSERT_INTO_VISITS)`, err);
            resolve({
              error: 1,
              message: err.message,
            });
          } else {
            resolve({
              error: 0,
              data: row,
            });
          }
        }
      );
      smtp.finalize();
    });
  });
};

interface UpdatePassword {
  password: string;
  id: number;
  updated: Date | string;
}

/**
 * Update use password
 */
export const updatePassword: Types.OrmHandler<
  UpdatePassword,
  Types.Schema.Values.Registration | string
> = (params) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      const smtp = db.prepare('UPDATE users SET password=?, updated=? WHERE id=?', (err: Error) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_PREPARE_INSERT_INTO_USERS)`, err);
          resolve({
            error: 1,
            data: err.message,
          });
        }
      });
      const { password, id, updated } = params;
      bcrypt.genSalt(HASH_SALT_LENGTH, (err, salt) => {
        if (err) console.error(`<${Date()}> (ERROR_GET_SALT)`, err);
        bcrypt.hash(password, salt, (e, hash) => {
          if (err) console.error(`<${Date()}> (ERROR_GENERATE_HASH)`, e, { password });
          smtp.get(hash, updated, id, (err: Error, row: Types.Schema.Values.Registration) => {
            if (err) {
              console.error(`<${Date()}> (ERROR_UPDATE_PASSWORD)`, err);
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
          smtp.finalize();
        });
      });
    });
  });
};

interface UpdateUserParams {
  updated: Date | string;
  id: number;
  confirm: boolean;
}

/**
 * Update user
 */
export const updateUser: Types.OrmHandler<
  UpdateUserParams,
  Types.Schema.Values.Registration | string
> = (params) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      const smtp = db.prepare('UPDATE users SET confirm=?, updated=? WHERE id=?', (err: Error) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_PREPARE_UPDATE_USERS)`, err);
          resolve({
            error: 1,
            data: err.message,
          });
        }
      });
      smtp.get(params.confirm, params.updated, params.id, (err: Error, row: undefined) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_UPDATE_USERS)`, err, {
            params,
          });
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
      smtp.finalize();
    });
  });
};

