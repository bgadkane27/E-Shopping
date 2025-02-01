import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Blocks, ShoppingCart, StarIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/Cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setproductDetails } from "@/store/shop/Product-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReview } from "@/store/shop/Review-slice";

function ProductDetailsDialog({ open, setOpen, productDetail }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleReviewSubmit() {
    dispatch(addReview({
      productId: productDetail?._id,
      userId: user?.id,
      username: user?.username,
      reviewMessage: reviewMsg,
      reviewValue: rating
    })).then((data) => {
      if (data?.payload?.success) {
        setReviewMsg("");
        setRating(0);
        dispatch(getReview(productDetail?._id));
        toast({
          variant: "success",
          duration: 2000,
          title: "Thanks for your review.",
        });
      }
    })
  }
  function handleAddtoCart(getCurrentProductID, getTotalStock) {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex((item) => item.productId === getCurrentProductID);
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getTotalStock} quantity can be added to cart for the product : ${getCartItems[indexOfCurrentItem].name}.`,
            variant: "destructive",
            duration: 2000
          })
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductID,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          variant: "success",
          duration: 2000,
          title: "Product added to cart successfully.",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetail)
      dispatch(getReview(productDetail?._id));
  }, [productDetail, dispatch]);

  function handleDialogClose() {
    setOpen(false);
    dispatch(setproductDetails());
    setRating(0);
    setReviewMsg("");
  }


  const averageReview = reviews && reviews.length > 0 ?
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : 0

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[55vw] sm:max-w-[80vw] lg:max-w-[55vw] overflow-y-auto">
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
              className={`${productDetail?.salesPrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
            >
              $ {productDetail?.price}
            </span>
            {productDetail?.salesPrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                $ {productDetail?.salesPrice}
              </span>
            ) : null}
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-0">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview === 0 ? "0" : averageReview.toFixed(1)})
            </span>
          </div>
          <div>
            {
              productDetail?.totalStock === 0
                ? <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full opacity-60 cursor-not-allowed"
                >
                  <Blocks />  Out of Stock
                </Button>
                : <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => {
                    handleAddtoCart(productDetail._id, productDetail?.totalStock);
                  }}
                >
                  <ShoppingCart /> Add to Cart
                </Button>
            }
          </div>
          <Separator className="my-4" />
          <div className="max-h-[300px] overflow-y-auto px-2">
            <h3 className="text-md font-semibold my-2">Reviews</h3>
            <div className="grid gap-6 my-2">
              {
                reviews && reviews.length > 0 ?
                  reviews.map((review) =>
                    <div className="flex gap-4">
                      <div className="grid gap-1">
                        <div className="flex gap-2 items-center">
                          <Avatar className="w-8 h-8 bg-blue-400 rounded-full">
                            <AvatarFallback>{review?.username[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <h3 className="text-sm font-semibold">{review?.username}</h3>
                        </div>
                        <div className="flex items-center">
                          <StarRatingComponent rating={review?.reviewValue} />
                        </div>
                        <p className="text-md">{review?.reviewMessage}</p>
                      </div>
                    </div>
                  )
                  : <h1 className="text-sm">No reviews yet. you are the first one to review it.</h1>
              }
            </div>
            <Separator className="bg-pink-400" />
            <div className="flex flex-col gap-2 mt-1">
              <Label className="py-1">Provide a review</Label>
              <div className="flex">
                <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input placeholder="Write a review..."
                name="review" value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)}
                className="mb-2 mt-2" />
              <Button disabled={reviewMsg.trim() === "" || rating === 0}
                onClick={handleReviewSubmit}
              >Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
