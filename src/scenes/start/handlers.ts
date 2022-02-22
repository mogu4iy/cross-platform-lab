import Console from 'console';
import {
  handlerWrapper,
  TDataFunctionType,
  TPromiseHandlerType
} from '../../utils/errors';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';

const enterDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const enterPromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  ctx.scene.session.removeMessage = [];
  const user = null;
  if (!user) {
    return await ctx.scene.enter(config.TELEGRAM.SCENE.LANGUAGE, {
      sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.START],
    });
  }
  return await ctx.scene.enter(config.TELEGRAM.SCENE.MAIN, {
    sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.START]
  });
};

export const enterController = handlerWrapper({
  dataFunction: enterDataFunction,
  promiseHandler: enterPromiseHandler
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