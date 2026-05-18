import {Schema,  model} from "mongoose";

const productsSchema = new Schema(
    {
   name: {
     type: String
   }, 
   idCategory: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "Categorys",
   }, 
 idBrand: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
   }, 
   price: {
    type: Number
   },
   image:{
    type:String
 },
 //public_id sirve para eliminar la oto de cloudinary
  public_id:{
    type:String
 }
},
 {timestamps:true,
  strict: false,}
);

export default model ("Products", productsSchema);