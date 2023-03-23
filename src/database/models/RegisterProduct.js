const mongoose = require("mongoose");

const RegisterProductSchema = new mongoose.Schema(
    {

        name: {type: String, required: true},
        price: {type: String, required: true},
        lote: {type: String, required: true},
        expiry: {type: String, required: true},
        totalun: {type: Number, required: true},
        totalkg: {type: Number, required: true},
        created_at: {type: Date, required: true},
        updated_at: {type: Date, required: true}
    
    }
);

const RegisterProduct = mongoose.model('RegisterProduct', RegisterProductSchema);

module.exports = RegisterProduct;  