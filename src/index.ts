import Console from 'console';
import bot from './bot';
import { initI18nLanguageStore } from './services/i18nLanguageStore';
import { initI18nKeyStore } from './services/i18nKeyStore';
import { initI18nTranslationStore } from './services/i18nTranslationStore';
import { initNewsSourceStore } from './services/newsSourceStore';
import { initNewsCategoryStore } from './services/newsCategoryStore';
import { initLibTelegramChatTypeStore } from './services/libTelegramChatTypeStore';

async function start() {
  await initI18nLanguageStore();
  await initI18nKeyStore();
  await initI18nTranslationStore();
  await initNewsSourceStore();
  await initNewsCategoryStore();
  await initLibTelegramChatTypeStore()
  await bot.launch()
  Console.log('Bot launched');
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

start();
