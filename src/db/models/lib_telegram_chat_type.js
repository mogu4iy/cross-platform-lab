'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lib_telegram_chat_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.telegram_chat, {
        foreignKey: 'lib_telegram_chat_type_id'
      });
    }
  }

  lib_telegram_chat_type.init({
    key: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'lib_telegram_chat_type',
    tableName: 'lib_telegram_chat_type'
  });
  return lib_telegram_chat_type;
};