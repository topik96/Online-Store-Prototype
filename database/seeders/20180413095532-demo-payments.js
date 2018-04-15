'use strict';

const Chance = require('chance');
const chance = new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {

    let user = [];
    for (let i = 0; i < 20; i++) {
      user.push({
        orders_id: chance.integer({ min: 1, max: 25 }),
        bank_account: chance.integer({ min: 12051508, max: 381025810 }),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('payments', user, {});
  },

  down: (queryInterface, Sequelize) => {

    // Example:
    return queryInterface.bulkDelete('payments', null, {});

  }
};