'use strict';
const moment = require('moment');
module.exports = {
  async up(queryInterface, Sequelize) {
    const languageObj = {
      EN: {
        name: 'English',
        key: 'en',
        is_default: true
      },
      RU: {
        name: 'Russian',
        key: 'ru',
        is_default: false
      },
      UA: {
        name: 'Ukrainian',
        key: 'ua',
        is_default: false
      }
    };
    const languageExistList = await queryInterface.rawSelect('i18n_language', {
      plain: false
    }, []);
    for (let language of Object.values(languageObj)) {
      let languageExist = languageExistList.filter(lang => lang.key === language.key);
      languageExist = languageExist.length > 0 ? languageExist[0]['id'] : null;
      if (!languageExist) {
        languageExist = (await queryInterface.bulkInsert('i18n_language', [{
          ...language,
          created_at: moment().toDate(),
          updated_at: moment().toDate()
        }], { returning: true }));
      }
      language['id'] = languageExist;
    }
    const translationKeyObj = {
      LANG_UA: {
        key: 'lang_ua'
      },
      LANG_RU: {
        key: 'lang_ru'
      },
      LANG_EN: {
        key: 'lang_en'
      },
      BUTTON_BACK: {
        key: 'button__back'
      },
      SCENE_LANGUAGE__TITLE: {
        key: 'scene_language__title'
      },
      SCENE_LANGUAGE__DESCRIPTION: {
        key: 'scene_language__description'
      },
      SCENE_INFO__TITLE: {
        key: 'scene_info__title'
      },
      BUTTON__INFO: {
        key: 'button__info'
      },
      BUTTON__MANAGE_SUBSCRIPTION: {
        key: 'button__manage_subscription'
      },
      BUTTON__MANAGE_CHANNEL: {
        key: 'button__manage_channel'
      },
      SCENE_MANAGE_SUBSCRIPTION__TITLE: {
        key: 'scene_manage_subscription__title'
      },
      SCENE_MANAGE_CHANNEL__TITLE: {
        key: 'scene_manage_channel__title'
      },
      SCENE_MAIN__DESCRIPTION: {
        key: 'scene_main__description'
      },
      SYSTEM_MESSAGE_CHAT_TYPE_NOT_AVAILABLE: {
        key: 'system_message__chat_type_not_available'
      },
      SYSTEM_MESSAGE_SMT_WENT_WRONG: {
        key: 'system_message__smth_went_wrong'
      }
    };
    const translationKeyExistList = await queryInterface.rawSelect('i18n_key', {
      plain: false
    }, []);
    for (let translationKey of Object.values(translationKeyObj)) {
      let keyExist = translationKeyExistList.filter(transKey => transKey.key === translationKey.key);
      keyExist = keyExist.length > 0 ? keyExist[0]['id'] : null;
      if (!keyExist) {
        keyExist = (await queryInterface.bulkInsert('i18n_key', [{
          ...translationKey,
          created_at: moment().toDate(),
          updated_at: moment().toDate()
        }], { returning: true }));
      }
      translationKey['id'] = keyExist;
    }
    const translationList = [{
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.LANG_RU['id'],
      value: '??????????????'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.LANG_RU['id'],
      value: '??????????????'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.LANG_RU['id'],
      value: '??????????????'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.LANG_EN['id'],
      value: 'English'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.LANG_EN['id'],
      value: 'English'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.LANG_EN['id'],
      value: 'English'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.LANG_UA['id'],
      value: '????????????????????'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.LANG_UA['id'],
      value: '????????????????????'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.LANG_UA['id'],
      value: '????????????????????'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.BUTTON_BACK['id'],
      value: ':arrow_left: ??????????'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.BUTTON_BACK['id'],
      value: ':arrow_left: Back'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.BUTTON_BACK['id'],
      value: ':arrow_left: ??????????'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.SCENE_LANGUAGE__TITLE['id'],
      value: '???????? :globe_with_meridians:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.SCENE_LANGUAGE__TITLE['id'],
      value: 'Language :globe_with_meridians:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.SCENE_LANGUAGE__TITLE['id'],
      value: '???????? :globe_with_meridians:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.SCENE_LANGUAGE__DESCRIPTION['id'],
      value: '???????????????? ???????? ???? ???????????????????????????? :arrow_down:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.SCENE_LANGUAGE__DESCRIPTION['id'],
      value: 'Choose one of above :arrow_down:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.SCENE_LANGUAGE__DESCRIPTION['id'],
      value: '???????????????? ???????? ?? ?????????????????? :arrow_down:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.SCENE_INFO__TITLE['id'],
      value: '???????????????????? :grey_question:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.SCENE_INFO__TITLE['id'],
      value: 'Information :grey_question:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.SCENE_INFO__TITLE['id'],
      value: '???????????????????? :grey_question:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.BUTTON__INFO['id'],
      value: '???????????????????? :grey_question:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.BUTTON__INFO['id'],
      value: 'Information :grey_question:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.BUTTON__INFO['id'],
      value: '???????????????????? :grey_question:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.BUTTON__MANAGE_CHANNEL['id'],
      value: '?????????????????? ???????????????? :speaking_head_in_silhouette:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.BUTTON__MANAGE_CHANNEL['id'],
      value: 'Manage channels :speaking_head_in_silhouette:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.BUTTON__MANAGE_CHANNEL['id'],
      value: '???????????????? ???????????????? :speaking_head_in_silhouette:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.BUTTON__MANAGE_SUBSCRIPTION['id'],
      value: '?????????????????? ???????????????????? :bust_in_silhouette:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.BUTTON__MANAGE_SUBSCRIPTION['id'],
      value: 'Manage subscriptions :bust_in_silhouette:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.BUTTON__MANAGE_SUBSCRIPTION['id'],
      value: '???????????????? ???????????????????? :bust_in_silhouette:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.SCENE_MAIN__DESCRIPTION['id'],
      value: '?????? ?????? ????????????????????? :arrow_down:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.SCENE_MAIN__DESCRIPTION['id'],
      value: 'What do you need? :arrow_down:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.SCENE_MAIN__DESCRIPTION['id'],
      value: '???? ?????? ????????????????? :arrow_down:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.SCENE_MANAGE_SUBSCRIPTION__TITLE['id'],
      value: '?????????????????? ???????????????????? :bust_in_silhouette:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.SCENE_MANAGE_SUBSCRIPTION__TITLE['id'],
      value: 'Manage subscriptions :bust_in_silhouette:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.SCENE_MANAGE_SUBSCRIPTION__TITLE['id'],
      value: '???????????????? ???????????????????? :bust_in_silhouette:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.SCENE_MANAGE_CHANNEL__TITLE['id'],
      value: '?????????????????? ???????????????? :speaking_head_in_silhouette:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.SCENE_MANAGE_CHANNEL__TITLE['id'],
      value: 'Manage channels :speaking_head_in_silhouette:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.SCENE_MANAGE_CHANNEL__TITLE['id'],
      value: '???????????????? ???????????????? :speaking_head_in_silhouette:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.SYSTEM_MESSAGE_CHAT_TYPE_NOT_AVAILABLE['id'],
      value: '???????? ?????? ???????? ???? ???????????????????????????? ?????????? ?????????? :blush:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.SYSTEM_MESSAGE_CHAT_TYPE_NOT_AVAILABLE['id'],
      value: 'This chat type is not available for out bot :blush:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.SYSTEM_MESSAGE_CHAT_TYPE_NOT_AVAILABLE['id'],
      value: '?????? ?????? ???????? ???? ?????????????????????????? ?????????? ?????????? :blush:'
    }, {
      i18n_language_id: languageObj.RU['id'],
      i18n_key_id: translationKeyObj.SYSTEM_MESSAGE_SMT_WENT_WRONG['id'],
      value: '??????-???? ?????????? ???? ?????? :sob:'
    }, {
      i18n_language_id: languageObj.EN['id'],
      i18n_key_id: translationKeyObj.SYSTEM_MESSAGE_SMT_WENT_WRONG['id'],
      value: 'Something went wrong :sob:'
    }, {
      i18n_language_id: languageObj.UA['id'],
      i18n_key_id: translationKeyObj.SYSTEM_MESSAGE_SMT_WENT_WRONG['id'],
      value: '???????? ?????????? ???? ?????? :sob:'
    }
    ];
    const translationExistList = await queryInterface.rawSelect('i18n_translation', {
      plain: false
    }, []);
    for (let translation of translationList) {
      let translationExist = translationExistList.filter(trans => {
        return trans.value === translation.value &&
          trans.i18n_language_id === translation.i18n_language_id &&
          trans.i18n_key_id === translation.i18n_key_id;
      });
      translationExist = translationExist.length > 0 ? translationExist[0]['id'] : null;
      if (!translationExist) {
        translationExist = (await queryInterface.bulkInsert('i18n_translation', [{
          ...translation,
          created_at: moment().toDate(),
          updated_at: moment().toDate()
        }], { returning: true }));
      }
      translation['id'] = translationExist;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('i18n_language', null, {});
    await queryInterface.bulkDelete('i18n_key', null, {});
    await queryInterface.bulkDelete('i18n_translation', null, {});
  }
};
