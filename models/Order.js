const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Order = db.define('Order', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  products: { type: DataTypes.JSON, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'en_attente' },
  paymentId: { type: DataTypes.STRING },
}, {
  timestamps: true
});

module.exports = { Order };
