import Address from "@/components/shop-view/address";
import accImg from "../../assets/checkout.webp";
import { useSelector } from "react-redux";
import CartItemsContent from "@/components/shop-view/cart-items-content";
import { Button } from "@/components/ui/button";

function ShopCheckout() {

  const { cartItems } = useSelector(state => state.shopCart);
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

  console.log("cartItems", cartItems);

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
        <Address />
        <div className="flex flex-col gap-4 border rounded-lg p-6 overflow-auto">
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map(item => <CartItemsContent cartItem={item} />)
              : null
          }
          <div className="flex items-center justify-between mt-2 mr-5">
            <span className="font-medium ml-2">Subtotal</span>
            <span className="font-medium">₹ {totalCartAmount}</span>
          </div>
          <div className="flex items-center">
            <Button variant="default" className="w-full">Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCheckout;
