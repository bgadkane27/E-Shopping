const Product = require("../../models/Products");

const getFilterProduct = async (req, res) => {
  try {
    const { category =[], brand= [], sortBy = "asc" } = req.query
    let filters = {};

    if (category.length > 0) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length > 0) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};
    switch(sortBy) {
      case 'asc':
        sort.salesPrice = 1;
        break;
      case 'desc':
        sort.salesPrice = -1;
        break;
      case 'atoz':
        sort.name = 1;
        break;
      case 'ztoa':
        sort.name = -1;
        break;  
      default:
        sort.price = 1;
        break;
    }    

    const listOfProduct = await Product.find(filters).sort(sort);
    res.status(200).json({
      success: true,
      data: listOfProduct,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        success: false,
        message: "Some error occured while fetching products.",
      });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product) {
      return res.status(404).json({
        success: false,
        message: "Product not available."
      })
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({
        success: false,
        message: "Error Occured: Not able to fetch product details.",
      });
  }
};

module.exports = { getFilterProduct, getProductDetails };
