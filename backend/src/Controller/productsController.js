import productsModel from "../Models/products.js";
import {v2 as cloudinary} from "cloudinary";

//array de funciones
const productsController = {};

//select
//get
productsController.getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.find()
        return res.status(200).json(products)
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:"Internal server error"});
    }
};

//insert
//post
productsController.insertProduct = async (req, res) => {
    try {
        //solicitamos los datos
        const {name, categoryId, brandId, price} = req.body;

        const newProduct = new productsModel({
            name,
            categoryId, 
            brandId,
            price,
            image: req.file.path,
            public_id: req.file.filename,
        });
        await newProduct.save();
         return res.status(200).json({message:" Product saved "});
        
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "});
    }
};


//update
//put
productsController.updateProduct = async ( req, res ) => {
    try {
        //solicitamos los datos
        const {name, categoryId, brandId, price} = req.body;

        const productFound = await productsModel.findById(req.params.id)
        
        const updatedData = {
            name, 
            categoryId,
             brandId,
             price
        };

        //si viene una imagen nueva
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(productFound.public_id);

            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        await productsModel.findByIdAndUpdate(
            req.params.id, updatedData, {new: true}
        )

          return res.status(200).json({message:" Product updated "})
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "})
    }
};


//delete
productsController.deleteProduct= async (req, res ) =>{
    try {
        const productFound = await productsModel.findById(req.paramas.id)
        
        //elimino la imagen de cloudinary
        await cloudinary,uploader.destroy(productFound.public_id)

        //eliminar al usuario de la base de datos
        await productsModel.findByIdAndDlete(req.params.id)
        return res.status(200).json({message:" Product delete "})
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "})
    }
}

export default productsController;