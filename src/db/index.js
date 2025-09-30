import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);

        console.log("Connected to database successfully");
        console.log("DB Host: ", connectionInstance.connection.host);

        console.log(process.env.MONGODB_URI, process.env.DB_NAME);

    } catch (error) {
        console.log("Error connecting to the database", error);
        process.exit(1);
    }
}

export  { connectDB }