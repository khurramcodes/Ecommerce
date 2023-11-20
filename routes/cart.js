const express = require("express");
const {
    addToCart,
    getCart,
    removeFromCart,
} = require("../controller/cart/cartController");
const { verifyToken } = require("../controller/common/authController");
const router = express.Router();

router.post("/add/:id", addToCart);
router.get("/", verifyToken, getCart);
router.delete("/remove/:id", removeFromCart);

module.exports = router;
