"use strict";

module.exports = function (sequelize, DataTypes) {

  var Donation = sequelize.define('donation', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 250],
          msg: "Description must be between 1 and 250 characters in length"
        },
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
      associate: function (models) {
        Donation.belongsTo(models.account);
        Donation.belongsTo(models.user);
        Donation.belongsTo(models.product);
      }
    });
  return Donation;
};