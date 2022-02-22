import { Markup } from 'telegraf';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';

export const mainKeyboard = (ctx: SceneContext) => {
  const buttonList = [
    Markup.button.text(ctx.session.i18n.__(`keyboards.back_keyboard.back`),
      false)
  ];
  let keyboard = Markup.keyboard([...buttonList], {});
  keyboard = keyboard.resize();
  return keyboard;
};