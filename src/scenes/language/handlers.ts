import {
  handlerWrapper,
  TDataFunctionType,
  TPromiseHandlerType
} from '../../utils/errors';
import { SceneContext } from '../../types/telegraf';
import Console from 'console';
import config from '../../config';
import { chooseLanguageKeyboard } from './keyboards';
import { ACTIONS } from './actions';

const enterDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const enterPromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  ctx.scene.session.removeMessage = [];
  const keyboard = chooseLanguageKeyboard(ctx);
  const chooseLangKeyboardMessage = await ctx.reply(ctx.session.i18n.__('scenes.language.choose_lang'), keyboard);
  ctx.scene.session.removeMessage.push(chooseLangKeyboardMessage.message_id);
};

export const enterController = handlerWrapper({
  dataFunction: enterDataFunction,
  promiseHandler: enterPromiseHandler
});

const chooseLanguageDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const chooseLanguagePromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  if ('callbackQuery' in ctx && ctx.callbackQuery) {
    const ctxData = ctx.callbackQuery;
    if ('data' in ctxData && ctxData.data) {
      const langData = ACTIONS.choose_lang.parse(ctxData.data);
      if ('lang' in langData && langData.lang) {
        ctx.session.i18n.setLocale(langData.lang);
      }
      return await ctx.scene.enter(config.TELEGRAM.SCENE.MAIN, {
        sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.LANGUAGE]
      });
    }
  }
  await ctx.reply('Something went wrong');
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