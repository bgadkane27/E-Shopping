import ProductFilter from "@/components/shop-view/filter";
import ShopProductTile from "@/components/shop-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { getAllProduct } from "@/store/admin/Product-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShopListing() {
  const dispatch = useDispatch();
  const {productList} = useSelector((state) => state.shopProduct);

  console.log(productList, "productList");
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-md">
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="text-md font-semibold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList.length || 0} Product(s)</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span className="ml-1">Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
          {
          productList && productList.length > 0 ?
            productList.map((productItem, index) => <ShopProductTile 
            key={index} product={productItem} />) : ''
        }
          </div>      
      </div>
    </div>
  );
}

export default ShopListing;
