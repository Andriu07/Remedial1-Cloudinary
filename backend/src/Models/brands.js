import {Schema,  model} from "mongoose";

const brandsSchema = new Schema(
    {
   name: {
     type: String
   }, 
   country: {
     type: String
   }, 
    description: {
     type: String
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

export default model ("Brands", brandsSchema);