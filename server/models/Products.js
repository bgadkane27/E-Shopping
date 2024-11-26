const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salesPrice: Number,
    totalStock: Number
}, {timestamps: true});

const Product = mongoose.model("product", productSchema);

module.exports = Product