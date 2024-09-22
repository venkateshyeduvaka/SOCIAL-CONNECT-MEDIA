const express=require("express")
const mongoose=require("mongoose")
require("dotenv").config();
const bodyParser = require('body-parser');
const cors =require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app=express()

app.use(express.json());

const UserRoute=require("./routes/UserRoute")
const PostRoute=require("./routes/PostRoute")


app.use(bodyParser.json({ limit: "30mb", extended: true })) 
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); 


app.use(cors())
app.use(cookieParser());

//mongoose.connect('mongodb://127.0.0.1:27017/Project2') 

app.use('/user', UserRoute);
app.use("/post",PostRoute)

const PORT =4001 || process.env.PORT;


connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("Connected to db");
      console.log(`Server is running ${PORT}`);
    });
  });
  

  
/*app.listen(4001,()=>{
    console.log("server running")
}) */
