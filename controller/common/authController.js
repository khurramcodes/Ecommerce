const bcrypt = require("bcryptjs");
const userValidation = require("../user/userValidation");
const userService = require("../../service/userService");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const generateToken = (data) => {
    return jwt.sign(data, config.jwtSecret);
};

const registerUser = async (req, res) => {
    try {
        const { error, value } = userValidation.registerUser.validate(
            req.body,
            {
                abortEarly: false,
            }
        );
        if (error) {
            res.send(error.details.map((err) => err.message));
        } else {
            const newUser = await userService.registerUser(value);
            res.send(newUser);
        }
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { error, value } = userValidation.loginUser.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            res.send(error.details.map((err) => err.message));
        } else {
            const user = await userService.loginUser(value);
            if (user && bcrypt.compare(value.password, user.password)) {
                const token = generateToken({ id: user.id });
                await userService.storeToken(token);
                res.json({ token });
            } else {
                res.send("Wrong Credentials");
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        token = token && token.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "Token not found" });
        } else {
            const verifiedToken = await userService.verifyToken(token);
            if (!verifiedToken) {
                return res.status(403).json({ message: "Token not verified" });
            }
            jwt.verify(token, config.jwtSecret, (err, data) => {
                if (err) {
                    return res
                        .status(403)
                        .json({ message: "Token is expired" });
                }
                next();
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = { registerUser, loginUser, verifyToken };
