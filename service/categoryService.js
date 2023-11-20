const { models } = require("../models");

const createCategory = async (data) => {
    const category = await models.category.create(data);
    return category;
};

const getCategories = async () => {
    const categories = await models.category.findAll();
    return categories;
};

module.exports = { createCategory, getCategories };
