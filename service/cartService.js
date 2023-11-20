const { models } = require("../models");

const addToCart = async (productID, userID) => {
    try {
        let userCart = await models.cart.findOne({
            where: { userID },
        });

        if (!userCart) {
            userCart = await models.cart.create({ userID });
        }

        const product = await models.product.findByPk(productID);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await userCart.addProduct(product);
        return;
    } catch (error) {
        console.log(error);
    }
};

const getCart = async (userID) => {
    try {
        const cartItems = await models.cart.findOne({
            where: { userID },
            include: [
                {
                    model: models.product,
                    through: models.product_cart,
                },
            ],
        });
        return cartItems;
    } catch (error) {
        console.log(error);
    }
};

const removeFromCart = async (userID, productID) => {
    try {
        let userCart = await models.cart.findOne({
            where: { userID },
        });
        if (userCart) {
            userCart = await models.product_cart.destroy({
                where: { productID },
            });
        }
        return;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { addToCart, getCart, removeFromCart };
