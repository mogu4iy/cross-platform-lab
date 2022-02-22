import dotenv from 'dotenv';
import path from 'path';
import Console from 'console';

import { ServerConfig, IServerConfig } from './server';
import { TelegramConfig, ITelegramConfig } from './telegram';

const APP_DIR: string = process.cwd();
const NODE_ENV: string = process.env.NODE_ENV ?? 'development';
let ENV_FILE: string = '.env';
if (NODE_ENV === 'development') {
  ENV_FILE = '.env.dev';
}
const resultEnv = dotenv.config({ path: path.resolve(APP_DIR, `./${ENV_FILE}`) });
if (resultEnv.error) {
  Console.log(resultEnv.error);
}

interface IConfig {
  readonly TELEGRAM: ITelegramConfig,
  readonly SERVER: IServerConfig,
  readonly APP_DIR: string,
  readonly NODE_ENV: string
}

const CONFIG: IConfig = {
  SERVER: ServerConfig(),
  TELEGRAM: TelegramConfig(),
  APP_DIR,
  NODE_ENV
};

export default CONFIG;