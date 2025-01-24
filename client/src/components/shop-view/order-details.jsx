import { useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

function ShopOrdersDetailsView({ orderDetails }) {

  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-auto">
      <DialogTitle className="text-xl font-medium">Order Details</DialogTitle>
      <div className="grid gap-2">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-normal">Order ID</p>
            <Label>{orderDetails?._id.slice(0, 8)}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-normal">Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-normal">Price</p>
            <Label>$ {orderDetails?.totalAmount.toFixed(2)}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-normal">Status</p>
            <Label><Badge variant="manual" className={`py-1 px-3 ${orderDetails?.orderStatus == 'Confirmed'? 'bg-green-600': 'bg-orange-500'}`}>{orderDetails?.orderStatus}</Badge></Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <div className="grid gap-3">
            <div className="text-xl font-medium">Product Details</div>
            <ul className="grid gap-2">
              {orderDetails && orderDetails.cartItems.length > 0
                ? orderDetails.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>{item.name}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>$ {item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <div className="grid gap-2">
            <div className="text-xl font-medium">Shipping Information</div>
            <div className="grid gap-1 text-muted-foreground">
              <span>{user.username}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.landmark}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShopOrdersDetailsView;
