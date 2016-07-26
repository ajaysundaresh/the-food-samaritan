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
    }
  }, {
      associate: function (models) {
        Donation.belongsTo(models.account);
      }
    });
  return Donation;
};