import { ShoppingCart } from "lucide-react";
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
        <CardContent>
        <h2 className="text-xl font-semibold mt-2">{product?.name}</h2>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button variant="outline" size="sm">
            <ShoppingCart /> Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShopProductTile;
