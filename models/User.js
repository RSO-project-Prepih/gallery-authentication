const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const logger = require('../logger');

const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

User.sync().then(() => {
    logger.log({ level: 'info', message: 'User model synced!' });
});

module.exports = User;
