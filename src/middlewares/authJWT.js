const {jwtVerify} = require("../handlers/jwtHandler");

async function authJWT(req, res, next) {
    
    const authToken = req.headers['authorization'];

    if(authToken === undefined) {
        res.json("Token inválido").status(401);

    } else {
        const tokenVerification = await jwtVerify(authToken);
        
        if(tokenVerification == false) {
            res.json("Token inválido. Realize o login novamente").status(401);
        } else {
            next();
        }
    }

}

module.exports = authJWT;