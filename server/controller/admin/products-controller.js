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
  try{

    const {image, name, description, category, brand, price, salesPrice, totalStock} = req.body;
    const newlyCreatedProduct = new Product.create({image, name, description, category, brand, price, salesPrice, totalStock});
    
    await newlyCreatedProduct.save();

    res.status(201).json({
      sucess: true,
      message: "Product added successfully.",
      data: newlyCreatedProduct
    })

  }catch(e){
    console.log(e);
    res.json({ sucess: false, message: "Add product failed." });
  }
};
// update a product
const updateProduct = async (req, res) => {
  try{
    const {id} = req.params;
    const {image, name, description, category, brand, price, salesPrice, totalStock} = req.body;

  }catch(e){
    console.log(e);
    res.json({ sucess: false, message: "Update product failed." });
  }
};
// delete a product
const deleteProduct = async (req, res) => {
  try{

    const {id} = req.params;
   
  }catch(e){
    console.log(e);
    res.json({ sucess: false, message: "Delete product failed." });
  }
};

// get all products

const getAllProduct = async (req, res) => {
  try{

    const listOfPrroduct = await Product.find({});
    res.status(200).json({
      sucess: true,
      message: "Get all products successfully.",
      data: listOfPrroduct
    })

  }catch(e){
    console.log(e);
    res.json({ sucess: false, message: "Get all products failed." });
  }
};


module.exports = { handleImageUpload, addProduct, updateProduct, deleteProduct, getAllProduct };