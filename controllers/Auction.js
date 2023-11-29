const DB=require('../models/Auction')
const Product=require("../models/products")
exports.AddAuction= async (req,res)=>{
    try {
              // Extract the required data from req.body
              const { ProductID, Amount} = req.body;

              // Update the Product in the Product database
              // Find the product by its _id and update the ProductAuctionPrice
              await Product.findOneAndUpdate(
                  { _id: ProductID },
                  { $set: { ProductAuctionPrice: Amount } }
              );
      
              // Create the auction data in the DB database
              const data = await DB.create(req.body);
      
              res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}

exports.GetAllAuction=async (req,res)=>{
    try {
        
        const data=await DB.find({})
        
        res.status(200).json(data)



    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}
exports.GetAllById=async (req,res)=>{
    try {
        const{id}=req.params
        const data=await DB.find({ProductID:id})
        
        res.status(200).json(data)



    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}



exports.GetSinglAuction=async (req,res)=>{
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


exports.UpdateSinglAuction=async (req,res)=>{
    try {
        
        const{id}=req.params
        const data=await DB.findByIdAndUpdate(id,req.body)
        
        res.status(200).json(data)




    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}


exports.DeleteSinglAuction=async (req,res)=>{
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