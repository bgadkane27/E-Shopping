const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Products");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;

    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      message: "Image uploaded successfully.",
      result
    });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Image upload failed." });
  }
};

// add a new product
const addProduct = async (req, res) => {
  try {

    const { image, name, description, category, brand, price, salesPrice, totalStock } = req.body;
    const newlyCreatedProduct = new Product({ image, name, description, category, brand, price, salesPrice, totalStock });

    await newlyCreatedProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully.",
      data: newlyCreatedProduct
    })

  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Add product failed." });
  }
};
// update a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, name, description, category, brand, price, salesPrice, totalStock } = req.body;

    let findProduct = await Product.findById(id);

    if (!findProduct) return res.status(404).json({
      status: false,
      message: "Product not found"
    })

    findProduct.image = image || findProduct.image
    findProduct.name = name || findProduct.name
    findProduct.description = description || findProduct.description
    findProduct.category = category || findProduct.category
    findProduct.brand = brand || findProduct.brand
    findProduct.price = price == '' ? 0 : price || findProduct.price
    findProduct.salesPrice = salesPrice == '' ? 0 : salesPrice || findProduct.salesPrice
    findProduct.totalStock = totalStock || findProduct.totalStock

    await findProduct.save();

    res.status(200).json({
      success: true,
      data: findProduct
    })


  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Update product failed." });
  }
};
// delete a product
const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;
    const productDelete = await Product.findByIdAndDelete(id)

    if (!productDelete) return res.status(404).json({
      success: false,
      message: "product not found"
    })

    res.status(200).json({
      success: true,
      message: "Product deleted successfully."
    })

  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Delete product failed." });
  }
};

// get all products

const getAllProduct = async (req, res) => {
  try {

    const listOfProduct = await Product.find()
    res.status(200).json({
      success: true,
      data: listOfProduct
    })

  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Get all products failed." });
  }
};

module.exports = { handleImageUpload, addProduct, editProduct, deleteProduct, getAllProduct };