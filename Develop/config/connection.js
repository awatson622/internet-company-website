require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.JAWSDB_URL
  ? process.env.JAWSDB_URL
  : {
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: 'localhost',
      dialect: 'mysql', // Specify the dialect explicitly
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;

