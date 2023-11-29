const DB=require('../models/payment')
const PDB=require('../models/products')
const VDB=require('../models/vendors')

exports.Addpayment= async (req,res)=>{
    try {
        
        const {userID,contact,location}= req.body
        const data=await DB.create(req.body)
       for (const iterator of req.body.itemsID) {
         var params={
            userId:userID,
            productId:iterator,
            ContactNumber:contact,
            location:location,
         }
         const data=await DB.create(params) 
       }
        res.status(200).json(data)

        
    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}

exports.GetAllpayment=async (req,res)=>{
    try {
        
        const data=await DB.find({})
        
        res.status(200).json(data)



    } catch (error) {
        res.status(500).json({
            message:error.message
          }) 
    }
}

exports.approved = async (req,res)=>{
    try {
        const{id}=req.params
        var params={
            ProductDeliveringStatus:"Delivered"
        }
j
        const data=await DB.findByIdAndUpdate(id,params)  
        const pData=await PDB.find({_id:data.productId})
        const vData=await VDB.find({_id:pData.VendorID})
        var amount=vData.vendorAB + pData.ProductAuctionPrice
        VDB.updateOne(
            { _id: vData._id }, // Use the unique identifier for the document, often _id
            { $set: { vendorAB: amount } }, // Update the field to true
        );
    } catch (error) {
        res.status(500).json({
            message:error.message
          })   
    }
}

exports.GetSinglpayment=async (req,res)=>{
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


exports.UpdateSinglpayment=async (req,res)=>{
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


exports.DeleteSinglpayment=async (req,res)=>{
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