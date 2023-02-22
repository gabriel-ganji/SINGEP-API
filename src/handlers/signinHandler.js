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
        return {status: 500, body: "Erro no servidor. Por favor, tente novamente"}
    }
   
}

module.exports = signinHandle;