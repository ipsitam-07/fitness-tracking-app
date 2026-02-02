import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config';

export const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, {
  host: dbConfig.dbHost,
  dialect: 'postgres',
  logging: console.log,
});
