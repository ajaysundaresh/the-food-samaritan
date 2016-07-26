"use strict";

module.exports = function(sequelize, DataTypes) {

  var Account = sequelize.define('account', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 250],
          msg: "Account Name must be between 1 and 250 characters in length"
        },
      }
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 10],
          msg: "Phone Number must be between 1 and 10 characters in length"
        },
      }
    },
    faxNumber: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    emailAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    associate: function(models) {
      Account.belongsTo(models.user);
    }
  });
  return Account;
};