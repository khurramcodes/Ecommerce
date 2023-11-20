const sequelize = require("../common/dbConnections");
const user = require("../models/schemas/userSchema");
const token = require("../models/schemas/tokenSchema");
const category = require("../models/schemas/categorySchema");
const product = require("../models/schemas/productSchema");
const cart = require("../models/schemas/cartSchema");

const models = sequelize.models;

category.hasMany(product, {
    onDelete: "CASCADE",
    foreignKey: { name: "categoryID", allowNull: false },
});

product.belongsTo(category, {
    onDelete: "CASCADE",
    foreignKey: { name: "categoryID", allowNull: false },
});

user.hasOne(cart, {
    onDelete: "CASCADE",
    foreignKey: { name: "userID", allowNull: false, unique: true },
});

cart.belongsTo(user, {
    onDelete: "CASCADE",
    foreignKey: { name: "userID", allowNull: false, unique: true },
});

product.belongsToMany(cart, {
    onDelete: "CASCADE",
    through: "product_cart",
    foreignKey: { name: "productID", allowNull: false },
});

cart.belongsToMany(product, {
    onDelete: "CASCADE",
    through: "product_cart",
    foreignKey: { name: "cartID", allowNull: false },
});

module.exports = { sequelize, models };
