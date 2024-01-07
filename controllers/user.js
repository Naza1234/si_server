const DB=require('../models/User')
const Cart = require('../models/cart'); // Replace with your actual Cart model
const Product = require('../models/products'); // Replace with your actual Product model
const PIDB= require('../models/productsImage'); // Replace with your actual Product model
const ADBModel= require('../models/Auction'); // Replace with your actual Product model
const purchaseProducts=require('../models/payment')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const Products = require('../models/products');
require('dotenv').config()

const stripe=require("stripe")(process.env.stripe_api_key)

exports.AddUsers= async(req,res)=>{

        try {
            const { UserEmail} = req.body;
    
            // Check if the email already exists in the database
            const existingUser = await DB.findOne({ UserEmail });
    
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }            
            // Create a new user
            const data=await DB.create(req.body)
            
            sendmail(req.body.UserEmail, req.body.UserName, req.body.winurl+`?ID=${data._id}`, () => {
                // Callback function is executed after sending the email
                res.status(200).json(data._id); // Send the response
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    
    
}
exports.login = async (req, res) => {
    try {
        const { UserEmail, UserPassword } = req.body;

        // Find the user by email
        const user = await DB.findOne({ UserEmail });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(UserPassword, user.UserPassword);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Return the user's _id if login is successful
        res.status(200).json(user._id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function sendmail(UserEmail, UserName ,winurl){
    const APIKEY=process.env.EMAIL_AIP_KEY
    let html=`
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title></title>

  <style type="text/css">
    @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
      .u-row .u-col-100 {
        width: 600px !important;
      }
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col>div {
        margin: 0 auto;
      }
    }
    
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table,
    td {
      color: #000000;
    }
    
    #u_body a {
      color: #0000ee;
      text-decoration: underline;
    }
  </style>



  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
  <!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->



          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">

                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="center">

                                    <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;"
                                      width="150.8" />

                                  </td>
                                </tr>
                              </table>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 140%;"><strong>T H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;S I G N I N G&nbsp; &nbsp;U P !</strong></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
                                  </span>
                                </p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Welcome to our Auction Platform!</span></p>
                                <p style="line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">You're almost ready to start your bidding journey. Please click on the button below to verify your email address and gain access to exclusive features for an exceptional buying experience on our auction platform! </span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                              <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                              <div align="center">
                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${winurl}" style="height:46px; v-text-anchor:middle; width:235px;" arcsize="8.5%"  stroke="f" fillcolor="#802000"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                <a href="${winurl}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #802000; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                  <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">VERIFY YOUR EMAIL</span></strong>
                                  </span>
                                  </span>
                                </a>
                                <!--[if mso]></center></v:roundrect><![endif]-->
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>
                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">The Smarter Team</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                              <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Company All Rights Reserved</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>



          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
    `
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user : "smasterauction56@gmail.com",
            pass: APIKEY
        }
    })
    const message = {
            from: 'smasterauction56@gmail.com', // sender address
            to:UserEmail, // list of receivers
            subject: "Welcome onboard!", // Subject line
            html:html, 
        }
        transporter.sendMail(message,()=>{
            callback();
        })


}
exports.GetAllUsers= async(req,res)=>{
    try {
        
       const data=await DB.find({})
        
       res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}
 
exports.getProducts=async(req,res)=>{
    try {
      
        const data = await Product.find({});

       
        // Create an array to hold the combined data and images
        const combinedDataAndImages = [];
        const ProductWithActiveAuction=[]
        const ProductWithPumpingAuction=[]
        const ProductWithAuctionAboutToStart=[]
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        const month = Math.floor(currentDate.getMonth().toString().padStart(2, '0'))+1; // Months are 0-based, so add 1
        const day = currentDate.getDate().toString().padStart(2, '0');
        
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
        // Loop through each document in data
        for (const product of data) {
            // Find all images in the PIDB database related to the product
            const images = await PIDB.find({ itemID: product._id });

            // Combine the product data with the images
            const productWithImages = {
                ...product.toObject(), // Convert Mongoose document to plain JavaScript object
                images: images
            };
            combinedDataAndImages.push(productWithImages);
            
            
            
        }
        for (let i = 0; i < combinedDataAndImages.length; i++) {
            const element = combinedDataAndImages[i];
            if (!element.ProductAuctionEnded) {

              if (element.ProductAuctionStartData > formattedDateTime) {
                ProductWithAuctionAboutToStart.push(element)
            }else{
                ProductWithActiveAuction.push(element)
            } 
            }
           
        }
            
     
                    // Handle the case when ProductWithActiveAuction.length is 5 or more
                    const productAuctionsCount = {}; // Object to store the count of auctions for each product
            
                    // Loop through the products in ProductWithActiveAuction
                    for (let k = 0; k < ProductWithActiveAuction.length; k++) {
                        const productC = ProductWithActiveAuction[k];
                        const productId = productC._id;
            
                        // Search the ADB database for auctions related to the product
                        const auctions = await ADBModel.find({ ProductID: productId });
            
                        // Calculate the number of auctions and store it in the object
                        productAuctionsCount[productId] = auctions.length;
                    }
            
                    // Sort the products by the number of auctions in descending order
                    const sortedProducts = ProductWithActiveAuction.slice().sort((a, b) => {
                        return productAuctionsCount[b._id] - productAuctionsCount[a._id];
                    });
            
                    // Take the first 5 products with the most auctions and add them to ProductWithPumpingAuction
                    const top5Products = sortedProducts.slice(0, Math.min(sortedProducts.length, 5));
                    ProductWithPumpingAuction.push(...top5Products);
            // Add the combined data to the result array
         
        

     // Organize your responses into an object
     const response = {
        ProductWithActiveAuction,
        ProductWithAuctionAboutToStart,
        ProductWithPumpingAuction,
    };

    res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
    
exports.getCartItems = async (req, res) => {
        try {
            const { id } = req.params; // UserID from request parameters
    
            // Find all cart items with UserID matching the provided id
            const cartItems = await Cart.find({ UserID: id });
    
            if (!cartItems || cartItems.length === 0) {
                return res.status(404).json({ message: 'No cart items found' });
            }
    
            // Create an array to store the results
            const results = [];
    
            // Iterate through each cart item
            for (const cartItem of cartItems) {
                // Retrieve the product based on the itemID from the cart item
                const product = await Product.findById(cartItem.itemID);
    
                // Ensure the product exists before adding it to the results
                if (product) {
                    results.push(product);
                }
            }
    
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

exports.getPayedProducts = async (req,res)=>{
    try {
        const{id}=req.params
        const PData= await purchaseProducts.find({userId:id})
        const combinedDataAndImages = [];
        const PurchasedProducts=[]
        const shipments=[]
        for (const iterator of PData) {
            const products = await Product.find({ _id: iterator.productId});
            for (const product of products) {
                // Find all images in the PIDB database related to the product
                const images = await PIDB.find({ itemID: product._id });
    
                // Combine the product data with the images
                const productWithImages = {
                    ...product.toObject(), // Convert Mongoose document to plain JavaScript object
                    images: images,
                    payment:iterator
                };
                combinedDataAndImages.push(productWithImages);             
            }
        }
        
        for (const iterator of combinedDataAndImages) {
            if (iterator.payment.ProductDeliveringStatus === "awaitingVendor") {
                shipments.push(iterator)
            }
            if (iterator.payment.ProductDeliveringStatus === "awaitingUser" || iterator.payment.ProductDeliveringStatus === "Delivered") {
                PurchasedProducts.push(iterator)
            }
           
        }
        const response = {
           PurchasedProducts,
           shipments
        };
    
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}

exports.pay = async (req, res) => {
  try {
      const cartItemID = req.body;
      const items = [];

      // Fetch product details for the selected items
      for (const iterator of cartItemID) {
          const item = await Product.findById(iterator); // Use findById to fetch by _id
          items.push(item);
      }
     
      // Construct the line_items array
      const line_items = items.map(item => {
          return {
              price_data: {
                  currency: "usd",
                  product_data: {
                      name: item.ProductName,
                  },
                  unit_amount: item.ProductAuctionPrice * 100, // Convert to cents
              },
              quantity: 1,
          };
      });
        
      // Create the Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: line_items, // Include the line_items array
          success_url: `${process.env.url}/user/Pay.html`,
          cancel_url: `${process.env.url}/user/PayOut.html`,
      });

      // Send the URL of the Stripe Checkout session to the client
      res.json({ url: session.url });
  } catch (error) {
      res.status(500).json({
          message: error.message,
      });
  }
};



exports.GetSingleUsers= async (req,res)=>{
    try {
        const{id}=req.params
        const data=await DB.findById(id)
        
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}


exports.UpdateSingleUsers=async (req,res)=>{
  const { id } = req.params;

  // Check if id is a valid ObjectId (assuming _id is always an ObjectId)
  const isObjectId = mongoose.Types.ObjectId.isValid(id);
  
  // Define the query based on the type of identifier provided
  const query = isObjectId ? { _id: id } : { UserEmail: id };
  
  try {
    const data = await DB.findOneAndUpdate(query, req.body, { new: true });
  
    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
}


exports.DeleteSingleUsers= async(req,res)=>{
    try {
        

        const{id}=req.params
        const data=await DB.findByIdAndDelete(id)
        
        res.status(200).json(data)


    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}


exports.verifyUserEmail= async(req,res)=>{
  try {  
    const{id}=req.params
		var digits = '0123456789';
		var otp = '';
		for (var i = 0; i < 6; i++) {
		  otp += digits[Math.floor(Math.random() * 10)];
		}
        let html =`
        <body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tbody><tr>
                                    <td class="pad">
                                      <h1 style="margin: 0; color: #0900a5; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Dear [${req.body.name}],</span></h1>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tbody><tr>
                                    <td class="pad">
                                      <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:20px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
                                        <p style="margin: 0; margin-bottom: 16px;">Thank you for registering for an account on smaster.live.</p>
                                        <p style="margin: 0;">To verify your account, please enter the following code in the verification field on the smaster.live website:</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tbody><tr>
                                    <td class="pad" style="padding-bottom:30px;padding-left:10px;padding-right:10px;padding-top:30px;text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #0900a5; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 21px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">[${otp}]</span></h1>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tbody><tr>
                                    <td class="pad">
                                      <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:20px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
                                        <p style="margin: 0; margin-bottom: 16px;">This code is valid for 15 minutes. If you do not enter the code within 15 minutes, you will need to request a new code.</p>
                                        <p style="margin: 0; margin-bottom: 16px;">If you have any questions, please do not hesitate to contact us.</p>
                                        <p style="margin: 0; margin-bottom: 16px;">Sincerely,</p>
                                        <p style="margin: 0;">The <strong>smaster.live</strong> Team</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      
      
      
      </body>
		`
		 const APIKEY=process.env.EMAIL_AIP_KEY
		var transporter = nodemailer.createTransport({
		  service: "gmail",
        auth: {
            user : "smasterauction56@gmail.com",
            pass: APIKEY
        }
		})
		const message = {
				from: 'smasterauction56@gmail.com', // sender address
				to:id, // list of receivers
				subject: "verification code from smaster.live", // Subject line
				html:html, 
			}
			transporter.sendMail(message,(error,info)=>{
				if(error){
					res.status(500).json({
								      message:error
							   })
				}else{
					res.status(200).json({
									   code:otp
								  })
				}
				
			})
	
        
    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}

