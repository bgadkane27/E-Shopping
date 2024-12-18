import { Badge, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShopProductTile({ product }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
        </div>
        {
          product?.salesPrice > 0 ?
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge> : null
        }
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">{product?.name}Hello</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{product?.category} Kids</span>
            <span className="text-sm text-muted-foreground">{product?.brand} Nike</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className={`${product?.salesPrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>{product?.price} Kids</span>
            {
              product?.salesPrice > 0 ?
                <span className="text-lg font-semibold text-primary">{product?.salesPrice} Kids</span> : null
            }
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button variant="outline" size="sm" className="w-full">
            <ShoppingCart /> Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShopProductTile;
