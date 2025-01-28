import ProductDetailsDialog from "@/components/shop-view/product-details";
import ShopProductTile from "@/components/shop-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/Cart-slice";
import { getProductDetails } from "@/store/shop/Product-slice";
import { resetSearchResults, searchProducts } from "@/store/shop/Search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { productDetails } = useSelector((state) => state.shopProduct);
    const { searchResults } = useSelector(state => state.shopSearch);
    const { cartItems } = useSelector(state => state.shopCart);
    const { user } = useSelector(state => state.auth);
    const {toast} = useToast();
    const dispatch = useDispatch();

    function handleAddtoCart(getCurrentProductID, getTotalStock) {
    
        let getCartItems = cartItems.items || [];
        if(getCartItems.length){
          const indexOfCurrentItem  = getCartItems.findIndex((item)=> item.productId === getCurrentProductID);
          if(indexOfCurrentItem > -1){
            const getQuantity = getCartItems[indexOfCurrentItem].quantity;
            if(getQuantity + 1  > getTotalStock){
              toast({
                title: `Only ${getTotalStock} quantity can be added to cart for the product : ${getCartItems[indexOfCurrentItem].name}.`,
                variant: "destructive",
                duration: 2000
              })
              return;
            }
          }          
        }
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductID, quantity: 1 })).then(data => {
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

    function handlegetProductDetails(getProductDeatil) {
        dispatch(getProductDetails(getProductDeatil));
    }

    useEffect(() => {
        if (productDetails) {
          setOpenDetailsDialog(true);
        }
      }, [productDetails]);
     
    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.length >= 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(searchProducts(keyword));
            }, 1000);
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    }, [keyword]);

    return (
        <div className="w-full">
            <div className="flex justify-center mb-8">
                <div className="w-1/3 flex items-center">
                    <Input name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search Products..."
                    />
                </div>
            </div>
            {
                !searchResults.length 
                ?
                <>
                <img src="/no-found.webp" alt="Empty Cart" className="w-1/4 mx-auto mt-4"/>
                <p className="text-center text-xl font-medium text-red-500">No products found...</p>
                </> 
                : null
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    searchResults.map(item => (
                        <ShopProductTile 
                        key={item._id} 
                        product={item} 
                        handleAddtoCart={handleAddtoCart}
                        handlegetProductDetails={handlegetProductDetails}
                        />
                    ))
                }
            </div>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetail={productDetails} />
        </div>
    )
}

export default SearchProducts;