const jwt = require("jsonwebtoken");
const JWTSecret = "GabrieGanji01";

const User = require("../database/models/User");

async function jwtGenerator(email) {

    const token = jwt.sign({email: email}, JWTSecret, {expiresIn: 3600});
    return token;

}

async function jwtVerify(token) {

    try {

        const verify = jwt.verify(token, JWTSecret);
        return verify;
    
    } catch(error) {

        console.log(error);
        return false;

    }
    
}

module.exports = {
    jwtGenerator, 
    jwtVerify
};