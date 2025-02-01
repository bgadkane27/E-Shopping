import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
            dispatch(capturePayment({ paymentId, orderId, payerId })).then((data) => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem("currentOrderId");
                    window.location.href = '/shop/payment-success';
                }
            })
        }
    }, paymentId, payerId, dispatch)


    return (
        <Card className="w-full h-screen flex items-center justify-center">
            <CardContent>
                <img src="/processing.gif" alt="Processing..." className="w-20 h-20 mx-auto" />
                <p className="text-md font-semibold">Processing your payment...</p>
            </CardContent>
        </Card>
    )
}

export default PaypalReturnPage