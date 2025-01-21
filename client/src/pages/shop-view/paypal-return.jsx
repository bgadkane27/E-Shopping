import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { capturePayment } from "@/store/shop/Order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get('paymentId');
    const payerId = searchParams.get('PayerID');

    useEffect(() => {
        if(paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
            dispatch(capturePayment({paymentId, orderId, payerId})).then((data)=>{
                if(data?.payload?.success) {
                    sessionStorage.removeItem("currentOrderId");
                    window.location.href = '/shop/payment-success';
                }
            })
        }
    }, paymentId, payerId, dispatch)


    return(
        <Card>
            <CardHeader>
                <CardTitle>Processing payment...please wait!</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PaypalReturnPage