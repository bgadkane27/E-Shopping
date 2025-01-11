import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addNewAddress, deleteAddress, editaAddress, getAllAddress } from "@/store/shop/Address-slice";
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
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const {user} = useSelector((state) => state.auth)
    const {addressList} = useSelector((state) => state.shopAddress)
    const dispatch = useDispatch();
    const { toast } = useToast();

    function handleManageAddress(event) {
        event.preventDefault();

        if(addressList.length >=3 && currentEditedId === null){
            toast({
                variant: "destructive",
                duration: 2000,
                title: "You can add maximum of three addresses only.",
            });
            return;
        }

        currentEditedId !== null ? dispatch(editaAddress({
            userId: user?.id, 
            addressId: currentEditedId,
            formData
        })).then(data => {
            if (data?.payload?.sucess) {
                dispatch(getAllAddress(user?.id));
                setFormData(initialAddressFormData);
                setCurrentEditedId(null);
                toast({
                    variant: "success",
                    duration: 2000,
                    title: "Address edited successfully.",
                });
            }
        }):
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

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(deleteAddress({userId: user?.id, addressId: getCurrentAddress._id})).then(data => {
            if (data?.payload?.sucess) {
                dispatch(getAllAddress(user?.id));
                toast({
                    variant: "success",
                    duration: 2000,
                    title: "Address deleted successfully.",
                });
            }
        });
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress._id);
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            landmark: getCurrentAddress?.landmark,
            city: getCurrentAddress?.city,
            pincode: getCurrentAddress?.pincode,
            phone: getCurrentAddress?.phone,
            notes: getCurrentAddress?.notes
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
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
                addressList && addressList.length > 0 ? 
                addressList.map((address) => (
                    <AddressCard key={address.id} 
                    addressInfo={address} 
                    handleDeleteAddress={() => handleDeleteAddress(address)}
                    handleEditAddress={() => handleEditAddress(address)}
                    />
                ))
                :<p className="px-3 text-red-500">Looks like you have not added address yet.</p>
            }
        </div>
        <CardHeader className="pt-1">
            <CardTitle>{currentEditedId!== null ? "Edit a address" : "Add a new address"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <CommonForm
                formControls={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId!== null ? "Edit" : "Add"}
                onSubmit={handleManageAddress}
                isBtnDisabled={!isFormValid()}
            />
        </CardContent>
    </Card>
}

export default Address;