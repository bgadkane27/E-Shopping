const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
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
            items: cartItems.map((item) => ({
              name: item?.name,
              sku: item?.productId,
              price: item?.price.toFixed(2),
              currency: "INR",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "INR",
            total: totalAmount.toFixed(2),
          },
          description: "additional description.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          sucess: false,
          duration: 2000,
          messgae: "Error occurred while processing the payment.",
        });
      }
      const newlyCreatedOrder = new Order({
        userId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId,
        payerId,
      });

      await newlyCreatedOrder.save();

      // const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;
      const approvalURL = paymentInfo?.links?.find(
        (link) => link?.rel === "approval_url"
      )?.href;
      res.status(201).json({
        sucess: true,
        approvalURL,
        orderId: newlyCreatedOrder?._id,
      });
    });
  } catch (e) {
    res.status(500).json({
      sucess: false,
      message: "Failed to create order.",
    });
  }
};

module.exports = { createOrder };
