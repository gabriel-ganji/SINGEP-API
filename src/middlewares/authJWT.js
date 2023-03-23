const {jwtVerify} = require("../handlers/jwtHandler");

async function authJWT(req, res, next) {

    console.log("We are in authJWT");
    
    const authToken = req.headers['authorization'];

    console.log(authToken.length);

    if(authToken === undefined) {
        res.json("Token inválido").status(401);

    } else {
        const bearer = authToken.split(' ');
        
        if (bearer.length === 1) {

            let tokenVerification = await jwtVerify(authToken);

            if (tokenVerification === false) {
                res.json("Token inválido. Realize o login novamente").status(401);
            } else {
                next();
            }

        } else if (bearer.length === 2) {

            let tokenVerification = await jwtVerify(bearer[1]);

            if (tokenVerification === false) {
                res.json("Token inválido. Realize o login novamente").status(401);
            } else {
                next();
            }

        }
       
    }

}

module.exports = authJWT;
