import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

function AdminProducts() {
  return (
    <>
      <div className="flex flex-1 mb-5 justify-end px-2">
        <Button>
          <CirclePlus />
          Add Product
        </Button>
      </div>
    </>
  );
}

export default AdminProducts;
