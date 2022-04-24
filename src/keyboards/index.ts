import { Markup } from 'telegraf';
import { SceneContext } from '../types/telegraf';
import config from '../config';
import { ACTIONS } from '../actions';
import { backButton, callbackButton, infoButton, manageChannelButton, manageSubscriptionButton } from '../buttons';
import { getAllI18nLanguageStore } from '../services/i18nLanguageStore';
import emoji from 'node-emoji';


export const backKeyboard = (ctx: SceneContext) => {
  const buttonList = [
    backButton(ctx)
  ];
  let keyboard = Markup.keyboard([...buttonList], {});
  keyboard = keyboard.resize();
  return keyboard;
};

export const languageKeyboard = (ctx: SceneContext) => {
  const languageList = getAllI18nLanguageStore();
  const buttonList = languageList
    .map(language => {
      return Markup.button.callback(emoji.emojify(ctx.session.i18n.__(`lang_${language.key}`)),
        ACTIONS.choose_language.action({ action: language.key }),
        false);
    });
  return Markup.inlineKeyboard([...buttonList], {});
};


export const mainKeyboard = (ctx: SceneContext) => {
  const buttonList = [
    infoButton(ctx, false),
    manageChannelButton(ctx, false),
    manageSubscriptionButton(ctx, false),
    backButton(ctx, false)
  ];
  let keyboard = Markup.keyboard([...buttonList], {});
  keyboard = keyboard.resize();
  return keyboard;
};