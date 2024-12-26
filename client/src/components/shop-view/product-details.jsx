import {Dialog} from '@/components/ui/dialog'
import { DialogContent } from '@radix-ui/react-dialog'
 

function ProductDetailsDialog({open, setOpen, productDetail}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <p>{productDetail?.name}</p>
            </DialogContent>  
        </Dialog>
    )
}