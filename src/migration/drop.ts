import { readdirSync } from 'fs';
import { join } from 'path';
import { union } from 'lodash';
import { db } from './index';
import { Migration } from './type';
import { Operation } from './enum';

let tasks: Function[] = [];
readdirSync(join(__dirname, './migration')).map(file => {
  const migrations = require(join(__dirname, `./migration/${file}`));
  const funcArray: Function[] = [];
  for (const i in migrations) {
    const migration: Migration = migrations[i];
    if (migration.opt === Operation.drop) {
      funcArray.push(() => db.schema.dropTable(<string>migration.table));
    }
  }
  tasks = union(tasks, funcArray);
});

const schedule = async () => {
  for await (const task of tasks) {
    await task();
  }
  console.log('sync db done!');
  process.exit();
};

schedule();
