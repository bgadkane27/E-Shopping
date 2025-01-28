const express = require("express");
const { addProductReview, getProductReview } = require("../../controller/shop/review-controller");

const router = express.Router();

router.post("/add", addProductReview);
router.get("/get/:id", getProductReview);

module.exports = router;