const { DataTypes } = require("sequelize");
const sequelize = require("../../common/dbConnections");

const token = sequelize.define(
    "token",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

module.exports = token;
