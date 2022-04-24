const store = require('store');
const config = require('../../config');
const db = require('../../db/models');

const STORE_KEY = 'lib_telegram_chat_type';

const init = async () => {
  const recordList = await db.lib_telegram_chat_type.findAll({
    where: {},
    include: [],
    logging: false,
    raw: true
  });
  for (const record of recordList) {
    const key = configureStoreKey(record['key']);
    let recordObj = store.get(key) ?? {};
    recordObj['key'] = record['key'];
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

export const checkStoreKey = (key) => {
  const [store, storeKey] = key.split(':');
  return store === STORE_KEY;
};

const configureStoreKey = (key) => {
  return `${STORE_KEY}:${key}`;
};

export const initLibTelegramChatTypeStore = init;
export const libTelegramChatTypeStore = store;
export const getAllLibTelegramChatTypeStore = getAllStore;
export const configureLibTelegramChatTypeStoreKey = configureStoreKey;
export const checkLibTelegramChatTypeStoreKey = checkStoreKey;
export const getLibTelegramChatTypeStoreByKeys = getStoreByKeys;
export const getLibTelegramChatTypeById = getById;