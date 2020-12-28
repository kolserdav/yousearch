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
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          link TEXT,\
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
