const cloudinary = require('cloudinary').v2;
const multer = require('multer')

cloudinary.config({
    cloud_name: "dodnyuenh",
    api_key: "694996245773387",
    api_secret: "i-bBXEYtLimmgnMtRgMaUUuS7F4"
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto"
    })
    return result;
}

const upload = multer({storage})

module.exports = {upload, imageUploadUtil}