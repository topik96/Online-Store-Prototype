'use strict';
module.exports = (sequelize, DataTypes) => {
  var payments = sequelize.define('payments', {
    orders_id: DataTypes.INTEGER,
    bank_account: DataTypes.INTEGER
  }, {});
  payments.associate = function(models) {
    // payments.belongsTo(models.users, {foreignKey:'users_id', targetKey: 'id'})
  };
  return payments;
};