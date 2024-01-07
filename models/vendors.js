const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const VendorSchema = mongoose.Schema({
    vendorName: {
        type: String,
        required: true
    },
    vendorStoreName: {
        type: String,
        required: true
    },
    vendorStoreIcon: {
        type: String,
        required: true
    },
    vendorEmail: {
        type: String,
        required: true
    },
    vendorVerificationStatus: {
        type: String,
        required: true,
        default:"pending"
    },
    vendorMobile: {
        type: String,
        required: true
    },
    vendorAddress: {
        type: String,
        required: true
    },
    vendorPassword: {
        type: String,
        required: true
    },
    vendorAgreement: {
        type:Boolean,
        required: true,
        default: false
    },
    vendorAB: {
        type: Number,
        required: true,
        default:0,
    },
    vendorEarning: {
        type: Number,
        required: true,
        default:0,
    },
  
},
{
    timestamps: true
});

// Create a pre-save middleware to hash the password
VendorSchema.pre('save', async function(next) {
    try {
        // Check if the password has been modified, if not, skip hashing
        if (!this.isModified('vendorPassword')) {
            return next();
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.vendorPassword, salt);
        this.vendorPassword = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const vendor = mongoose.model('vendor', VendorSchema);

module.exports = vendor;
