const Product = require("../../models/Products");
const Order = require("../../models/Order");
const ProductReview = require("../../models/Review");

const addProductReview = async(req, res) =>{
    try{

    const {productId, userId, username, reviewMessage, reviewValue} = req.body;
    
    const order = await Order.findOne({
        userId,
        "cartItems.productId" : productId,
        orderStatus: "Confirmed"
    });

    if(!order){
        return res.status(403).json({
            success: false,
            message: "You are not allowed to review this product."
        })
    }
    
    const checkExistingReview = await ProductReview.findOne({
       productId,
       userId 
    });

    if(checkExistingReview){
        return res.status(400).json({
            success: false,
            message: "You have already reviewed this product."
        })
    }

    const newReview = new ProductReview({
        productId,
        userId,
        username,
        reviewMessage,
        reviewValue
    });

    await newReview.save();

    res.status(200).json({
        success: true,
        message: "Review added successfully."
    });
    
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Unable to review on the product."
        })
    }
}

const getProductReview = async(req, res) =>{
    try{
    const {id} = req.params;
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Unable to review on the product."
        })
    }
}

module.exports = { addProductReview, getProductReview };