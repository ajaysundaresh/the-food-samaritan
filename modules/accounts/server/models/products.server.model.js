"use strict";

module.exports = function (sequelize, DataTypes) {

  var Product = sequelize.define('product', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 250],
          msg: "Description must be between 1 and 250 characters in length"
        },
      }
    },
    productType: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 250],
          msg: "Description must be between 1 and 250 characters in length"
        },
      }
    },
    unit: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 250],
          msg: "Description must be between 1 and 250 characters in length"
        },
      }
    }
  }, {
      associate: function (models) {
        Product.belongsTo(models.user);
      }
    });
  return Product;
};