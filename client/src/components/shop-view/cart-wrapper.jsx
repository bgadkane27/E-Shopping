import { CircleCheck } from "lucide-react";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemsContent from "./cart-items-content";

function Cartwrapper({ cartItems }) {

  const totalCartAmount = cartItems && cartItems.length > 0 ? 
  cartItems.reduce((sum, currentItem) => sum + 
  (currentItem?.salesPrice > 0 ? currentItem?.salesPrice : currentItem?.price)* currentItem?.quantity, 0).toFixed(2) : 0;

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>Your Basket</SheetTitle>
      </SheetHeader>
      {/* Scrollable content area */}
      <div className="mt-8 space-y-4 flex-grow overflow-y-auto">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItemsContent key={index} cartItem={item} />
          ))
        ) : (
          <p className="text-gray-500">Your basket is empty.</p>
        )}
      </div>
      {/* Total section */}
      <div className="mt-4">
        <div className="flex items-center justify-between mr-6">
          <span className="font-medium">Total</span>
          <span className="font-medium">₹ {totalCartAmount}</span>
        </div>
      </div>
      {/* Checkout button */}
      <Button className="mt-4 w-full flex items-center justify-center">
        <CircleCheck className="mr-2" /> CheckOut
      </Button>
    </SheetContent>
  );
}

export default Cartwrapper;
