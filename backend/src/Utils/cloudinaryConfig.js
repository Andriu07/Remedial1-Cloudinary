//configuracion de cloudinary en general
import multer  from "multer";
import  {CloudinaryStorage} from "multer-storage-cloudinary"
import  {v2 as cloudinary} from "cloudinary"
import {config} from "../../config.js"


//configuramos cloudinary con nuestras credenciales
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "grupo1B",
        allowed_formats: ["jpg", "png","jpeg","gif"]
    }
})

//configuro multer (puentes de conexion de mis imagenes con cloudinary)
const upload = multer ({storage})
export default upload;