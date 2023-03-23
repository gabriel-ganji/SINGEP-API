const mongoose = require("mongoose");
const User = require("../database/models/User");
let bcrypt = require("bcryptjs");
// const connection = require("../database/database");
// connection();

const {jwtGenerator, jwtVerify} = require("./jwtHandler");

async function signinHandle(user, password){

    try {

        const whatsapp = user;
        const passwordf = password;

        const resp = await User.findOne({ whatsapp })
        .then(async(user) => {
            if (!user){

                return {status: 404, message: "Not Found"};

            } else {

                const bcryptCompareRes = await bcrypt.compare(passwordf, user.password).then(async(data) => {
                    if(data === true) {

                        const token = await jwtGenerator(whatsapp); 
                        const verify = await jwtVerify(token);

                        if (verify) {

                            return {status: 200, message: 'login realizado com sucesso!', token: token};

                        } else {
                            return {status: 400, message: 'Token inválido!'}
                        }
                        
                    } else {
                        return {status: 500, message: "Senha incorreta!"};
                    } 
                });

                return bcryptCompareRes;
            
            }     
    });

    return resp;

    } catch(error) {
        console.log(error);
        return {status: 500, message: "Erro no servidor. Por favor, tente novamente"}
    }
   
}

module.exports = signinHandle;