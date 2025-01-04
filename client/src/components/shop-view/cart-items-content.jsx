import { Minus, Plus } from "lucide-react"
import { Button } from "../ui/button"

function CartItemsContent({cartItem}) {
    return(
        <div className="flex items-center space-x-4">
            <img
                src={cartItem?.image}
                alt={cartItem?.name}
                className="h-20 w-20 rounded object-cover"
            />
            <div className="flex-1">
                <h3 className="font-medium text-xl">{cartItem?.name}</h3>
                <div className="flex items-center mt-1">
                    <Button className="w-10 h-10 rounded-full" variant="outline" size="icon">
                        <Minus className="w-4 h-4"/>
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="mx-2">{cartItem?.quantity}</span>
                    <Button className="w-10 h-10 rounded-full" variant="outline" size="icon">
                        <Plus className="w-4 h-4"/>
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartItemsContent