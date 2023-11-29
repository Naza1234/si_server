const mongoose = require('mongoose');


const cartSchema = mongoose.Schema({
    itemID: {
        type: String,
        required: true
    },
    UserID: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});


const cart = mongoose.model('cart', cartSchema);

module.exports = cart;
