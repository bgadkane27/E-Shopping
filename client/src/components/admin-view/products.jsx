import {
    Card,
    CardContent,
    CardFooter
  } from "@/components/ui/card"
import { Button } from "../ui/button"
import { Edit, Trash2 } from "lucide-react"

function AdminProductTile({product, setCurrentEditedID, setOpenCreateProductDialog,setFormData, handleDelete }){
    return(
        <Card className="w-full max-w-sm mx-auto">
            <div className="relative">
                <div className="relative">
                    <img src={product?.image} alt={product?.name} className="w-full h-[200px] object-cover rounded-t-lg"/>
                </div>
                <CardContent>
                    <h2 className="text-xl font-semibold mt-2">{product?.name}</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-md font-medium my-2"> Price: {product?.price}</span>
                        <span className="text-md font-medium my-2">Sales Price: {product?.salesPrice}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center py-3">
                    {/* <Button onClick ={() => {
                        setCurrentEditedID(product?._id)
                        setOpenCreateProductDialog(true) 
                        setFormData(product)}}>Edit</Button> */}
                    {/* <Button onClick={()=> {handleDelete(product?._id)}}>Delete</Button> */}
                    <Edit color="orange" className="cursor-pointer absolute bottom-2 left-2 ml-4"
                    onClick ={() => {
                        setCurrentEditedID(product?._id)
                        setOpenCreateProductDialog(true) 
                        setFormData(product)}}
                    />
                    <Trash2 color="red" className="cursor-pointer absolute bottom-2 right-2 mr-4"
                    onClick={()=> {handleDelete(product?._id)}}
                    />
                </CardFooter>
            </div>
        </Card>
    )
}

export default AdminProductTile