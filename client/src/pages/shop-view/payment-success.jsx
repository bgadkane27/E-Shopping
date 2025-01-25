import { NavLink } from "react-router-dom";

function PaymentSuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto border mt-4 p-6 rounded-lg">
            <div>
                <img src="/payment-sucess.gif" alt="payment-success" className="w-full h-[200px]" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-2 text-green-500">Payment successful!</h2>
                <p className="text-md text-center">Your order has been successfully placed.<br />
                Now you can track your order in <NavLink to="/shop/account">My Account</NavLink> section.
                </p>
            </div>
        </div>
    )
}

export default PaymentSuccessPage;