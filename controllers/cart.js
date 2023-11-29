const DB=require('../models/cart')
const PDB=require("../models/products")
const PIDB=require("../models/productsImage")
exports.Addcart= async (req,res)=>{
    try {
        

        const data=await DB.create(req.body)

        res.status(200).json(data)

        
    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}

exports.GetcartByUesrId= async (req,res)=>{
    try {
        const{id}=req.params

        const data=await DB.find({UserID:id})
        const items = [];
        const combinedDataAndImages = [];
        // Loop through each document in data
        for (const product of data) {
            // Find all images in the PIDB database related to the product
            const Products = await PDB.find({ _id: product.itemID });

            // Combine the product data with the images
            const product = {
                ...Products.toObject(),
                cart:product
            };
            // Add the combined data to the result array
            items.push(product);
        }
        for (const product of items) {
            const images = await PIDB.find({ itemID: product._id });

            // Combine the product data with the images
            const productWithImages = {
                ...product.toObject(), // Convert Mongoose document to plain JavaScript object
                images: images
            };

            // Add the combined data to the result array
            combinedDataAndImages.push(productWithImages);
        }

        res.status(200).json(combinedDataAndImages)

        
    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}

exports.GetAllcart=async (req,res)=>{
    try {
        
        const data=await DB.find({})
        
        res.status(200).json(data)



    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}



exports.GetSinglcart=async (req,res)=>{
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


exports.UpdateSinglcart=async (req,res)=>{
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


exports.DeleteSinglcart=async (req,res)=>{
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