const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Products");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;

    const result = await imageUploadUtil(url);

    res.json({
      sucess: true,
      message: "Image uploaded successfully.",
      result
    });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Image upload failed." });
  }
};

// add a new product
const addProduct = async (req, res) => {
  try {

    const { image, name, description, category, brand, price, salesPrice, totalStock } = req.body;
    const newlyCreatedProduct = new Product({ image, name, description, category, brand, price, salesPrice, totalStock });

    await newlyCreatedProduct.save();

    res.status(201).json({
      sucess: true,
      message: "Product added successfully.",
      data: newlyCreatedProduct
    })

  } catch (e) {
    console.log(e);
    res.json({ sucess: false, message: "Add product failed." });
  }
};
// update a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, name, description, category, brand, price, salesPrice, totalStock } = req.body;

    const findProduct = await Product.findById(id);

    if (!findProduct) return res.status(404).json({
      status: false,
      message: "Product not found"
    })

    findProduct.image = image || findProduct.image
    findProduct.name = name || findProduct.name
    findProduct.description = description || findProduct.description
    findProduct.category = category || findProduct.category
    findProduct.brand = brand || findProduct.brand
    findProduct.price = price || findProduct.price
    findProduct.salesPrice = salesPrice || findProduct.salesPrice
    findProduct.totalStock = totalStock || findProduct.totalStock

    await findProduct.save();

    res.status(200).json({
      sucess: true,
      data: findProduct
    })


  } catch (e) {
    console.log(e);
    res.json({ sucess: false, message: "Update product failed." });
  }
};
// delete a product
const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;
    const productDelete = await Product.findByIdAndDelete(id)

    if(!productDelete) return res.status(404).json({
      sucess: false,
      message: "product not found"
    })

    res.status(200).json({
      sucess: true,
      message: "Product deleted sucessfully."
    })

  } catch (e) {
    console.log(e);
    res.json({ sucess: false, message: "Delete product failed." });
  }
};

// get all products

const getAllProduct = async (req, res) => {
  try {

    const listOfProduct = await Product.find()
    res.status(200).json({
      sucess: true,
      data: listOfProduct
    })

  } catch (e) {
    console.log(e);
    res.json({ sucess: false, message: "Get all products failed." });
  }
};


module.exports = { handleImageUpload, addProduct, editProduct, deleteProduct, getAllProduct };