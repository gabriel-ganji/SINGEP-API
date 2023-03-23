const User = require("../database/models/User");
const connectionDB = require("../database/database");
connectionDB();

async function signupHandler(data) {

    let nameAnalize = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.name);
    let whatsappAnalize = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.whatsapp);

    if(nameAnalize) {
        return {status: 400, body: "O nome do usuário não pode conter números ou characteres especias."}
    }

    if(whatsappAnalize) {
        return {status: 400, body: "O seu whatsapp não pode conter characteres especias."}
    }

    if(data.password.length < 6){
        return {status: 400, body: "Senha muito curta. Digite uma senha com seis caracteres ou mais."}
    } 
    else if(data.password != data.confirmPassword) {
        return {status: 400, body: "Senhas divergentes, coloque a mesma senha nos dois campos."}
    } 
    
    const created_at = Date.now();
    const updated_at = Date.now();
    const fullData = {...data, created_at, updated_at};

    try {
        
        let whatsapp = data.whatsapp;
        let email = data.email;

        const resp = await User.findOne({ whatsapp }).then(async(userWhatsapp) => {

            if(!userWhatsapp){

               return await User.findOne({ email }).then(async(userEmail) => {
            
                    if(!userEmail){
                        await User.create(fullData);
                        ///
                        //aqui deve ser feita a verificação via whatsapp para saber se o número de telefone é realmente válido ou não!
                        ///
                        return {status: 200, body: "Usuário criado com sucesso!"};
                    } else {
                        return {status: 200, body: "Email já cadastrado, faça o login."}
                    }

                });
                
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