import { useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";

const initialAddressFormData = {
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: ""
}

function Address() {

    const [formData, setFormData] = useState(initialAddressFormData)
    function handleManageAddress(event) {
        event.preventDefault();
    }

    return <Card>
        <div className="px-6 py-2 text-2xl font-semibold">Your Addresses</div>
        <CardHeader>
            <CardTitle>Add a new address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <CommonForm
                formControls={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Add"}
                onSubmit={handleManageAddress}
            />
        </CardContent>
    </Card>
}

export default Address;