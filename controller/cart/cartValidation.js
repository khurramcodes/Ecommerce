const joi = require("joi");

module.exports = {
    addToCart: joi.object().keys({
        id: joi.number().required(),
        userID: joi.number().required(),
    }),

    getCart: joi.object().keys({
        userID: joi.number().required(),
    }),

    removeFromCart: joi.object().keys({
        id: joi.number().required(),
        userID: joi.number().required(),
    }),
};
