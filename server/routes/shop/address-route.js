const express = require("express");
const { getAllAddress, addAddress, editAddress, deleteAddress } = require("../../controller/shop/address-controller");

const router = express.Router();

router.get("/get/:userId", getAllAddress);
router.post("/add", addAddress);
router.put("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

module.exports = router;