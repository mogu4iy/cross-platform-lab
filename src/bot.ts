import Console from 'console';
import { session, Scenes } from 'telegraf';
import telegraf from './services/telegraf';
import config from './config';

import startScene from './scenes/start';
import languageScene from './scenes/language';
import mainScene from './scenes/main';
import infoScene from './scenes/info';
import manageSubscriptionScene from './scenes/manageSubscription';
import manageChannelScene from './scenes/manageChannel';

import { SceneContext } from './types/telegraf';
import { initI18n } from './services/i18n';
import { getI18nLanguageStoreByKeys } from './services/i18nLanguageStore';

const stage = new Scenes.Stage<SceneContext>([
  startScene,
  languageScene,
  mainScene,
  infoScene,
  manageSubscriptionScene,
  manageChannelScene
], {
  ttl: 60
});

telegraf.use(session());
telegraf.use(stage.middleware());
telegraf.use(async (ctx, next) => {
  if (!ctx.session.i18n) {
    if ('chatMember' in ctx && ctx.chatMember && 'from' in ctx.chatMember && ctx.chatMember.from && 'language_code' in ctx.chatMember.from && ctx.chatMember.from.language_code) {
      const defaultLanguage = getI18nLanguageStoreByKeys({ key: ctx.chatMember.from.language_code });
      if (defaultLanguage.length > 0) {
        ctx.session.i18n = await initI18n(defaultLanguage[0].key);
        return next();
      }
    }
    ctx.session.i18n = await initI18n(null);
  }
  return next();
});

telegraf.command('start', async (ctx) => {
  if (!ctx.session.__scenes.current) {
    ctx.scene.enter(config.TELEGRAM.SCENE.START, {
      ...ctx.session.__scenes.state,
      sceneHistory: []
    });
  }
  await ctx.deleteMessage(ctx.message.message_id);
});

telegraf.command('language', async (ctx) => {
  if (!ctx.session.__scenes.current) {
    ctx.scene.enter(config.TELEGRAM.SCENE.LANGUAGE, {
      ...ctx.session.__scenes.state,
      sceneHistory: []
    });
  }
  await ctx.deleteMessage(ctx.message.message_id);
});

telegraf.on('message', async (ctx) => {
  Console.log(ctx.message)
  if (!ctx.session.__scenes.current) {
    ctx.scene.enter(config.TELEGRAM.SCENE.START, {
      ...ctx.session.__scenes.state,
      sceneHistory: []
    });
  }
  await ctx.deleteMessage(ctx.message.message_id);
});

telegraf.catch((error: any) => {
  Console.log('Bot error : ', error);
});

export default telegraf;