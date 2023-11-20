const { models } = require("../models");
const category = require("../models/schemas/categorySchema");

const createProduct = async (data) => {
    try {
        const product = await models.product.create(data);
        return product;
    } catch (error) {
        console.log(error);
    }
};

const getProducts = async () => {
    try {
        const products = await models.product.findAll({
            include: [
                {
                    model: category,
                    attributes: ["name"],
                },
            ],
        });
        return products;
    } catch (error) {
        console.log(error);
    }
};

const getProductById = async (productID) => {
    try {
        const product = await models.product.findByPk(productID, {
            include: models.category,
        });
        if (product) {
            return product;
        }
        return " No Product Found";
    } catch (error) {
        console.log(error);
    }
};
const updateProduct = async (productID, updatedProductData) => {
    try {
        const product = await models.product.findByPk(productID);
        if (product) {
            product.update(updatedProductData);
            return product;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (productID) => {
    try {
        const product = await models.product.findByPk(productID);
        if (product) {
            product.destroy();
            return;
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
