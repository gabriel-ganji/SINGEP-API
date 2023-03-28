const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        whatsapp: {type: String, required: true, unique: true},
        ownerof: {type: String, required: true},
        password: {type: String, required: true},
        auth: false,
        created_at: {type: Date, required: true},
        updated_at: {type: Date, required: true}
    
    }
);

UserSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;  
        