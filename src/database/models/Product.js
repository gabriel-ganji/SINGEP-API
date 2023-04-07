const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        whatsappOwner: {type: String, required: true},
        name: {type: String, required: true},
        price: {type: String, required: true},
        lote: {type: String, required: true},
        expiry: {type: String, required: true},
        totalun: {type: Number},
        totalkg: {type: Number},
        created_at: {type: Date, required: true},
        updated_at: {type: Date, required: true}
    
    }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;  