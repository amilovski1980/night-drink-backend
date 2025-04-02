const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'client' // client | livreur | admin
  }
});

module.exports = { User };
