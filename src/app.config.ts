/**
 * App config.
 * @file 应用运行配置
 * @module app/config
 */

import path from 'path';
import { argv } from 'yargs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
const PROJECT_ROOT_PATH = path.join(__dirname, '..');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require(path.resolve(PROJECT_ROOT_PATH, 'package.json'));
// console.log(process.env);
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

export const ORMModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
});

export const cacheModule = CacheModule.register();

export const jwtModule = JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRES },
});

export const AUTH = {
  expiresIn: argv.auth_expires_in || 3600,
  data: argv.auth_data || { user: 'root' },
  jwtTokenSecret: argv.auth_key || 'nest-blog',
  defaultPassword: argv.auth_default_password || 'root',
};
