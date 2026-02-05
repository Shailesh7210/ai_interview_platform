import express from "express";
import path from 'path'
import cors from "cors"
import {serve} from "inngest/express"

import { connectDB } from "./lib/db.js";
import {ENV} from './lib/env.js'
import { inngest, functions } from "./lib/inngest.js";



console.log(ENV.PORT)
const app = express();

const __dirname = path.resolve()


//Middlewares
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))


app.use("/api/inngest", serve({client: inngest, functions}))


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
        res.sendFile(path.join(__dirname,"../frontend/dist", "index.html"))
    })
}

app.listen(ENV.PORT,()=>{
    console.log("server is running on port", ENV.PORT)
connectDB()
})


