import Console from 'console';
import { session, Scenes } from 'telegraf';
import telegraf from './services/telegraf';
import config from './config';

import startScene from './scenes/start';
import languageScene from './scenes/language';
import mainScene from './scenes/main';
import infoScene from './scenes/info';
import manageSubscriptionScene from './scenes/manageSubscription';
import manageChannelsScene from './scenes/manageChannels';

import { SceneContext } from './types/telegraf';
import { initI18n } from './services/i18n';

const stage = new Scenes.Stage<SceneContext>([
  startScene,
  languageScene,
  mainScene,
  infoScene,
  manageSubscriptionScene,
  manageChannelsScene
], {
  ttl: 60
});

telegraf.use(session());
telegraf.use(stage.middleware());
telegraf.use(async (ctx, next) => {
  if (!ctx.session.i18n) {
    ctx.session.i18n = await initI18n();
  }
  return next();
});
telegraf.start(async (ctx) => {
  const welcomeMessage = await ctx.reply(ctx.session.i18n.__('scenes.start.welcome'));
  setTimeout(() => {
    ctx.deleteMessage(welcomeMessage.message_id);
    ctx.scene.enter(config.TELEGRAM.SCENE.START, {
      sceneHistory: []
    });
  }, 1000);
});
telegraf.on('message', async (ctx) => {
  if (!ctx.session.__scenes.current) {
    const welcomeMessage = await ctx.reply(ctx.session.i18n.__('scenes.start.welcome'));
    setTimeout(() => {
      ctx.deleteMessage(welcomeMessage.message_id);
      ctx.scene.enter(config.TELEGRAM.SCENE.START, {
        sceneHistory: []
      });
    }, 1000);
  }
  await ctx.deleteMessage(ctx.message.message_id);
});
telegraf.catch((error: any) => {
  Console.log('Bot error : ', error);
});

export default telegraf;