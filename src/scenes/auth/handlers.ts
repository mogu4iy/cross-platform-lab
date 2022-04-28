import {
  handlerWrapper,
  TDataFunctionType,
  TPromiseHandlerType
} from '../../utils/errors';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import db from '../../db/models';
import { getLibTelegramChatTypeStoreByKeys } from '../../services/libTelegramChatTypeStore';
import { notAvailableMessage } from '../../messages';

const enterDataFunction: TDataFunctionType<SceneContext> = (ctx) => {
  return {};
};

const enterPromiseHandler: TPromiseHandlerType<SceneContext> = async ({ data, ctx, next }) => {
  ctx.scene.session.removeMessage = [];
  if (!('chat' in ctx && ctx.chat && 'id' in ctx.chat && ctx.chat.id)) {
    await ctx.reply('Server error');
  }
  if ('chat' in ctx && ctx.chat && 'id' in ctx.chat && ctx.chat.id && 'type' in ctx.chat && ctx.chat.type) {
    const userDefaults: { [Key: string]: any } = {};
    const chatType = getLibTelegramChatTypeStoreByKeys({ key: ctx.chat.type });
    if (chatType.length === 0) {
      throw new Error(`lib_telegram_chat_type with key '${ctx.chat.type}' is absent is store`);
    }
    userDefaults.lib_telegram_chat_type_id = chatType[0].id;
    // @ts-ignore
    const [telegramChat, created] = await db.telegram_chat.findOrCreate({
      raw: true,
      logging: false,
      where: {
        chat_id: ctx.chat.id
      },
      defaults: {
        chat_id: ctx.chat.id,
        lib_telegram_chat_type_id: chatType[0].id
      }
    });
    if (!telegramChat.i18n_language_id) {
      return await ctx.scene.enter(config.TELEGRAM.SCENE.LANGUAGE, {
        ...ctx.session.__scenes.state,
        sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.START],
        telegram_chat_id: telegramChat.id
      });
    }
    switch (ctx.chat.type) {
      case config.TELEGRAM.CHAT_TYPE.PRIVATE:
        return await ctx.scene.enter(config.TELEGRAM.SCENE.MAIN, {
          ...ctx.session.__scenes.state,
          sceneHistory: [...ctx.session.__scenes.state.sceneHistory, config.TELEGRAM.SCENE.START],
          telegram_chat_id: telegramChat.id
        });
      default:
        return await ctx.reply(notAvailableMessage(ctx));
    }
  }
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