const Cart = require("../../models/Cart");
const Product = require("../../models/Products");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid product details.",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        sucess: false,
        message: "Product not found.",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId._id.toString() === productId
    );
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      sucess: true,
      data: cart,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Error Occured: Not able to add product to cart.",
    });
  }
};

const fetchCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        sucess: false,
        message: "User id is mandatory.",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image name price salesPrice",
    });
    if (!cart) {
      return res.status(404).json({
        sucess: false,
        message: "Cart not found.",
      });
    }

    const validItems = cart.items.filter(
      (productitem) => productitem.productId
    );
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      name: item.productId.name,
      price: item.productId.price,
      salesPrice: item.productId.salesPrice,
      quantity: item.quantity,
    }));
    res.status(200).json({
      sucess: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Error Occured: Not able to fetch product to cart.",
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity < 0) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid product details.",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        sucess: false,
        message: "Cart not found.",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        sucess: false,
        message: "Product not found in cart.",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image name price salesPrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      name: item.productId ? item.productId.name : "Product not found",
      price: item.productId ? item.productId.price : null,
      salesPrice: item.productId ? item.productId.salesPrice : null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      sucess: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Error Occured: Not able to update product in cart.",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid product details.",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image name price salesPrice",
    });
    if (!cart) {
      return res.status(404).json({
        sucess: false,
        message: "Cart not found.",
      });
    }
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image name price salesPrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      name: item.productId ? item.productId.name : "Product not found",
      price: item.productId ? item.productId.price : null,
      salesPrice: item.productId ? item.productId.salesPrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      sucess: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Error Occured: Not able to delete product from cart.",
    });
  }
};

module.exports = { addToCart, fetchCartItem, updateCartItem, deleteCartItem };
