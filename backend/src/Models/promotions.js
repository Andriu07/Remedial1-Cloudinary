import {Schema,  model} from "mongoose";

const promotionsSchema = new Schema(
    {
   title: {
     type: String
   },  
   description: {
    type: String
   },
   discount: {
    type: String
   },
   expirationDate: {
    type: Date
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

export default model ("Promotions", promotionsSchema);