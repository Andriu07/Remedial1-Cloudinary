import brandsModel from "../Models/brands.js";
import {v2 as cloudinary} from "cloudinary";

//array de funciones
const brandsController = {};

//select
//get
brandsController.getAllBrands = async (req, res) => {
    try {
        const brands = await brandsModel.find()
        return res.status(200).json(brands)
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:"Internal server error"});
    }
};

//insert
//post
brandsController.insertBrand = async (req, res) => {
    try {
        //solicitamos los datos
        const {name, country, description} = req.body;

        const newBrand = new brandsModel({
            name,
            phone,
            country,
            description,
            image: req.file.path,
            public_id: req.file.filename,
        });
        await newBrand.save();
         return res.status(200).json({message:" Brand saved "});
        
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "});
    }
};


//update
//put
brandsController.updateBrand = async ( req, res ) => {
    try {
        //solicitamos los datos
        const {name, country, description} = req.body;

        const brandFound = await brandsModel.findById(req.params.id)
        
        const updatedData = {
            name, 
            country,
            description
        };

        //si viene una imagen nueva
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(brandFound.public_id);

            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        await brandsModel.findByIdAndUpdate(
            req.params.id, updatedData, {new: true}
        )

          return res.status(200).json({message:" Brand updated "})
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "})
    }
};


//delete
brandsController.deleteBrand = async (req, res ) =>{
    try {
        const brandFound = await brandsModel.findById(req.paramas.id)
        
        //elimino la imagen de cloudinary
        await cloudinary,uploader.destroy(brandFound.public_id)

        //eliminar al usuario de la base de datos
        await brandsModel.findByIdAndDlete(req.params.id)
        return res.status(200).json({message:" Brand delete "})
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "})
    }
}

export default brandsController;