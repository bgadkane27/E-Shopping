const express = require("express");
const { getAllAddress, addAddress, updateAddress, deleteAddress } = require("../../controller/shop/address-controller");

const router = express.Router();

router.get("/get/:userId", getAllAddress);
router.post("/add", addAddress);
router.put("/update/:userId/:addressId", updateAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

module.exports = router;