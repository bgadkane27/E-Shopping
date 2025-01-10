import { Minus, Plus,Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/shop/Cart-slice";
import { useToast } from "@/hooks/use-toast";

function CartItemsContent({cartItem}) {
    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const {toast} = useToast();    
 
    function handleDeleteCartItem(getCartItem){
        dispatch(deleteCartItem({userId: user?.id, productId: getCartItem?.productId})).then(data=>{
            if(data?.payload?.sucess){
                toast({
                variant: "success",
                duration: 2000,
                title: "Product deleted from cart successfully.",
            })
        }});
    }
    function handleUpdateQty(getCartItem, typeOfAction){
        dispatch(updateCartItem({userId: user?.id, productId: getCartItem?.productId, 
            quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1})).then(data=>{
                if(data?.payload?.sucess){
                    toast({
                    variant: "success",
                    duration: 2000,
                    title: `Quantity ${
                    typeOfAction === "plus" ? "increased" : "decreased"
                } successfully.`,
                })
            }});
    }

    return(
        <>
        <div className="flex items-center space-x-4 gap-2 mr-4">
            <img
                src={cartItem?.image}
                alt={cartItem?.name}
                className="h-20 w-20 rounded object-cover"
            />
            <div className="flex-1">
                <h3 className="font-medium text-xl -mt-2">{cartItem?.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <Button onClick={()=>handleUpdateQty(cartItem, 'minus')} className="w-10 h-10 rounded-full" 
                    variant="outline" 
                    size="icon"
                    disabled={cartItem?.quantity === 1}
                    >
                        <Minus className="w-4 h-4 text-red-500"/>
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-md text-2xl">{cartItem?.quantity}</span>
                    <Button onClick={()=>handleUpdateQty(cartItem, 'plus')} className="w-10 h-10 rounded-full" variant="outline" size="icon">
                        <Plus className="w-4 h-4 text-green-500"/>
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>            
            <div className="flex flex-col items-end">
                <span className="font-semibold">
                ₹ {((cartItem?.salesPrice > 0 ? cartItem?.salesPrice : cartItem?.price )* cartItem?.quantity).toFixed(2)}
                </span>
                <Trash2 onClick= {()=>handleDeleteCartItem(cartItem)}className="mt-2 text-red-500 cursor-pointer" size={20}/>                
            </div> 
        </div>
        <Separator />
        </>
    )
}

export default CartItemsContent