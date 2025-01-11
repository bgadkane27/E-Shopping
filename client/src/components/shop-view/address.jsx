import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addNewAddress, getAllAddress } from "@/store/shop/Address-slice";
import AddressCard from "./address-card";


const initialAddressFormData = {
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    phone: "",
    notes: ""
}

function Address() {

    const [formData, setFormData] = useState(initialAddressFormData)
    const {user} = useSelector((state) => state.auth)
    const {addressList} = useSelector((state) => state.shopAddress)
    const dispatch = useDispatch();
    const { toast } = useToast();

    function handleManageAddress(event) {
        event.preventDefault();

        dispatch(addNewAddress({
            ...formData,
            userId: user?.id,
        })).then(data => {
            if (data?.payload?.sucess) {
                dispatch(getAllAddress(user?.id));
                setFormData(initialAddressFormData);
                toast({
                    variant: "success",
                    duration: 2000,
                    title: "Address added successfully.",
                });
            }
        });
    }

    function isFormValid() {
        return addressFormControls
        .filter((control) => control.required)
        .map((control) => formData[control.name]?.trim() !== "")
        .every((item) => item);
    }

    useEffect(() => {
    dispatch(getAllAddress(user?.id));
    }, [dispatch])

    return <Card>
        <div className="mb-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
                addressList && addressList.length > 0 ? 
                addressList.map((address) => (
                    <AddressCard key={address.id} addressInfo={address} />
                ))
                :null
            }
        </div>
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
                isBtnDisabled={!isFormValid()}
            />
        </CardContent>
    </Card>
}

export default Address;