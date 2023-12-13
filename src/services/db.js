const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  define: {
    timestamps: false, // Disable automatic timestamps for each model
  },
  ssl:false,
  dialectOptions: {
    ssl:false
  },
});

module.exports = sequelize;
