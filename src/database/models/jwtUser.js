const mongoose = require("mongoose");

const jwtUserSchema = new mongoose.Schema(

    {
        token: {type: String},
        created_at: {type: Date}
    }

);

// jwtUserSchema.index({token: 1}, {expireAfterSeconds: 6});

const jwtUser = mongoose.model('jwtUser', jwtUserSchema);


module.exports = jwtUser;