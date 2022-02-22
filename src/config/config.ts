import dotenv from 'dotenv';
import path from 'path';
import Console from 'console';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
let ENV_FILE = '.env';
if (NODE_ENV === 'development') {
  ENV_FILE = '.env.dev';
}
const resultEnv = dotenv.config({ path: path.resolve(__dirname, `../${ENV_FILE}`) });
if (resultEnv.error) {
  Console.log(resultEnv.error);
}

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'alfex',
    host: 'db',
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION
  }
};