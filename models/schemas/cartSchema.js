const { DataTypes } = require("sequelize");
const sequelize = require("../../common/dbConnections");

const cart = sequelize.define(
    "cart",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

module.exports = cart;
