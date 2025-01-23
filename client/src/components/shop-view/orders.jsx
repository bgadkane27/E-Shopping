import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShopOrdersDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByUser, getOrderDetails, resetOrderDetails } from "@/store/shop/Order-slice";
import { Badge } from "../ui/badge";

function ShopOrders() {
    const [openOrdersDetails, setOpenOrdersDetails] = useState(false)
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth);
    const {orderList, orderDetails} = useSelector((state)=>state.shopOrder);

    function handleFetchOrderDetails(getId){
        dispatch(getOrderDetails(getId));
    }

    useEffect(()=>{
        if(orderDetails !== null) setOpenOrdersDetails(true)
    },[orderDetails])

    useEffect(()=>{
        dispatch(getAllOrderByUser(user?.id))
    }, [dispatch]) 

    console.log("orderDetails", orderDetails);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="ml-4">Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ? 
                            orderList.map(orderItem => 
                                <TableRow>
                                <TableCell>{orderItem?._id.slice(0, 8)}</TableCell>
                                <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                                <TableCell><Badge variant="manual" className={`py-1 px-3 ${orderItem?.orderStatus == 'confirmed'? 'bg-green-600': 'bg-orange-500'}`}>{orderItem?.orderStatus}</Badge></TableCell>
                                <TableCell>$ {orderItem?.totalAmount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Dialog open={openOrdersDetails} 
                                    onOpenChange={()=>{ setOpenOrdersDetails(false)
                                        dispatch(resetOrderDetails())
                                    }}>
                                        <Button variant="default"
                                            onClick={() =>handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                                        <ShopOrdersDetailsView orderDetails={orderDetails} />
                                    </Dialog>
                                </TableCell>
                            </TableRow> 
                            )
                            : <p>No order details found.</p>
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default ShopOrders;