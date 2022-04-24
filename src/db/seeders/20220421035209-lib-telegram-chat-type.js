'use strict';
const moment = require('moment');
module.exports = {
  async up(queryInterface, Sequelize) {
    let libTelegramChatTypeList = [{
      key: 'private'
    }, {
      key: 'group'
    }, {
      key: 'supergroup'
    }, {
      key: 'channel'
    }];
    const libTelegramChatTypeExistList = await queryInterface.rawSelect('lib_telegram_chat_type',
      {
        plain: false
      }, []);
    const libTelegramChatTypeExistKeyList = libTelegramChatTypeExistList.map(type => type.key);
    libTelegramChatTypeList = libTelegramChatTypeList
      .filter(type => !libTelegramChatTypeExistKeyList.includes(type.key))
      .map(type => {
        return {
          ...type,
          updated_at: moment().toDate(),
          created_at: moment().toDate()
        };
      });
    if (libTelegramChatTypeList.length !== 0) {
      await queryInterface.bulkInsert('lib_telegram_chat_type', [...libTelegramChatTypeList]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lib_telegram_chat_type', null, {});
  }
};
