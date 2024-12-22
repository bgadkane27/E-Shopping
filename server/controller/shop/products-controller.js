const Product = require("../../models/Products");

const getFilterProduct = async (req, res) => {
  try {
    const listOfProduct = await Product.find();
    res.status(200).json({
      sucess: true,
      data: listOfProduct,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        sucess: false,
        message: "Some error occured while fetching products.",
      });
  }
};

module.exports = { getFilterProduct };
