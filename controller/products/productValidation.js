const joi = require("joi");

module.exports = {
    createProduct: joi.object().keys({
        title: joi.string().required(),
        slug: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        quantity: joi.number().integer().min(0).required(),
        categoryID: joi.number().required(),
    }),

    getProductById: joi.object().keys({
        id: joi.number().integer().required(),
    }),

    updateProduct: joi.object().keys({
        id: joi.number().integer().required(),
        title: joi.string().optional(),
        slug: joi.string().optional(),
        price: joi.number().optional(),
        description: joi.string().optional(),
        quantity: joi.number().integer().min(0).optional(),
        categoryID: joi.number().optional(),
    }),

    deleteProduct: joi.object().keys({
        id: joi.number().integer().required(),
    }),
};
