const joi = require("joi");

module.exports = {
    createCategory: joi.object().keys({
        name: joi.string().required(),
    }),
};
