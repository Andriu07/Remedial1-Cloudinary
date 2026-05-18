import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";




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

export default app;