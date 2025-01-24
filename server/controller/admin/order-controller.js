const Order = require("../../models/Order");

const getAllOrderForAdmin = async (req, res) => {
  try{
    let orders = await Order.find({});
    if(!orders.length){
      return res.status(404).json({
        success: false,
        message: "Orders not found."
      });
    }
    res.status(200).json({
      success: true,
      data:orders
    })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details.",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try{
    const {id} = req.params;

    let order = await Order.findById(id);
    if(!order){
      return res.status(404).json({
        success: false,
        message: "Orders not found."
      });
    }
    res.status(200).json({
      success: true,
      data:order
    })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details.",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try{

    const {id} = req.params;
    const {orderStatus} = req.body;

    let order = await Order.findById(id);
    if(!order){
      return res.status(404).json({
        success: false,
        message: "Orders not found."
      });
    }

    await Order.findByIdAndUpdate(id, {orderStatus}, {new: true});

    res.status(200).json({
      success: true,
      message: "Order status updated successfully."
    })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to update order details.",
    });
  }
};

module.exports = { getAllOrderForAdmin, getOrderDetailsForAdmin, updateOrderStatus };