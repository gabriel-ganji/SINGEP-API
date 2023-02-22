const mongoose = require("mongoose");
const User = require("../database/User");
let bcrypt = require("bcryptjs");
// const connection = require("../database/database");
// connection();

async function signinHandle(user, password){

    try {

        const whatsapp = user;
        const passwordf = password;

        const resp = await User.findOne({ whatsapp })
        .then(async(user) => {
            //if user not exist than return status 400
            if (!user){

                return {status: 404, body: "Not Found"};

            } else {

                const bcryptCompareRes = await bcrypt.compare(passwordf, user.password).then(data => {
                    if(data === true) {
                        return {status: 200, body: "login realizado com sucesso!"};
                    } else {
                        return {status: 500, body: "Senha incorreta!"};
                    }
                });

                return bcryptCompareRes;
            
            }     
    });

    return resp;

    } catch(error) {
        console.log(error);
    }
   
}

module.exports = signinHandle;