const Product = require("../../models/Products");

const searchProducts = async(req, res) =>{
    try{
    const {keyword} = req.params;
    if(!keyword || typeof keyword !== 'string'){
        return res.status(400).json({
            success: false,
            message: 'Keyword is required or must be a type of string.'
        })
    }

    const regEx = new RegExp(keyword, 'i');
    const createSearchQuery = {
        $or : [
            {name: regEx},
            {category: regEx},
            {brand: regEx},
            {description: regEx},
            {salesPrice: regEx},
            {price: regEx},
        ]
    }
    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({
        success: true,
        data: searchResults
    })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Unable to search the mentioned product."
        })
    }
}

module.exports = { searchProducts };