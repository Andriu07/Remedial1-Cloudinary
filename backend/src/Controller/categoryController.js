import categorysModel from "../Models/categorys.js";
import {v2 as cloudinary} from "cloudinary";

//array de funciones
const categorysController = {};

//select
//get
categorysController.getAllCategorys = async (req, res) => {
    try {
        const categorys = await categorysModel.find()
        return res.status(200).json(categorys)
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:"Internal server error"});
    }
};

//insert
//post
categorysController.insertCategory = async (req, res) => {
    try {
        //solicitamos los datos
        const {name, description} = req.body;

        const newCategory = new categorysModel({
            name,
            description,
            image: req.file.path,
            public_id: req.file.filename,
        });
        await newCategory.save();
         return res.status(200).json({message:" Category saved "});
        
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "});
    }
};


//update
//put
categorysController.updateCategory = async ( req, res ) => {
    try {
        //solicitamos los datos
        const {name, description} = req.body;

        const categoryFound = await categorysModel.findById(req.params.id)
        
        const updatedData = {
            name, 
            description
        };

        //si viene una imagen nueva
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(categoryFound.public_id);

            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        await categorysModel.findByIdAndUpdate(
            req.params.id, updatedData, {new: true}
        )

          return res.status(200).json({message:" Category updated "})
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "})
    }
};


//delete
categorysController.deleteCategory = async (req, res ) =>{
    try {
        const categoryFound = await categorysModel.findById(req.paramas.id)
        
        //elimino la imagen de cloudinary
        await cloudinary,uploader.destroy(categoryFound.public_id)

        //eliminar al usuario de la base de datos
        await categoryssModel.findByIdAndDlete(req.params.id)
        return res.status(200).json({message:" Category delete "})
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "})
    }
}

export default categorysController;