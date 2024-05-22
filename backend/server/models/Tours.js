const { DataTypes } = require('sequelize');
const sequelize = require('./Sequalize'); 

const Tours = sequelize.define('tours', {
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
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tourdate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tourtime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  property_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'property',
      key: 'id'
    }
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'tours',
  timestamps: false
});

module.exports = Tours;
