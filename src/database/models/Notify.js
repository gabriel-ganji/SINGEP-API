const mongoose = require("mongoose");

const NotifySchema = new mongoose.Schema(
    {
        whatsappOwner: {type: String, required: true},
        prodName: {type: Object, required: true},
        prodLote: {type: String, required: true},
        expiry: {type: String, required: true},
        total: {type: String, required: true},
        latestSubmission: {type: Date, required: true}, 
        created_at: {type: Date, required: true},
        updated_at: {type: Date, required: true}
    }
)

const Notify = mongoose.model("Notify", NotifySchema);

module.exports = Notify;