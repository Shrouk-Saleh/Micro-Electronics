require('dotenv').config()
const express = require("express");
const mongoose=require("mongoose")
const app = express();
const userRoute = require("./routes/authRoutes");
const productRoute= require("./routes/ProductRoutes")
app.use(express.json())


async function dbConnection(){
    try{
       await mongoose.connect(process.env.URL)
        console.log("DB IS CONNECTION");
        
    }
    catch{
        console.log(error);
        
    }
}
dbConnection();



const port = process.env.PORT || 5000;


app.use("/users", userRoute);
app.use("/product", productRoute);

app.listen(port,()=>{
    console.log(`server is running 🤸🤸 ${port}`);

})


