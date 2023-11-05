require('dotenv').config()
const process = require('process');
const { Sequelize } = require('sequelize');

const DB_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//const DB_URL = 'postgres://gegqslvn:LgSvSVWLi3mv0JlTGIe6ms0h3HWgLHCO@cornelius.db.elephantsql.com/gegqslvn';

const sequelize = new Sequelize(DB_URL);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection()


module.exports = {
  sequelize
}

