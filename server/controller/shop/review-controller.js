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

    const reviews = await ProductReview.find({productId});

    const totalReviewsLength = reviews.length;
    const averageReview = reviews.reduce((sum, reviewItem)=> sum + reviewItem.reviewValue, 0) / totalReviewsLength;

    await Product.findByIdAndUpdate(productId, {averageReview});

    res.status(201).json({
        success: true,
        data: newReview
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
    const {productId} = req.params;
    
    const reviews = await ProductReview.find({productId});

    res.status(200).json({
        success: true,
        data: reviews
    })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Unable to get the product review."
        })
    }
}

module.exports = { addProductReview, getProductReview };