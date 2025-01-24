const express = require("express");
const { getAllOrderForAdmin, getOrderDetailsForAdmin, updateOrderStatus } = require("../../controller/admin/order-controller");

const router = express.Router();

router.get("/get", getAllOrderForAdmin);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;