const { DataTypes } = require('sequelize');
const sequelize = require('./Sequalize'); 

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true 
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  dateadded: {
    type: DataTypes.DATE,
    allowNull: true
  },
  datechanged: {
    type: DataTypes.DATE,
    allowNull: true 
  },
  lastlogin: {
    type: DataTypes.DATE,
    allowNull: true 
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true 
  },
  expirydate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tempsecret: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  qrcode: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false 
});

module.exports = Users;
