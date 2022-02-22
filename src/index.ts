import Console from 'console';
import bot from './bot';

bot.launch().then(r => {
  Console.log('Bot launched', r);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));