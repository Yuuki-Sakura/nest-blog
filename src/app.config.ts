/**
 * App config.
 * @file 应用运行配置
 * @module app/config
 */

import path from 'path';

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

export const DATABASE = {
  HOST: 'localhost',
  PORT: 3306,
  USERNAME: 'root',
  PASSWORD: 'lys.0828',
  DATABASE: 'nest_blog',
};
