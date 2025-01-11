import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Edit, Trash2 } from "lucide-react";


function AddressCard({addressInfo, handleEditAddress, handleDeleteAddress}) {
    
    return(
        <Card className="bg-gradient-to-b from-pink-200 to-blue-300">
            <CardContent className="grid gap-4 p-4 mb-4">
                <Label>{addressInfo?.address}</Label>
                <Label>{addressInfo?.landmark}</Label>
                <Label>{addressInfo?.city}</Label>
                <Label>{addressInfo?.pincode}</Label>
                <Label>{addressInfo?.phone}</Label>
                <Label>{addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="flex justify-between p-2">
                <Edit color="orange" className="cursor-pointer"
                onClick={() => {handleEditAddress(addressInfo)}}
                aria-label="Edit Address"
                />
                <Trash2 color="red" className="cursor-pointer"
                onClick={() => {handleDeleteAddress(addressInfo)}}
                aria-label="Delete Address"
                />
            </CardFooter>
        </Card>
    );
    
}

export default AddressCard;