import Address from "@/components/shop-view/address";
import accImg from "../../assets/checkout.webp";
import { useDispatch, useSelector } from "react-redux";
import CartItemsContent from "@/components/shop-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ShopCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const {user} = useSelector(state=> state.auth)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const navigate = useNavigate();


  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items
        .reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salesPrice > 0
              ? currentItem?.salesPrice
              : currentItem?.price) *
            currentItem?.quantity,
          0
        )
        .toFixed(2)
      : 0;

  function handleInitiatePaypalPayment() {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map(singleCartItem => ({
          productId: singleCartItem?.productId,
          name: singleCartItem?.name,
          image: singleCartItem?.image,
          price: singleCartItem?.salesPrice > 0 ? singleCartItem?.salesPrice : singleCartItem?.price,
          quantity: singleCartItem?.quantity
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        landmark: currentSelectedAddress?.landmark,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      orderStatus: 'pending',
      paymentMethod : 'paypal',
      paymentStatus : 'pending',
      totalAmount: totalCartAmount ,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      PayerId: ''
    }
    
    console.log("orderData", orderData);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[250px] overflow-hidden">
        <img
          src={accImg}
          alt="Checkout Image"
          className="w-full h-full rounded-md object-cover object-center absolute top-0 left-0"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4 border rounded-lg p-6 overflow-auto">
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            <>
              {cartItems.items.map((item) => (
                <CartItemsContent key={item.id} cartItem={item} />
              ))}
              <div className="flex items-center justify-between mt-2 mr-5">
                <span className="font-medium ml-2">Subtotal</span>
                <span className="font-medium">₹ {totalCartAmount}</span>
              </div>
              <div className="flex items-center">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={handleInitiatePaypalPayment}>
                  Checkout with Paypal
                </Button>
              </div>
            </>
          ) :
            <>
              <img src="/checkout.webp" alt="Empty Cart" className="max-w-[250px] mx-auto mt-6" />
              <p className="text-center text-red-500 font-semibold">No products are available for checkout.</p>
              <p className="text-center text-green-500 font-semibold">Start shopping to add items.</p>
              <Button variant="outline" size="lg" className="flex items-center justify-center mt-4 mx-auto"
                onClick={() => {
                  navigate("/shop/home")
                }}>Go Home</Button>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default ShopCheckout;
