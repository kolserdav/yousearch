import Sqlite3 from 'sqlite3';
import getConfig from 'next/config';
import path from 'path';
import * as Types from '../../../next-env';
const { serverRuntimeConfig } = getConfig();
const { PROJECT_ROOT } = serverRuntimeConfig;
const sqlite3 = Sqlite3.verbose();
const db = new sqlite3.Database(path.resolve(PROJECT_ROOT, 'database/you.db'));
/**
 * Create table links
 */
export const createTableLinks: Types.OrmHandler<void, any> = () => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS links (\
          rowid INTEGER PRIMARY KEY AUTOINCREMENT,\
          link TEXT,\
          description TEXT,\
          user_id INTEGER NOT NULL,\
          created DATETIME DEFAULT CURRENT_TIMESTAMP,\
          FOREIGN KEY(user_id) REFERENCES users(id)\
        )',
        (err: Error, row: any[]) => {
          if (err) {
            console.error(`<${Date()}> (ERROR_CREATE_TABLE_LINKS)`, err);
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
 * Drop table links
 */
export const dropTableLinks: Types.OrmHandler<void, any> = () => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run('DROP table links', (err: Error, row: any[]) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_DROP_TABLE_LINKS)`, err);
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
 * Add new link
 */
export const createNew: Types.OrmHandler<Types.Schema.Params.Link, Types.Orm.Link> = (params) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      const smtp = db.prepare(
        'INSERT INTO links (link, user_id, description) VALUES (?, ?, ?)',
        (err: Error) => {
          if (err) {
            console.error(`<${Date()}> (ERROR_PREPARE_INSERT_INTO_LINKS)`, err);
            resolve({
              error: 1,
              message: err.message,
            });
          }
        }
      );
      smtp.run(
        params.input.link,
        params.input.userId,
        params.input.description,
        (err: Error, row: Types.Schema.Values.Link) => {
          if (err) {
            console.error(`<${Date()}> (ERROR_INSERT_INTO_LINKS)`, err);
            resolve({
              error: 1,
              message: err.message,
            });
          } else {
            db.get('SELECT last_insert_rowid() as id', (errs, sel) => {
              if (errs) {
                console.error(`<${Date()}> (ERROR_GET_LAST_INSERT_ROWID_LINK)`, err);
                resolve({
                  error: 1,
                  message: err.message,
                });
              }
              resolve({
                error: 0,
                data: sel,
              });
            });
          }
        }
      );
      smtp.finalize();
    });
  });
};

/**
 * Get link by id
 */
export const getById: Types.OrmHandler<number, Types.Orm.Link> = (id) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.get(`SELECT * FROM links WHERE id="${id}"`, (err: Error, row: Types.Orm.Link) => {
        if (err) {
          console.error(`<${Date()}> (ERROR_GET_LINK_BY_ID)`, err);
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