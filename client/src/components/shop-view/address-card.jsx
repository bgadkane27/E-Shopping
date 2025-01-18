import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Edit, Trash2 } from "lucide-react";


function AddressCard({ addressInfo, handleEditAddress, handleDeleteAddress, setCurrentSelectedAddress }) {

    return (
        <Card className="bg-gradient-to-b from-pink-200 to-blue-300 max-w-96"
            onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null}>
            <CardContent className="grid gap-4 p-4 mb-4">
                <Label>{addressInfo?.address}</Label>
                <Label>{addressInfo?.landmark}</Label>
                <Label>{addressInfo?.city}</Label>
                <Label>{addressInfo?.pincode}</Label>
                <Label>{addressInfo?.phone}</Label>
                <Label>{addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="relative p-2 mt-1 flex items-end">
                <Edit color="orange" className="cursor-pointer absolute bottom-2 left-2"
                    onClick={() => { handleEditAddress(addressInfo) }}
                    aria-label="Edit Address"
                />
                <Trash2 color="red" className="cursor-pointer absolute bottom-2 right-2"
                    onClick={() => { handleDeleteAddress(addressInfo) }}
                    aria-label="Delete Address"
                />
            </CardFooter>
        </Card>
    );

}

export default AddressCard;