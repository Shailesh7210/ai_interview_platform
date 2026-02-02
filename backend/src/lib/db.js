import mongoose from "mongoose"
import{ENV} from "./env.js"

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log("Connected to the database", conn.connection.host)
    } catch (error) {
       console.log("Error in connecting to database",error)
       process.exit(1)

    }
}