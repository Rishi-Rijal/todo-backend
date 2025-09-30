import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import { app } from "./app.js";
import { connectDB } from "./src/db/index.js"


connectDB()
    .then(()=>{
        app.on("error", (error) =>{
            console.log("Error in the app", error);
        })

        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server running in port ${process.env.PORT}`);
        });
    })
    .catch(error =>{
        console.log("Mongodb connection failed", error);
    });