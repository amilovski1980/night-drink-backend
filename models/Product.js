const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Product = db.define('Product', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image: DataTypes.STRING,
});

module.exports = { Product };
