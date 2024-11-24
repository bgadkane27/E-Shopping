import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

function ImageUpload({
  imgFile,
  setImgFile,
  uploadedImgUrl,
  setUploadedImgUrl,
}) {
  const inputRef = useRef(null);
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImgFile(selectedFile);
    }
    if(selectedFile.type !== "image/jpeg" && selectedFile.type !== "image/png") {
      alert("Please select a JPEG or PNG file.");}
  }

  function handleImageDrag(event) {
    event.preventDefault();
  }

  function handleImageDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImgFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImgFile(null);
    if(inputRef.current) {
        inputRef.current.value = "";
    }
  }


  return (
    <div className="w-full max-w-md mx-auto mt-2">
      <Label htmlFor="image-upload" className="mb-2 block">
        Upload Image
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
              <FileIcon color="gray" className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-gray-600 font-medium">{imgFile.name}</p>
            <Button variant="ghost" onClick={handleRemoveImage}>
              <XIcon color="red" className="w-4 h-4 text-muted-foreground" />
              <p className="sr-only">Remove File</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
