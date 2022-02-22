import { Telegraf } from 'telegraf';
import config from '../../config';
import { SceneContext } from '../../types/telegraf';

const telegraf = new Telegraf<SceneContext>(config.TELEGRAM.TOKEN, {});

export default telegraf;