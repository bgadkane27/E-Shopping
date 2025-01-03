const express = require("express");
const { addToCart, fetchCartItem, updateCartItem, deleteCartItem } = require("../../controller/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userID", fetchCartItem);    
router.put("/update/:userID", updateCartItem);
router.delete("/delete/:userID/:productId", deleteCartItem);

module.exports = router;