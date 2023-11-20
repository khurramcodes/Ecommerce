const cartValidation = require("./cartValidation");
const cartService = require("../../service/cartService");

const addToCart = async (req, res) => {
    try {
        const { error, value } = cartValidation.addToCart.validate(
            { id: req.params.id, ...req.body },
            {
                abortEarly: false,
            }
        );
        if (error) {
            return res.send(error.details.map((err) => err.message));
        } else {
            const productID = Number(req.params.id);
            const { userID } = value;
            await cartService.addToCart(productID, userID);
            res.status(200).json({
                message: "Product Added to Cart Successfully",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const getCart = async (req, res) => {
    try {
        const { error, value } = cartValidation.getCart.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.send(error.details.map((err) => err.message));
        } else {
            const cartItems = await cartService.getCart(value.userID);
            res.send(cartItems);
        }
    } catch (error) {
        console.log(error);
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { error, value } = cartValidation.removeFromCart.validate(
            { id: req.params.id, ...req.body },
            {
                abortEarly: false,
            }
        );
        if (error) {
            return res.send(error.details.map((err) => err.message));
        } else {
            const productID = Number(req.params.id);
            const { userID } = value;
            await cartService.removeFromCart(userID, productID);
            res.status(200).json({
                message: "Product Removed From Cart Successfully",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = { addToCart, getCart, removeFromCart };
