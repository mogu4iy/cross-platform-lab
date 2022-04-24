import emoji from 'node-emoji';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import {
  handlerWrapper,
  TDataFunctionType,
  TPromiseHandlerType
} from '../../utils/errors';
import { ACTIONS } from '../../actions';
import { backKeyboard, languageKeyboard } from '../../keyboards';
import { smthWentWrongMessage } from '../../messages';
import { configureI18nLanguageStoreKey, i18nLanguageStore } from '../../services/i18nLanguageStore';
import db from '../../db/models';

const enterDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const enterPromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  ctx.scene.session.removeMessage = [];
  const titleMessage = await ctx.reply(emoji.emojify(ctx.session.i18n.__(`scene_language__title`)), backKeyboard(ctx));
  ctx.scene.session.removeMessage.push(titleMessage.message_id);
  const keyboardMessage = await ctx.reply(emoji.emojify(ctx.session.i18n.__('scene_language__description')), languageKeyboard(ctx));
  ctx.scene.session.removeMessage.push(keyboardMessage.message_id);
};

export const enterController = handlerWrapper({
  dataFunction: enterDataFunction,
  promiseHandler: enterPromiseHandler
});

const messageDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const messagePromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  if ('message' in ctx.update) {
    ctx.scene.session.removeMessage.push(ctx.update.message.message_id);
    if ('text' in ctx.update.message) {
      switch (ctx.update.message.text) {
        case emoji.emojify(ctx.session.i18n.__(`button__back`)):
          const sceneHistory = ctx.session.__scenes.state.sceneHistory;
          const backScene = sceneHistory.length > 0 ? sceneHistory[sceneHistory.length - 1] : config.TELEGRAM.SCENE.MAIN;
          const newSceneHistory = sceneHistory.length > 0 ? sceneHistory.slice(0, sceneHistory.length - 1) : [];
          await ctx.scene.enter(backScene, {
            ...ctx.session.__scenes.state,
            sceneHistory: newSceneHistory
          });
          break;
        case '/language':
          await ctx.scene.enter(config.TELEGRAM.SCENE.LANGUAGE, {
            ...ctx.session.__scenes.state,
            sceneHistory: [...ctx.session.__scenes.state.sceneHistory]
          });
          break;
        default:
          if (ctx.update.message.text === '/start') {
            await ctx.scene.enter(config.TELEGRAM.SCENE.START, {
              ...ctx.session.__scenes.state,
              sceneHistory: []
            });
            break;
          }
      }
    }
  }
};

export const messageController = handlerWrapper({
  dataFunction: messageDataFunction,
  promiseHandler: messagePromiseHandler
});

const leaveDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const leavePromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  if (Array.isArray(ctx.scene.session.removeMessage)) {
    for (const messageId of ctx.scene.session.removeMessage) {
      await ctx.deleteMessage(messageId);
    }
  }
};

export const leaveController = handlerWrapper({
  dataFunction: leaveDataFunction,
  promiseHandler: leavePromiseHandler
});

const chooseLanguageDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const chooseLanguagePromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  if ('callbackQuery' in ctx && ctx.callbackQuery) {
    const ctxData = ctx.callbackQuery;
    if ('data' in ctxData && ctxData.data) {
      const langData = ACTIONS.choose_language.parse(ctxData.data);
      if ('action' in langData && langData.action) {
        ctx.session.i18n.setLocale(langData.action);
        const language = i18nLanguageStore.get(configureI18nLanguageStoreKey(langData.action));
        if (!language) {
          throw new Error(`Language with key '${langData.action}' is absent.`);
        }
        // @ts-ignore
        await db.telegram_chat.update({
          i18n_language_id: language.id
        }, {
          raw: true,
          logging: false,
          where: {
            id: ctx.session.__scenes.state.telegram_chat_id
          }
        });
      }
      return await ctx.scene.enter(config.TELEGRAM.SCENE.MAIN, {
        ...ctx.session.__scenes.state,
        sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.LANGUAGE]
      });
    }
  }
  await ctx.reply(smthWentWrongMessage(ctx));
  const sceneHistory = ctx.session.__scenes.state.sceneHistory;
  const backScene = sceneHistory.length > 0 ? sceneHistory[sceneHistory.length - 1] : config.TELEGRAM.SCENE.MAIN;
  const newSceneHistory = sceneHistory.length > 0 ? sceneHistory.slice(sceneHistory.length - 1) : [];
  return await ctx.scene.enter(backScene, {
    sceneHistory: newSceneHistory
  });
};

export const chooseLanguageController = handlerWrapper({
  dataFunction: chooseLanguageDataFunction,
  promiseHandler: chooseLanguagePromiseHandler
});
