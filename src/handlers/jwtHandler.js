const jwt = require("jsonwebtoken");
const JWTSecret = "GabrieGanji01";

const jwtUser = require("../database/jwtUser");
const User = require("../database/User");

async function jwtGenerator(email) {

    const token = jwt.sign({email: email}, JWTSecret, {expiresIn: "1h"});
    return token;

}

async function jwtVerify(token) {

    try {

        jwt.verify(token, JWTSecret);
        return true;
    
    } catch(error) {

        console.log(error);
        return false;

    }
    
}

module.exports = {
    jwtGenerator, 
    jwtVerify
};