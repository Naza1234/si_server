const mongoose = require('mongoose');


const ProductsSchema = mongoose.Schema({
    VendorID: {
        type: String,
        required: true
    },
    ProductName: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true
    },
    ProductAuctionPrice: {
        type: Number,
        required: true,
        default:0
    },
    ProductAuctionStartData: {
        type: String,
        required: true
    },
    ProductAuctionEndData: {
        type: String,
        required: true
    },
    ProductAuctionEnded: {
        type: Boolean,
        required: true,
        default:false
    },
    ProductDescription: {
        type: String,
        required: true
    },
    ProductPurchased: {
        type: Boolean,
        required: true,
        default:false
    },
},
{
    timestamps: true
});


const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;
