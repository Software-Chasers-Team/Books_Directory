'use strict';
const orderModel = (sequelize, DataTypes) => sequelize.define('MyOrders', {
    title: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        defaultValue: "----",
        required: true
    },
    price: {
        type: DataTypes.STRING,
        required: true
    },
    bookExist: {
        type: DataTypes.BOOLEAN,
    }
});

module.exports = orderModel;