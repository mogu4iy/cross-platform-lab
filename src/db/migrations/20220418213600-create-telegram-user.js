'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('telegram_chat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chat_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      lib_telegram_chat_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      i18n_language_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('telegram_chat');
  }
};