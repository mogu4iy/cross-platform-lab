import emoji from 'node-emoji';
import {
  handlerWrapper,
  TDataFunctionType,
  TPromiseHandlerType
} from '../../utils/errors';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import { mainKeyboard } from '../../keyboards';

const enterDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const enterPromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  ctx.scene.session.removeMessage = [];
  const mainKeyboardMessage = await ctx.reply(emoji.emojify(ctx.session.i18n.__(`scene_main__description`)), mainKeyboard(ctx));
  ctx.scene.session.removeMessage.push(mainKeyboardMessage.message_id);
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
        case emoji.emojify(ctx.session.i18n.__('button__info')):
          await ctx.scene.enter(config.TELEGRAM.SCENE.INFO, {
            ...ctx.session.__scenes.state,
            sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.MAIN]
          });
          break;
        case emoji.emojify(ctx.session.i18n.__('button__manage_subscription')):
          await ctx.scene.enter(config.TELEGRAM.SCENE.MANAGE_SUBSCRIPTION, {
            ...ctx.session.__scenes.state,
            sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.MAIN]
          });
          break;
        case emoji.emojify(ctx.session.i18n.__('button__manage_channel')):
          await ctx.scene.enter(config.TELEGRAM.SCENE.MANAGE_CHANNEL, {
            ...ctx.session.__scenes.state,
            sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.MAIN]
          });
          break;
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
            sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.MAIN]
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