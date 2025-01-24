import { useState } from "react"
import CommonForm from "../common/form"
import { DialogContent, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { useDispatch } from "react-redux"
import { Badge } from "../ui/badge"
import { getAllOrderForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/Order-slice"

const initialFormData = {
    status: "",
}

function AdminOrdersDetailsView({ orderDetails }) {
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();

    function handleUpdateStatus(event) {
        event.preventDefault();
        const { status } = formData;
    dispatch(updateOrderStatus({id: orderDetails?._id, orderStatus: status})).then((data)=>{
        if(data?.payload?.success){
            dispatch(getOrderDetailsForAdmin(orderDetails?._id));
            dispatch(getAllOrderForAdmin());
            setFormData(initialFormData);            
        }
    })         
    }

    return (
        <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-auto">
            <DialogTitle className="text-xl font-medium">Order Details</DialogTitle>
            <div className="grid gap-2 overflow-y-auto">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Order ID</p>
                        <Label>{orderDetails?._id.slice(0, 8)}</Label>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Order Price</p>
                        <Label>$ {orderDetails?.totalAmount.toFixed(2)}</Label>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Order Status</p>
                        <Label><Badge variant="manual" className={`py-1 px-3 ${orderDetails?.orderStatus == 'Confirmed' ? 'bg-green-600' : 'bg-orange-500'}`}>{orderDetails?.orderStatus}</Badge></Label>
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
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.landmark}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                        </div>
                    </div>
                </div>
                <div className="pl-1">
                    <CommonForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                placeholder: "Select a status to update.",
                                options: [
                                    { id: "Pending", label: "Pending" },
                                    { id: "Confirmed", label: "Confirmed" },
                                    { id: "Preparing for Dispatch", label: "Preparing for Dispatch" },
                                    { id: "Dispatched", label: "Dispatched" },
                                    { id: "Out for Delivery", label: "Out for Delivery" },
                                    { id: "Delivered", label: "Delivered" },
                                    { id: "Failed Delivery Attempt", label: "Failed Delivery Attempt" },
                                    { id: "Returned", label: "Returned" },
                                    { id: "Refund Done", label: "Refunded" },
                                    { id: "Cancelled", label: "Cancelled" }                                    
                                ]
                            }
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={'Update Order Status'}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    )

}

export default AdminOrdersDetailsView;