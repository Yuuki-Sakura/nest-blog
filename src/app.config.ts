/**
 * App config.
 * @file 应用运行配置
 * @module app/config
 */

import path from 'path';
import { argv } from 'yargs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const APP_ROOT_PATH = __dirname;
const PROJECT_ROOT_PATH = path.join(APP_ROOT_PATH, '..');
const FE_PATH = path.join(PROJECT_ROOT_PATH, '..', 'zy.ci');
const FE_PUBLIC_PATH = path.join(FE_PATH, 'public');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require(path.resolve(PROJECT_ROOT_PATH, 'package.json'));

export const APP = {
  LIMIT: 16,
  PORT: 8000,
  MASTER: '结城桜',
  NAME: 'Nest Blog',
  URL: 'https://zy.ci',
  FRONT_END_PATH: FE_PATH,
  FRONT_END_PUBLIC_PATH: FE_PUBLIC_PATH,
  ROOT_PATH: APP_ROOT_PATH,
  PROJECT_ROOT_PATH,
};

export const PROJECT = {
  name: packageJSON.name,
  version: packageJSON.version,
  author: packageJSON.author,
  // site: APP.URL,
  // homepage: packageJSON.homepage,
  // issues: packageJSON.bugs.url,
};

export const CROSS_DOMAIN = {
  allowedOrigins: ['https://zy.ci', 'https://admin.zy.ci'],
  allowedReferer: 'zy.ci',
};

export const TYPEORM: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: (argv.dbport as number) || 3306,
  username: (argv.db_username as string) || 'root',
  password: (argv.db_password as string) || 'lys.0828',
  database: 'nest_blog',
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};

export const AUTH = {
  expiresIn: argv.auth_expires_in || 3600,
  data: argv.auth_data || { user: 'root' },
  jwtTokenSecret: argv.auth_key || 'nest-blog',
  defaultPassword: argv.auth_default_password || 'root',
};
