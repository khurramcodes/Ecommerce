const productValidation = require("./productValidation");
const productService = require("../../service/productService");

const createProduct = async (req, res) => {
    try {
        const { error, value } = productValidation.createProduct.validate(
            req.body,
            {
                abortEarly: false,
            }
        );
        if (error) {
            res.send(error.details.map((err) => err.message));
        } else {
            const product = await productService.createProduct(value);
            res.send(product);
        }
    } catch (error) {
        console.log(error);
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.send(products);
    } catch (error) {
        console.log(error);
    }
};

const getProductById = async (req, res) => {
    try {
        const { error, value } = productValidation.getProductById.validate(
            { id: req.params.id },
            {
                abortEarly: true,
            }
        );
        if (error) {
            return res.send(error.details.map((err) => err.message));
        } else {
            const productID = Number(value.id);
            const data = await productService.getProductById(productID);
            res.send(data);
        }
    } catch (error) {
        console.log(error);
    }
};

const updateProduct = async (req, res) => {
    try {
        const { error, value } = productValidation.updateProduct.validate(
            { id: req.params.id, ...req.body },
            {
                abortEarly: true,
            }
        );
        if (error) {
            return res.send(error.details.map((err) => err.message));
        } else {
            const productID = Number(req.params.id);
            const updatedProductData = value;
            const data = await productService.updateProduct(
                productID,
                updatedProductData
            );
            res.status(200).send(data);
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { error, value } = productValidation.deleteProduct.validate(
            { id: req.params.id },
            {
                abortEarly: true,
            }
        );
        if (error) {
            return res.send(error.details.map((err) => err.message));
        } else {
            const productID = Number(value.id);
            await productService.deleteProduct(productID);
            res.status(200).json({ message: "Product Deleted Successfully" });
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
