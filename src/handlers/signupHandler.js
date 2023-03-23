const User = require("../database/models/User");
const connectionDB = require("../database/database");
connectionDB();

async function signupHandler(data) {

    let nameAnalize = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.name);

    if(nameAnalize) {
        return {status: 400, body: "O nome do usuário não pode conter números ou characteres especias."}
    }

    if(data.password != data.confirmPassword) {
        return {status: 400, body: "Senhas divergentes, coloque a mesma senha nos dois campos."}
    }
    
    const created_at = Date.now();
    const updated_at = Date.now();
    const fullData = {...data, created_at, updated_at};

    try {
        
        let whatsapp = data.whatsapp;

        const resp = await User.findOne({ whatsapp }).then(user => {
            if(!user){

                //aqui deve ser feita a verificação via whatsapp para saber se o número de telefone é realmente válido ou não!

                User.create(fullData);
                return {status: 200, body: "Usuário criado com sucesso!"};
            } else {
                return {status: 200, body: "Whatsapp já cadastrado, faça o login."}
            }
        });

        return resp;

    } catch (error) {

        console.log(error);
        return {status: 500, body: "Erro no servidor. Por favor, tente mais tarde."};
        
    }
}

module.exports = signupHandler;