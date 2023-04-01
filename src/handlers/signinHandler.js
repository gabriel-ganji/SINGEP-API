const mongoose = require("mongoose");
const User = require("../database/models/User");
let bcrypt = require("bcryptjs");
// const connection = require("../database/database");
// connection();

const {jwtGenerator, jwtVerify} = require("./jwtHandler");

async function signinHandle(user, password){
    
    const whatsapp = user;
    
    try {

        const resp = await User.findOne({ whatsapp })
        .then(async(user) => {
            console.log(user);
            if (!user){

                return {status: 404, body: "Usuário não encontrado."};

            } else {

                const bcryptCompareRes = await bcrypt.compare(password, user.password).then(async(data) => {
                    if(data === true) {

                        const token = await jwtGenerator(user); 
                        const verify = await jwtVerify(token);

                        if (verify) {

                            return {status: 200, body: 'login realizado com sucesso!', token: token};

                        } else {
                            return {status: 400, body: 'Token inválido!'}
                        }
                        
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
        return {status: 500, body: "Erro no servidor. Por favor, tente novamente."}
    }
   
}

module.exports = signinHandle;