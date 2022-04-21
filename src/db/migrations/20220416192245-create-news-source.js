'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('news_source', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            key: {
                allowNull: false,
                type: Sequelize.STRING
            },
            url: {
                allowNull: false,
                type: Sequelize.STRING
            },
            rss_path: {
                allowNull: false,
                type: Sequelize.STRING
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
        await queryInterface.dropTable('news_source');
    }
};