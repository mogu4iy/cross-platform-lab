import path from 'path';
import { I18n } from 'i18n';
import config from '../../config';
import Console from 'console';

export const initI18n = (): I18n => {
  const i18n = new I18n();
  i18n.configure({
    locales: [...Object.values(config.TELEGRAM.LANGUAGE)],
    defaultLocale: config.TELEGRAM.LANGUAGE.RU,
    directory: path.join(__dirname, 'locales'),
    objectNotation: true
  });
  return i18n;
};