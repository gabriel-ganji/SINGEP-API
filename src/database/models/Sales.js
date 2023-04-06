const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema(
    {
        whatsappOwner: {type: String, required: true},
        products: {type: Object, required: true},
        totalPrice: {type: Number, required: true},
        totalun: {type: Number, required: true},
        created_at: {type: Date, required: true},
        updated_at: {type: Date, required: true}
    
    }
);

const Sales = mongoose.model('Sales', SalesSchema);

module.exports = Sales;  