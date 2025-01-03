const mongoose= require("mongoose");

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
},
{timestamps: true}
);

module.exports = mongoose.model("cart", cartSchema);