import { CircleCheck } from "lucide-react";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemsContent from "./cart-items-content";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";

function Cartwrapper({ cartItems }) {
const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems
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

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full">
      <SheetHeader>
        <SheetTitle className="text-xl font-bold bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent">
          Shopping Cart
        </SheetTitle>
        <Separator />
      </SheetHeader>
      {/* Scrollable content area */}
      <div className="mt-4 space-y-4 flex-grow overflow-y-auto">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItemsContent key={index} cartItem={item} />
          ))
        ) : (
          <>
          <img src="/cart1.png" alt="Empty Cart" className="w-1/4 mx-auto mt-4"/>
          <p className="text-gray-500 text-center">
            Your shopping cart is empty. <br /> Start shopping to add items.
          </p>
          <Button variant="outline" size="lg" className="flex items-center justify-center mt-4 mx-auto" onClick={() => navigate("/shop/home")}>Go Home</Button>
          </>
        )}
      </div>
      {
        cartItems && cartItems.length > 0 && (
          <>
          <div className="mt-4">
            <div className="flex items-center justify-between mr-6">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">₹ {totalCartAmount}</span>
            </div>
          </div>
          <Button
          className="mt-2 w-full flex items-center justify-center"
          disabled={cartItems?.length === 0}
        >
          <CircleCheck className="mr-1" /> CheckOut
        </Button>
        </>
        )
      }
    </SheetContent>
  );
}

export default Cartwrapper;
