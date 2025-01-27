import ShopProductTile from "@/components/shop-view/product-tile";
import { Input } from "@/components/ui/input";
import { resetSearchResults, searchProducts } from "@/store/shop/Search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchResults } = useSelector(state => state.shopSearch);
    const dispatch = useDispatch();


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
                        <ShopProductTile key={item._id} product={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default SearchProducts;