import { Blocks, ShoppingCart, SquareChartGantt } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { brandOptions, categoryOptions } from "@/config";
import { Badge } from "../ui/badge";

function ShopProductTile({ product, handlegetProductDetails, handleAddtoCart }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        <div>
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
        </div>
        {
          product.totalStock == 0 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Out of Stock! Restock expected soon!
          </Badge> :
            product.totalStock < 10 ? <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
              {`Only ${product.totalStock} items left! Hurry up!`}
              {/* {`Hurry! Only ${product.totalStock} left - grab yours before they're gone!`} */}
            </Badge> :
              product?.salesPrice < product?.price && (
                <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                  Sale
                </Badge>
              )}
        <CardContent className="p-4">
          {/* <h2 className="text-xl font-semibold mb-2">{product?.name}</h2> */}
          <h2 className="text-lg font-semibold mb-2 hover:cursor-pointer hover:text-blue-600" onClick={() => handlegetProductDetails(product?._id)}>
            {product?.name.length > 20 ? `${product?.name.slice(0, 20)}...` : product?.name}
          </h2>
          {/* <div className="flex items-center justify-between mb-2">
            <span className="text-md text-muted-foreground">
              {categoryOptions[product?.category]}
            </span>
            <span className="text-md text-muted-foreground">
              {brandOptions[product?.brand]}
            </span>
          </div> */}
          <div className="flex items-center justify-between mb-2">
            {product?.salesPrice > 0 ? (
              <span className="text-md font-semibold text-primary bg-green-200 py-1 px-3 rounded-full">
                $ {product?.salesPrice}
              </span>
            ) : null}
            <span
              className={`${product?.salesPrice > 0 ? "line-through" : ""
                } text-md font-semibold text-primary`}
            >
              $ {product?.price}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between items-center">
          {
            product.totalStock === 0 ? <Button variant="outline" size="sm" className="w-full mt-4 opacity-60 cursor-not-allowed">
              <Blocks /> Out of Stock
            </Button> : <Button onClick={() => handleAddtoCart(product?._id, product?.totalStock)} variant="outline" size="sm" className="w-full mt-4">
              <ShoppingCart /> Add to Cart
            </Button>
          }
          <Button variant="default" size="sm" className="w-full mt-2" onClick={() => handlegetProductDetails(product?._id)}>
            <SquareChartGantt /> View Details
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShopProductTile;
