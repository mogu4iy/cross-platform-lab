import dotenv from 'dotenv';
import path from 'path';

import { ServerConfig, IServerConfig } from './server';
import { TelegramConfig, ITelegramConfig } from './telegram';
import DB, {IDbConfig} from './db'

const NODE_ENV = process.env.NODE_ENV ?? 'production';
process.env.NODE_ENV = NODE_ENV
if (NODE_ENV !== "docker") {
  const ENV_FILE = '.env';
  const resultEnv = dotenv.config({path: path.resolve(__dirname, `../${ENV_FILE}`)});
  if (resultEnv.error) {
    throw new Error(resultEnv.error.message)
  }
}


interface IConfig {
  readonly TELEGRAM: ITelegramConfig,
  readonly SERVER: IServerConfig,
  readonly DB: IDbConfig,
  readonly APP_DIR: string,
  readonly NODE_ENV: string
}

const CONFIG: IConfig = {
  SERVER: ServerConfig(),
  TELEGRAM: TelegramConfig(),
  DB: DB[NODE_ENV],
  APP_DIR: process.cwd(),
  NODE_ENV
};

export default CONFIG;