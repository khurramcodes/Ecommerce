const { DataTypes } = require("sequelize");
const sequelize = require("../../common/dbConnections");

const category = sequelize.define(
    "category",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

module.exports = category;
