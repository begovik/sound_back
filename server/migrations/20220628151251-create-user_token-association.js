'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('user_tokens', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user-token-association',
      references: {
        table: 'users',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('user_tokens', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user-token-association',
      references: {
        table: 'users',
        field: 'id'
      }
    })
  }
};
