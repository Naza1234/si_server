const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const cors = require('cors');



const corsOptions = {
    origin: 'https://auction.smaster.live/', // Allow requests from this specific URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  };
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/image",express.static("./image"))




    // All Routes in this API

    const UserRoute = require("./routes/userRouts");
    app.use("/user",UserRoute)  

    const vendorRoute = require("./routes/vendor");
    app.use("/vendor",vendorRoute)  

    const productsRoute = require("./routes/products");
    app.use("/products",productsRoute)  

    const AuctionRoute = require("./routes/Auction");
    app.use("/Auction",AuctionRoute)  

    const cartRoute = require("./routes/cart");
    app.use("/cart",cartRoute)  

    const paymentsRoute = require("./routes/payments");
    app.use("/payments",paymentsRoute)  

    const withdrawalRoute = require("./routes/withdrawal");
    app.use("/withdrawal",withdrawalRoute) 

    const productImageRoute = require("./routes/productImage");
    app.use("/productImage",productImageRoute)  


// data base connection

const url="mongodb+srv://actionwebsite:chibuike123@cluster0.v22hskb.mongodb.net/?retryWrites=true&w=majority"

const port=3000



mongoose
.connect(url)
.then(()=>{
    console.log('since with database made');
    app.use("/",(req,res)=>{
        res.end('origin')
      })
    app.listen(port,()=>{
        console.log(`server is now running on ${port} `);
    })
}).catch((error)=>{
    console.log(error.message);
})