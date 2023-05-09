const User = require("../database/models/User");

async function authAccount(data){
    
    let whatsapp = data.user;
    let code = data.code;

    try {
        return User.findOneAndUpdate({whatsapp, code}, {auth: true}).then(res => {
            if(res){
                return {status: 200, body: "Conta autenticada com sucesso!"};
            } else {
                return {status: 404, body: "Erro, não foi possível autenticar conta!"};
            }
        });
    } catch(error){
        console.log(error);
        return {status: 500, body: "Erro no servidor. Por favor tente novamente mais tarde."};
    }
    
    
}

module.exports = authAccount;