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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for(const [key, value] of Object.entries(filterParams)) {
    if(Array.isArray(value) && value.length > 0) {
      const paramValue= value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join('&');  
}

function ShopListing() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProduct);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionID, getCurrentOption) {
    console.log(getSectionID, getCurrentOption);

    let cpyFilters = { ...filters };
    const IndexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionID);
    if (IndexOfCurrentSection === -1) {
      cpyFilters = { ...cpyFilters, [getSectionID]: [getCurrentOption] };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionID].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionID].push(getCurrentOption);
      } else {
        cpyFilters[getSectionID].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  useEffect(() => {
    setSort("asc");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  console.log(filters, "filters");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="text-md font-semibold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length || 0} Product(s)
            </span>
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
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem value={option.id} key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
          {productList && productList.length > 0 ? (
            productList.map((productItem, index) => (
              <ShopProductTile key={index} product={productItem} />
            ))
          ) : (
            <p className="text-red-500">
              No Products Available for Sale.
              <br /> Please try again after some time.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopListing;
