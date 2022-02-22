import Console from 'console';
import {
  handlerWrapper,
  TDataFunctionType,
  TPromiseHandlerType
} from '../../utils/errors';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import { mainKeyboard } from './keyboards';

const enterDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const enterPromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  ctx.scene.session.removeMessage = [];
  const keyboardMessage = await ctx.reply(ctx.session.i18n.__('keyboards.main_keyboard.manage_channels'), mainKeyboard(ctx));
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
      Console.log(ctx.update.message.text, ctx.update.message.message_id, '   MANAGE_SUBSCRIPTION');
      switch (ctx.update.message.text) {
        case ctx.session.i18n.__(`keyboards.back_keyboard.back`):
          const sceneHistory = ctx.session.__scenes.state.sceneHistory;
          const backScene = sceneHistory.length > 0 ? sceneHistory[sceneHistory.length - 1] : config.TELEGRAM.SCENE.MANAGE_SUBSCRIPTION;
          const newSceneHistory = sceneHistory.length > 0 ? sceneHistory.slice(sceneHistory.length - 1) : [];
          await ctx.scene.enter(backScene, {
            sceneHistory: newSceneHistory
          });
          break;
        default:
          if (ctx.update.message.text === '/start') {
            await ctx.scene.enter(config.TELEGRAM.SCENE.START, {
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
  Console.log(ctx.scene.session.removeMessage);
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