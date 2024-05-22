const { DataTypes } = require('sequelize');
const sequelize = require('./Sequalize'); 

const Property = sequelize.define('property', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pimage: {
    type: DataTypes.STRING(300)
  },
  title: {
    type: DataTypes.STRING(100)
  },
  description: {
    type: DataTypes.TEXT
  },
  address: {
    type: DataTypes.STRING(100)
  },
  bed: {
    type: DataTypes.INTEGER
  },
  area: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.INTEGER
  },
  plink: {
    type: DataTypes.STRING(100)
  },
  type: {
    type: DataTypes.STRING(50)
  },
  room_num: {
    type: DataTypes.INTEGER
  },
  bath_num: {
    type: DataTypes.INTEGER
  },
  floor: {
    type: DataTypes.INTEGER
  },
  heating: {
    type: DataTypes.STRING
  },
  windows: {
    type: DataTypes.STRING
  },
  blinded_door: {
    type: DataTypes.BOOLEAN
  },
  lift: {
    type: DataTypes.BOOLEAN
  },
  internet: {
    type: DataTypes.BOOLEAN
  },
  garbage: {
    type: DataTypes.BOOLEAN
  },
  cable_tv: {
    type: DataTypes.BOOLEAN
  },
  interphone: {
    type: DataTypes.BOOLEAN
  },
  public_parking: {
    type: DataTypes.BOOLEAN
  },
  electricity: {
    type: DataTypes.BOOLEAN
  },
  balcony: {
    type: DataTypes.BOOLEAN
  },
  garage: {
    type: DataTypes.BOOLEAN
  },
  air_conditioning: {
    type: DataTypes.BOOLEAN
  },
  gas: {
    type: DataTypes.BOOLEAN
  },
  construction_year: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'property',
  timestamps: false
});

module.exports = Property;
