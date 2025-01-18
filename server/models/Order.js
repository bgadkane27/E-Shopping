const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: String,
    orderId: String,
    cartItems : [
        {
            productId: String,
            name: String,
            image: String,
            price: String,
            quantity: Number
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        landmark: String,
        city:String,
        pincode: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId:String,
    PayerId: String
})

module.exports = mongoose.model("Order", OrderSchema);