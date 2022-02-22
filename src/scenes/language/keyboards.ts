import { Markup } from 'telegraf';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import { ACTIONS } from './actions';

export const chooseLanguageKeyboard = (ctx: SceneContext) => {
  const buttonList = Object.values(config.TELEGRAM.LANGUAGE)
    .map(lang => {
      return Markup.button.callback(ctx.session.i18n.__(`scenes.language.${lang}`),
        ACTIONS.choose_lang.action({ lang }),
        false);
    });
  return Markup.inlineKeyboard([...buttonList], {});
};

