import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";


function ProductDetailsDialog({ open, setOpen, productDetail }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[60vw] ">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetail?.image}
            alt={productDetail?.name}
            className="aspect-square object-cover w-full"
          />
        </div>
        <div>
          <div>
            <h2 className="text-3xl font-semibold">{productDetail?.name}</h2>
          </div>
          <div>
            <p className="text-muted-foreground ml-1 mt-2 mb-2">{productDetail?.description}</p>
          </div>
          <div>
          <Button variant="outline" size="sm" className="mt-2">
            <ShoppingCart /> Add to Cart
          </Button>
          </div>
          <Separator className="my-4"/>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
