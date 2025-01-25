const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Products");

const createOrder = async (req, res) => {
  try{
    const{userId, 
      cartId,
      cartItems, 
      addressInfo, 
      orderStatus, 
      paymentMethod, 
      paymentStatus, 
      totalAmount, 
      orderDate, 
      orderUpdateDate, 
      paymentId, 
      payerId} = req.body;

      const create_payment_json= {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:5173/shop/paypal-return",
          cancel_url: "http://localhost:5173/shop/paypal-cancel",
        },
        transactions: [
          {
            item_list: {
              items: cartItems.map((item)=>({
                name: item?.name,
                sku: item?.productId,
                price: item?.price.toFixed(2),
                currency: "USD",
                quantity: item.quantity
              }))
            },
            amount: {
              currency: "USD",
              total: totalAmount
            },
            description: "additional description."
          }
        ]
      };

      paypal.payment.create(create_payment_json, async(error, paymentInfo)=>{
        if(error){
          console.log(error);
          return res.status(500).json({
            success: false,
            messgae: "Error occurred while processing the payment."
          });
        }else{
          const newlyCreatedOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId
          })

          await newlyCreatedOrder.save();
          const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;
          res.status(201).json({
            success: true,
            approvalURL,
            orderId: newlyCreatedOrder._id
          })
        }
      })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
};
const capturePayment = async (req, res) => {
  try{
    const {orderId, paymentId, payerId} = req.body;

    let order = await Order.findById(orderId);
    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order not found."
      });
    }

    order.paymentStatus = "Paid";
    order.orderStatus= "Confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for(let item of order.cartItems){
      let product = await Product.findById(item.productId);

      if(!product){
        return res.status(404).json({
          success: false,
          message: `Not enough stock fro the product ${product.name}`
        })
      }
      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment captured successfully."
    })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to capture payment.",
    });
  }
};

const getAllOrderByUser = async (req, res) => {
  try{
    const {userId} = req.params;

    let orders = await Order.find({userId});
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

const getOrderDetails = async (req, res) => {
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

module.exports = { createOrder, capturePayment, getAllOrderByUser, getOrderDetails };
