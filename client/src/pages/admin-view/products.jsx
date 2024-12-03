import ImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormControls } from "@/config";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

const initialformData = {
  image: null,
  name: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salesPrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialformData);
  const [imgFile, setImgFile] = useState(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <div className="flex flex-1 mb-5 px-2">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          <CirclePlus />
          Add Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={setOpenCreateProductDialog}
      >
        <Dialog>
          <DialogContent aria-describedby="product-dialog">
            <p id="product-dialog">
              This dialog allows you to add new product.
            </p>
          </DialogContent>
        </Dialog>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="overflow-auto">
            <SheetTitle className="text-2xl">Add New Product</SheetTitle>
          </SheetHeader>
          <ImageUpload
            imgFile={imgFile}
            setImgFile={setImgFile}
            uploadedImgUrl={uploadedImgUrl}
            setUploadedImgUrl={setUploadedImgUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
          />
          <div className="py-2">
            <CommonForm
              formControls={addProductFormControls}
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
