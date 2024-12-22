const express = require("express");
const { getFilterProduct } = require("../../controller/shop/products-controller");


const router = express.Router();

router.get("/get", getFilterProduct);

module.exports = router;
