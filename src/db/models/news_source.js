'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class news_source extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }

  news_source.init({
    url: DataTypes.STRING,
    rss_path: DataTypes.STRING,
    name: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'news_source',
    tableName: 'news_source'
  });
  return news_source;
};