const express = require("express");
const { getFilterProduct, getProductDetails } = require("../../controller/shop/products-controller");


const router = express.Router();

router.get("/get", getFilterProduct);
router.get("/get/:id", getProductDetails);

module.exports = router;
