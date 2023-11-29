const mongoose = require('mongoose');


const WithdrowalSchema = mongoose.Schema({
    UserID: {
        type: String,
        required: true
    },
    BankName: {
        type: String,
        required: true
    },
    Accountname: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    AcountNumber: {
        type: String,
        required: true
    },
    Approved: {
        type:Boolean,
        required: true,
        default:false
    },
  
},
{
    timestamps: true
});


const Withdrowal = mongoose.model('Withdrowal', WithdrowalSchema);

module.exports = Withdrowal;
