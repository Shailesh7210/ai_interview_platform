import express from "express";
import {ENV} from './lib/env.js'
import path from 'path'
import { connectDB } from "./lib/db.js";


console.log(ENV.PORT)
const app = express();

const __dirname = path.resolve()

app.use('/health',(req,res)=>{
    res.status(200).json({message: "this is health endpoint"})
})

app.use('/book',(req,res)=>{
    res.status(200).json({message: "this is book endpoint"})
})



// make our app ready for deployment

if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"))
    })
}

app.listen(ENV.PORT,()=>{
    console.log("server is running on port", ENV.PORT)
connectDB()
})


