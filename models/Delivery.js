const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Delivery = db.define('Delivery', {
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  deliveryGuyId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'assigned' },
  location: { type: DataTypes.JSON, allowNull: true }
}, {
  timestamps: true
});

module.exports = { Delivery };
