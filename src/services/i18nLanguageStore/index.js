const store = require('store');
const config = require('../../config');
const db = require('../../db/models');

const STORE_KEY = 'i18n_language';

const init = async () => {
  const recordList = await db.i18n_language.findAll({
    where: {},
    include: [],
    logging: false,
    raw: true
  });
  for (const record of recordList) {
    const key = configureStoreKey(record['key']);
    let recordObj = store.get(key) ?? {};
    recordObj['key'] = record['key'];
    recordObj['name'] = record['name'];
    recordObj['is_default'] = record['is_default'];
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
  const [store, storeLanguage] = key.split(':');
  return store === STORE_KEY;
};

const configureStoreKey = (key) => {
  return `${STORE_KEY}:${key}`;
};

export const initI18nLanguageStore = init;
export const i18nLanguageStore = store;
export const getAllI18nLanguageStore = getAllStore;
export const configureI18nLanguageStoreKey = configureStoreKey;
export const checkI18nLanguageStoreKey = checkStoreKey;
export const getI18nLanguageStoreByKeys = getStoreByKeys;
export const getI18nLanguageById = getById;