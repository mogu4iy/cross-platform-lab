import { SceneContext } from '../types/telegraf';
import emoji from 'node-emoji';

export const smthWentWrongMessage = (ctx: SceneContext) => {
  return emoji.emojify(ctx.session.i18n.__(`system_message__smth_went_wrong`));
};

export const notAvailableMessage = (ctx: SceneContext) => {
  return emoji.emojify(ctx.session.i18n.__(`system_message__chat_type_not_available`));
};