import { SceneContext } from '../types/telegraf';
import emoji from 'node-emoji';

export const smthWentWrongMessage = (ctx: SceneContext) => {
  return emoji.emojify(ctx.session.i18n.__(`system_message:smth_went_wrong`));
};