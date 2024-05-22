const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('spacescout', 'postgres', process.env.POSTGRESQL_PASS, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;