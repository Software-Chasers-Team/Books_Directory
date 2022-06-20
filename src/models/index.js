'use strict';

require('dotenv').config();

const {Sequelize,DataTypes} = require('sequelize');
const orderModel = require('./myorders-model');
const bookModel = require('./book-model');
const userModel = require('../auth/models/users-model');
const Collection = require('./data-collection');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
    process.env.NODE_ENV === "production" ?
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            native: true
        }
    } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const orderTable = orderModel(sequelize, DataTypes);
const booksTable = bookModel(sequelize, DataTypes);
const userTable = userModel(sequelize, DataTypes);

const orderCollection = new Collection(orderTable);
const booksCollection = new Collection(booksTable);

module.exports = {
    db: sequelize,
    book:booksCollection,
    order:orderCollection,
    users:userTable,
}