import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, InfoIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

function ImageUpload({
  imgFile,
  setImgFile,
  uploadedImgUrl,
  setUploadedImgUrl,
}) {
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (allowedTypes.includes(selectedFile.type)) {
        setImgFile(selectedFile);
        setErrorMessage("");
      } else {
        setErrorMessage("Only JPG and PNG images are allowed.");
      }
    }
  }

  function handleImageDrag(event) {
    event.preventDefault();
  }

  function handleImageDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (allowedTypes.includes(droppedFile.type)) {
        setImgFile(droppedFile);
        setErrorMessage("");
      } else {
        setErrorMessage("Only JPG and PNG images are allowed.");
      }
    }
  }

  function handleRemoveImage() {
    setImgFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    const data = new FormData();
    data.append("my_file", imgFile);

    const response = await axios.post("http://localhost:5000/api/admin/products/upload-image", data)
    console.log(response);
    if(response) {
      setUploadedImgUrl(response.data)
    }
  }

  useEffect(() => {
    if(imgFile !== null) { uploadImageToCloudinary() }
  },[imgFile])


  return (
    <div className="w-full max-w-md mx-auto mt-2 relative">
      <Label htmlFor="image-upload" className="mb-2 block relative">
        Upload Image
        <span className="absolute top-0 left-24 flex items-center group">
          <InfoIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
          <span className="hidden group-hover:block absolute top-5 right-0 bg-gray-600 text-white text-xs rounded-md px-6 py-1">
            Only JPG and PNG images are allowed.
          </span>
        </span>
      </Label>
      <div
        onDragOver={handleImageDrag}
        onDrop={handleImageDrop}
        className="border-2 border-dashed rounded-md p-0.5"
      >
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          accept="image/jpeg, image/png"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imgFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Drag and drop or Click here to upload.
            </span>
          </Label>
        ) : (
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center px-2">
              <FileIcon
                color="gray"
                className="w-6 h-6 text-muted-foreground"
              />
            </div>
            <p className="text-sm text-gray-600 font-medium">{imgFile.name}</p>
            <Button variant="ghost" onClick={handleRemoveImage}>
              <XIcon color="red" className="w-4 h-4 text-muted-foreground" />
              <p className="sr-only">Remove File</p>
            </Button>
          </div>
        )}
      </div>
      {
        errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )
      }
    </div>
  );
}

export default ImageUpload;
