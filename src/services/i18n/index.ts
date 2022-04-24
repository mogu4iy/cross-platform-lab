import { I18n } from 'i18n';
import { getI18nLanguageStoreByKeys, getAllI18nLanguageStore } from '../i18nLanguageStore';
import { getAllI18nTranslationStore, getI18nTranslationStoreByKeys } from '../i18nTranslationStore';
import { getI18nKeyById } from '../i18nKeyStore';

export const initI18n = (defaultLang: string | undefined | null): I18n => {
  const defaultLanguage = getI18nLanguageStoreByKeys({ is_default: 1 });
  if (defaultLanguage.length === 0) {
    throw new Error('Default language is absent.');
  }
  const languageList = getAllI18nLanguageStore();
  const translationObj = languageList.reduce((prev, language) => {
    const langTranslation = getI18nTranslationStoreByKeys({ i18n_language_id: language.id })
      .map(translation => {
        const key = getI18nKeyById(translation.i18n_key_id);
        if (!key) {
          return null;
        }
        return { [key.key]: translation.value };
      })
      .reduce((prevTranslation, translation) => ({ ...prevTranslation, ...translation }), {});
    return { ...prev, [language.key]: { ...langTranslation } };
  }, {});
  const i18n = new I18n();
  i18n.configure({
    locales: [...languageList],
    defaultLocale: defaultLang ?? defaultLanguage[0].key,
    staticCatalog: { ...translationObj },
    objectNotation: true
  });
  return i18n;
};