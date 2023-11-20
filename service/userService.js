const { models } = require("../models");
const bcrypt = require("bcryptjs");

const registerUser = async (data) => {
    data.password = bcrypt.hashSync(data.password, 10);
    const user = await models.user.create(data);
    return user;
};

const loginUser = async (data) => {
    try {
        const { email } = data;
        let user = await models.user.findOne({ where: { email } });
        user = user.dataValues;
        return user;
    } catch (error) {
        console.log(error);
    }
};

const storeToken = async (token) => {
    const storedToken = await models.token.create({ token });
    return storedToken;
};

const verifyToken = async (token) => {
    const verifiedToken = await models.token.findOne({ where: { token } });
    return verifiedToken;
};

module.exports = { registerUser, loginUser, storeToken, verifyToken };
