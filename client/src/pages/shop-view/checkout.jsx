import Address from "@/components/shop-view/address";
import accImg from "../../assets/checkout.webp";
function ShopCheckout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[250px] overflow-hidden">
        <img
          src={accImg}
          alt="Checkout Image"
          className="w-full h-full rounded-md object-cover object-center absolute top-0 left-0"
        />
      </div>     
        <Address />      
    </div>
  );
}

export default ShopCheckout;
