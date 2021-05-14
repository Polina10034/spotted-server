require('dotenv').config();

const x = {
  development: {
    server: process.env.DB_SERVER,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  },
  test: {
    server: process.env.DB_SERVER,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  },
  production: {
    server: process.env.DB_SERVER,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  },
};
module.exports = x;
