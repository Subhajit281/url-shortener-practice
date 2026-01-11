require("dotenv").config();
const express = require("express");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const {connectMongoDB} = require("./connection");
const app = express();
const port = 8080;
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
// const url = require("./models/url");

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("MongoDB Connected Successfully"));

//routes
app.use('/url',urlRoute);
app.use('/user',userRoute);
app.use(cookieParser());



app.use(errorHandler);
app.listen(port,()=>console.log(`Server Running at Port ${port}`));