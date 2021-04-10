import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';

import publicRoutes from './src/routes/public';
import apiRoutes from './src/routes/api';
import adminRoutes from './src/routes/admin';
import apiMiddleware from './src/middleware/apiAuth';
import adminMiddleware from './src/middleware/adminAuth';
import errorHandler from './src/middleware/errorHandler';

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(express.urlencoded({ extended: true }));

const whitelist = [
  'http://localhost:3000',
];

const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/pub', publicRoutes);
app.use('/api', apiMiddleware, apiRoutes);
app.use('/api/admin', apiMiddleware, adminMiddleware, adminRoutes);
app.use(errorHandler);

module.exports = app;
