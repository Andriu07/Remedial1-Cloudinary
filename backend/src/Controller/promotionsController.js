import promotionsModel from "../Models/promotions.js";
import {v2 as cloudinary} from "cloudinary";

//array de funciones
const promotionsController = {};

//select
//get
promotionsController.getAllPromotions = async (req, res) => {
    try {
        const promotions = await promotionsModel.find()
        return res.status(200).json(promotions)
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:"Internal server error"});
    }
};

//insert
//post
promotionsController.insertPromotions = async (req, res) => {
    try {
        //solicitamos los datos
        const {title, description, discount, expirationDate} = req.body;

        const newPromotion = new promotionsModel({
           title, 
           description, 
           discount,
            expirationDate,
            image: req.file.path,
            public_id: req.file.filename,
        });
        await newPromotion.save();
         return res.status(200).json({message:" Promotion saved "});
        
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "});
    }
};


//update
//put
promotionsController.updatePromotion = async ( req, res ) => {
    try {
        //solicitamos los datos
        const {title, description, discount, expirationDate} = req.body;

        const promotionFound = await promotionsModel.findById(req.params.id)
        
        const updatedData = {
           title, 
           description, 
           discount, 
           expirationDate
        };

        //si viene una imagen nueva
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(promotionFound.public_id);

            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        await promotionsModel.findByIdAndUpdate(
            req.params.id, updatedData, {new: true}
        )

          return res.status(200).json({message:" Promotions updated "})
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "})
    }
};


//delete
promotionsController.deletePromotion = async (req, res ) =>{
    try {
        const promotionFound = await promotionsModel.findById(req.paramas.id)
        
        //elimino la imagen de cloudinary
        await cloudinary,uploader.destroy(promotionFound.public_id)

        //eliminar al usuario de la base de datos
        await promotionsModel.findByIdAndDlete(req.params.id)
        return res.status(200).json({message:" Promotion delete "})
    } catch (error) {
        console.log("error" +  error)
         return res.status(500).json({message:" Internal server error "})
    }
}

export default promotionsController;