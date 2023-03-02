const mongoose = require("mongoose");

const jwtUserSchema = new mongoose.Schema(

    {
        token: {type: String, required: true}
    }

);

const jwtUser = mongoose.model('jwtUser', jwtUserSchema);

module.exports = jwtUser;