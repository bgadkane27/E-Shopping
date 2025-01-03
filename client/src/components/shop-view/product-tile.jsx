import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { brandOptions, categoryOptions } from "@/config";
import { Badge } from "../ui/badge";

function ShopProductTile({ product, handlegetProductDetails }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div  className="relative">
        <div>
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
        </div>
        {product?.salesPrice && product.salesPrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        ) : null}
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">{product?.name}</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-md text-muted-foreground">
              {categoryOptions[product?.category]}
            </span>
            <span className="text-md text-muted-foreground">
              {brandOptions[product?.brand]}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                product?.salesPrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            > 
            ₹ {product?.price}
            </span>
            {product?.salesPrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ₹ {product?.salesPrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between items-center">
          <Button variant="outline" size="sm" className="w-full mt-4">
            <ShoppingCart /> Add to Cart
          </Button>
          <Button variant="outline" size="sm" className="w-full mt-2" onClick={()=> handlegetProductDetails(product?._id)}>
            View Details
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShopProductTile;
