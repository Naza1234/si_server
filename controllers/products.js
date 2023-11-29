const DB=require('../models/products')
const PIDB=require('../models/productsImage')
// const fech=require()

exports.Addproducts= async(req,res)=>{
    try {
         const data=await DB.create(req.body)
         res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}
exports.GetAllproducts = async (req, res) => {
    try {
        // Extract the ID from the request parameters
       // Assuming you're passing the ID as a route parameter

        // Find all documents in the DB collection where _id matches the ID from the params
        const data = await DB.find({});

       
        // Create an array to hold the combined data and images
        const combinedDataAndImages = [];

        // Loop through each document in data
        for (const product of data) {
            // Find all images in the PIDB database related to the product
            const images = await PIDB.find({ itemID: product._id });

            // Combine the product data with the images
            const productWithImages = {
                ...product.toObject(), // Convert Mongoose document to plain JavaScript object
                images: images
            };

            // Add the combined data to the result array
            combinedDataAndImages.push(productWithImages);
        }

        res.status(200).json(combinedDataAndImages);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.GetAllproductsByvid = async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const id = req.params.id; // Assuming you're passing the ID as a route parameter

        // Find all documents in the DB collection where _id matches the ID from the params
        const data = await DB.find({ VendorID: id });

        if (data.length === 0) {
            return res.status(404).json({ message: 'No products found with the provided ID' });
        }

        // Create an array to hold the combined data and images
        const combinedDataAndImages = [];

        // Loop through each document in data
        for (const product of data) {
            // Find all images in the PIDB database related to the product
            const images = await PIDB.find({ itemID: product._id });

            // Combine the product data with the images
            const productWithImages = {
                ...product.toObject(), // Convert Mongoose document to plain JavaScript object
                images: images
            };

            // Add the combined data to the result array
            combinedDataAndImages.push(productWithImages);
        }

        res.status(200).json(combinedDataAndImages);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getProductBySearch = async(req , res) =>{
    try {
        const{id}=req.params
        // Extract the ID from the request parameters
       // Assuming you're passing the ID as a route parameter
        // Find all documents in the DB collection where _id matches the ID from the params
        const data = await DB.find({
            $and: [
              {
                $or: [
                  { ProductName: { $regex: id, $options: 'i' } }, // Case-insensitive search
                  { ProductDescription: { $regex: id, $options: 'i' } } // Case-insensitive search
                ]
              },
              { ProductAuctionEnded: false }
            ]
          });

       
        // Create an array to hold the combined data and images
        const combinedDataAndImages = [];

        // Loop through each document in data
        for (const product of data) {
            // Find all images in the PIDB database related to the product
            const images = await PIDB.find({ itemID: product._id });

            // Combine the product data with the images
            const productWithImages = {
                ...product.toObject(), // Convert Mongoose document to plain JavaScript object
                images: images
            };

            // Add the combined data to the result array
            combinedDataAndImages.push(productWithImages);
        }

        res.status(200).json(combinedDataAndImages);
    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}

exports.GetSingleproducts= async (req,res)=>{
    try {
        // Extract the ID from the request parameters
       // Assuming you're passing the ID as a route parameter
       const{id}=req.params
        // Find all documents in the DB collection where _id matches the ID from the params
        const data = await DB.findById(id);

        // Create an array to hold the combined data and images

        // Loop through each document in data
      
            // Find all images in the PIDB database related to the product
            const images = await PIDB.find({ itemID: data._id });

            // Combine the product data with the images
            const productWithImages = {
                ...data.toObject(), // Convert Mongoose document to plain JavaScript object
                images: images
            };

            // Add the combined data to the result array
            
        

        res.status(200).json(productWithImages);
    }  catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}


exports.UpdateSingleproducts=async (req,res)=>{
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


exports.DeleteSingleproducts= async(req,res)=>{
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