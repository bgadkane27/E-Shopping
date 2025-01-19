import { DialogContent, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"


function ShopOrdersDetailsView() {   
    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogTitle className="text-xl font-medium">Order Details</DialogTitle>
            <div className="grid gap-2">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Order ID</p>
                        <Label>23456</Label>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Order Date</p>
                        <Label>27/12/2022</Label>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Order Price</p>
                        <Label>$ 100</Label>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Order Status</p>
                        <Label>In Transit</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                    <div className="grid gap-3">
                        <div className="text-xl font-medium">Product Details</div>
                        <ul className="grid gap-2">
                            <li className="flex items-center justify-between">
                                <span>Product Name</span>
                                <span>$ 100 </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        <div className="text-xl font-medium">Shipping Information</div>
                        <div className="grid gap-1 text-muted-foreground">
                            <span>John Doe</span>
                            <span>address</span>
                            <span>landmark</span>
                            <span>city</span>
                            <span>pincode</span>
                            <span>notes</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    )

}

export default ShopOrdersDetailsView;