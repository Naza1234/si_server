const mongoose = require('mongoose');


const PaymentSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    ContactNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    ProductDeliveringStatus: {
        type: String,
        required: true,
        default:"awaitingVendor",
    },
},
{
    timestamps: true
});


const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
