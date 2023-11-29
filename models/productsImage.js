const mongoose = require('mongoose');


const productImageSchema = mongoose.Schema({
    itemID: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});


const productImage = mongoose.model('productImage', productImageSchema);

module.exports = productImage;
