const mongoose = require('mongoose');


const  AuctionSchema = mongoose.Schema({
        ProductID: {
        type: String,
        required: true
    },
        userID: {
        type: String,
        required: true
    },
        Amount: {
        type: Number,
        required: true
    },
       
},
{
    timestamps:true
});


const  Auction = mongoose.model(' Auction',  AuctionSchema);

module.exports =  Auction;
