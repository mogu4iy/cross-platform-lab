const store = require('store');
const config = require('../../config');
const db = require('../../db/models');

const STORE_KEY = 'i18n_translation';

const init = async () => {
  const recordList = await db.i18n_translation.findAll({
    where: {},
    include: [],
    logging: false,
    raw: true
  });
  for (const record of recordList) {
    const key = configureStoreKey(`${record['i18n_language_id']}_${record['i18n_key_id']}`);
    let recordObj = store.get(key) ?? {};
    recordObj['value'] = record['value'];
    recordObj['i18n_key_id'] = record['i18n_key_id'];
    recordObj['i18n_language_id'] = record['i18n_language_id'];
    recordObj['id'] = record['id'];
    store.set(key, recordObj);
  }
};

const getAllStore = () => {
  const recordList = [];
  store.each((value, key) => {
    if (checkStoreKey(key)) {
      recordList.push(value);
    }
  });
  return recordList;
};

const getById = (id) => {
  const recordList = [];
  store.each((value, key) => {
    if (checkStoreKey(key)) {
      if (value['id'] === id) {
        recordList.push(value);
      }
    }
  });
  return recordList.length > 0 ? recordList[0] : null;
};

const getStoreByKeys = (data) => {
  const recordList = [];
  store.each((value, key) => {
    if (checkStoreKey(key)) {
      let equal = true;
      for (let dataKey in data) {
        if (data[dataKey] !== value[dataKey]) {
          equal = false;
          break;
        }
      }
      if (equal) {
        recordList.push(value);
      }
    }
  });
  return recordList;
};

const checkStoreKey = (key) => {
  const [store, storeKey] = key.split(':');
  return store === STORE_KEY;
};

const configureStoreKey = (key) => {
  return `${STORE_KEY}:${key}`;
};

export const initI18nTranslationStore = init;
export const i18nTranslationStore = store;
export const getAllI18nTranslationStore = getAllStore;
export const configureI18nTranslationStoreKey = configureStoreKey;
export const checkI18nTranslationStoreKey = checkStoreKey;
export const getI18nTranslationStoreByKeys = getStoreByKeys;
export const getI18nTranslationById = getById;