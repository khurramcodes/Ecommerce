const joi = require("joi");

module.exports = {
    registerUser: joi.object().keys({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),

    loginUser: joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required(),
    }),
};
