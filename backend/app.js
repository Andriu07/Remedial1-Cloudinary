import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import brandsRoute from "./src/Routes/brandsRoute.js"
import categorysRoute from "./src/Routes/categoryRoute.js"
import productsRoute from "./src/Routes/productsRoute.js"
import promotionsRoute from "./src/Routes/promotions.js"


//creo una constante que guarde mi libreria express
const app = express();

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    //perimitir el envio de cookies y credenciales
    credentials: true,
}))


app.use(cookieParser());

//PARA QUE ACEPTE LOS JSON DESDE POSTMAN
app.use(express.json());

app.use("/api/brands" , brandsRoute)
app.use("/api/products", productsRoute)
app.use("/api/categorys", categorysRoute)
app.use("/api/promotions", promotionsRoute)

export default app;