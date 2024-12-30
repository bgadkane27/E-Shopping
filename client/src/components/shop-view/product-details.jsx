import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ShoppingCart, StarIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";

function ProductDetailsDialog({ open, setOpen, productDetail }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[50vw] sm:max-w-[80vw] lg:max-w-[50vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetail?.image}
            alt={productDetail?.name}
            className="aspect-square object-cover w-full rounded-lg"
          />
        </div>
        <div>
          <div>
            <h2 className="text-3xl font-semibold">{productDetail?.name}</h2>
            <p className="text-muted-foreground ml-1 mt-2 mb-2">
              {productDetail?.description}
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                productDetail?.salesPrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹ {productDetail?.price}
            </span>
            {productDetail?.salesPrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ₹ {productDetail?.salesPrice}
              </span>
            ) : null}
          </div>
          <div>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              <ShoppingCart /> Add to Cart
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="max-h-[300px] overflow-auto">
            <h3 className="text-md font-semibold my-2">Reviews</h3>
            <div className="grid gap-6 my-2">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex gap-2">
                    <h3 className="text-md font-semibold">Abhishek</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                  </div>
                  <p className="text-md">This is an awesome product.</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 my-2">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex gap-2">
                    <h3 className="text-md font-semibold">Abhishek</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                  </div>
                  <p className="text-md">This is an awesome product.</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 my-2">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex gap-2">
                    <h3 className="text-md font-semibold">Abhishek</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                  </div>
                  <p className="text-md">This is an awesome product.</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Input placeholder="Write a review" className="mb-2 ml-1" />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
