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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
} from "@/store/admin/Product-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/products";

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
  const [currentEditedID, setCurrentEditedID] = useState(null);
  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    // console.log(formData);
    currentEditedID !== null
      ? dispatch(
          editProduct({
            id: currentEditedID,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.sucess) {
            setOpenCreateProductDialog(false);
            setFormData(initialformData);
            dispatch(getAllProduct());
            setCurrentEditedID(null);
            toast({
              title: "Product Edited Successfully",
              variant: "success",
              duration: 2000,
            });
          }
        })
      : dispatch(
          addProduct({
            ...formData,
            image: uploadedImgUrl,
          })
        ).then((data) => {
          if (data?.payload?.sucess) {
            setOpenCreateProductDialog(false);
            setImgFile(null);
            setFormData(initialformData);
            dispatch(getAllProduct());
            toast({
              title: "Product Added Successfully",
              variant: "success",
              duration: 2000,
            });
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.sucess) {
        dispatch(getAllProduct());
        toast({
          variant: "success",
          duration: 2000,
          title: "Product Deleted Successfully",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  // console.log(productList);

  return (
    <>
      <div className="flex mb-5 px-2">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          <CirclePlus />
          Add Product
        </Button>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem, index) => (
            <AdminProductTile
              setCurrentEditedID={setCurrentEditedID}
              setOpenCreateProductDialog={setOpenCreateProductDialog}
              setFormData={setFormData}
              handleDelete={handleDelete}
              key={index}
              product={productItem}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-red-600 px-2">No products available. Add some products!</p>
        )}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedID(null);
          setFormData(initialformData);
        }}
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
            <SheetTitle className="text-2xl">
              {currentEditedID !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            imgFile={imgFile}
            setImgFile={setImgFile}
            uploadedImgUrl={uploadedImgUrl}
            setUploadedImgUrl={setUploadedImgUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
            isEditMode={currentEditedID !== null}
          />
          <div className="py-2">
            <CommonForm
              formControls={addProductFormControls}
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedID !== null ? "Save" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
