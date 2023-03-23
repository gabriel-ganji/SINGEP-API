const mongoose = require("mongoose");

const jwtUserSchema = new mongoose.Schema(

    {
        token: {type: String, expires: 6, required: true}
    }

);

jwtUserSchema.index({token: 1}, {expireAfterSeconds: 6});

const jwtUser = mongoose.model('jwtUser', jwtUserSchema);


module.exports = jwtUser;