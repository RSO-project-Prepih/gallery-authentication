const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        primaryKey: true,
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
    }
}, {
    timestamps: true,
});

User.sync().then(() => {
    console.log("User Model synced");
});

module.exports = User;
