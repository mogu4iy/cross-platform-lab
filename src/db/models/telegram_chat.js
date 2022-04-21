'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class telegram_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.i18n_language, {
        foreignKey: 'i18n_language_id'
      });
      this.belongsTo(models.lib_telegram_chat_type, {
        foreignKey: 'lib_telegram_chat_type_id'
      });
    }
  }

  telegram_user.init({
    chat_id: DataTypes.INTEGER,
    lib_telegram_chat_type_id: {
      type: DataTypes.INTEGER,
      reference: 'lib_telegram_chat_type',
      key: 'id'
    },
    i18n_language_id: {
      type: DataTypes.INTEGER,
      reference: 'i18n_language',
      key: 'id'
    }
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'telegram_chat',
    tableName: 'telegram_chat'
  });
  return telegram_user;
};