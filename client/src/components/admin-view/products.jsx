import {
    Card,
    CardContent,
    CardFooter
  } from "@/components/ui/card"
import { Button } from "../ui/button"

function AdminProductTile({product, setCurrentEditedID, setOpenCreateProductDialog,setFormData }){
    return(
        <Card className="w-full max-w-sm mx-auto">
            <div>
                <div className="relative">
                    <img src={product?.image} alt={product?.name} className="w-full h-[250px] object-cover rounded-t-lg"/>
                </div>
                <CardContent>
                    <h2 className="text-xl font-semibold mt-2">{product?.name}</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-md font-medium my-2"> Price: {product?.price}</span>
                        <span className="text-md font-medium my-2">Sales Price: {product?.salesPrice}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button onClick ={() => {
                        setCurrentEditedID(product?._id)
                        setOpenCreateProductDialog(true) 
                        setFormData(product)}}>Edit</Button>
                    <Button onClick={()=> {setCurrentEditedID(product?._id)}}>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default AdminProductTile