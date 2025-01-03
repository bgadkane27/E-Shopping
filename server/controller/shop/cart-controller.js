const Cart = require("../../models/Cart");
const Product = require("../../models/Products");

const addToCart = async (req, res) => {
    try {
        const { userID, productId, quantity } = req.body;
        if (!userID || !productId || quantity < 0) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid product details."
            })
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                sucess: false,
                message: "Product not found."
            })
        }

        const cart = await Cart.findOne({ userID });
        if (!cart) {
            cart = new Cart({ userID, items: [] });
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productID.toString() == productId);
        if (findCurrentProductIndex != -1) {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }
        else {
            cart.items.push({ productID: productId, quantity });
        }

        await cart.save();
        res.status(200).json({
            sucess: true,
            data: cart
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            sucess: false,
            message: "Error Occured: Not able to add product to cart.",
        });
    }
}

const fetchCartItem = async (req, res) => {
    try {
        const { userID } = req.params;
        if (!userID) {
            return res.status(400).json({
                sucess: false,
                message: "User id is mandatory."
            })
        }
        const cart = await Cart.findOne({ userID }).populate({
            path: "items.productID",
            select: "image name price salesPrice"
        })
        if (!cart) {
            return res.status(404).json({
                sucess: false,
                message: "Cart not found."
            })
        }

        const validItems = cart.items.filter(item => item.productID);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populateCartItems = validItems.map(item => ({
            productID: item.productID._id,
            image: item.productID.image,
            name: item.productID.name,
            price: item.productID.price,
            salesPrice: item.productID.salesPrice,
            quantity: item.quantity
        }))
        res.status(200).json({
            sucess: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            sucess: false,
            message: "Error Occured: Not able to fetch product to cart.",
        });
    }
}

const updateCartItem = async (req, res) => {
    try {
        const { userID, productId, quantity } = req.body;
        if (!userID || !productId || quantity < 0) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid product details."
            })
        }

        const cart = await Cart.findOne({ userID });
        if (!cart) {
            return res.status(404).json({
                sucess: false,
                message: "Cart not found."
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productID.toString() == productId);
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                sucess: false,
                message: "Product not found in cart."
            })
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "items.productID",
            select: "image name price salesPrice"
        })

        const populateCartItems = cart.items.map(item => ({
            productID: item.productID ? item.productID._id : null,
            image: item.productID ? item.productID.image : null,
            name: item.productID ? item.productID.name : 'Product not found',
            price: item.productID ? item.productID.price : null,
            salesPrice: item.productID ? item.productID.salesPrice : null,
            quantity: item.quantity
        }))
        res.status(200).json({
            sucess: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });

    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            sucess: false,
            message: "Error Occured: Not able to update product in cart.",
        });
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const { userID, productId } = req.params;
        if (!userID || !productId) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid product details."
            })
        }

        const cart = await Cart.findOne({ userID }).populate({
            path: "items.productID",
            select: "image name price salesPrice"
        })
        if (!cart) {
            return res.status(404).json({
                sucess: false,
                message: "Cart not found."
            })
        }
        cart.items = cart.items.filter(item => item.productID.toString() !== productId);
        await cart.save();

        await cart.populate({
            path: "items.productID",
            select: "image name price salesPrice"
        })

        const populateCartItems = cart.items.map(item => ({
            productID: item.productID ? item.productID._id : null,
            image: item.productID ? item.productID.image : null,
            name: item.productID ? item.productID.name : 'Product not found',
            price: item.productID ? item.productID.price : null,
            salesPrice: item.productID ? item.productID.salesPrice : null,
            quantity: item.quantity
        }))

        res.status(200).json({
            sucess: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            sucess: false,
            message: "Error Occured: Not able to delete product from cart.",
        });
    }
}

module.exports = { addToCart, fetchCartItem, updateCartItem, deleteCartItem };