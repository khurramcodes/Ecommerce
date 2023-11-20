const categoryValidation = require("./categoryValidation");
const categoryService = require("../../service/categoryService");

const createCategory = async (req, res) => {
    try {
        const { error, value } = categoryValidation.createCategory.validate(
            req.body,
            {
                abortEarly: false,
            }
        );

        if (error) {
            res.send(error.details.map((err) => err.message));
        } else {
            const newCategory = await categoryService.createCategory(value);
            res.send(newCategory);
        }
    } catch (error) {
        console.log(error);
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        res.send(categories);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createCategory, getCategories };
