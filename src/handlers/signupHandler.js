const User = require("../database/models/User");
const connectionDB = require("../database/database");
connectionDB();

//generate code
const {generateCode} = require("../services/codeConfirm");

//axios
const axios = require("axios");

async function signupHandler(data) {

    let nameAnalize = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.name);
    let whatsappAnalize = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/.test(data.whatsapp);
    //let emailAnalize = /[`!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/.test(data.email);

    let name = data.name.toLowerCase();
    let email = data.email.toLowerCase();
    let whatsapp = data.whatsapp;
    whatsapp = data.whatsapp.replace(/[^a-zA-Z0-9]/g, "");
    let ownerof = data.ownerof.toLowerCase();
    let password = data.password;

    if(name === undefined || email == undefined || whatsapp == undefined || ownerof == undefined || password == undefined) {
        return {status: 500, body: "Erro, algum campo está indefinido."};
    }

    if(nameAnalize) {
        return {status: 400, body: "O nome do usuário não pode conter números ou characteres especias."};
    }

    if(whatsappAnalize) {
        return {status: 400, body: "O seu whatsapp não pode conter characteres especias."};
    }

    if(whatsapp.length !== 11 && whatsapp.length !== 12 ){
        return {status: 400, body: "O seu número de whatsapp está errado."};
    }

    if(data.password.length < 6){
        return {status: 400, body: "Senha muito curta. Digite uma senha com seis caracteres ou mais."};
    } 
    else if(data.password != data.confirmPassword) {
        return {status: 400, body: "Senhas divergentes, coloque a mesma senha nos dois campos."};
    }

    try {

        return await User.findOne({ whatsapp }).then(async(userWhatsapp) => {

            if(!userWhatsapp){

               return await User.findOne({ email }).then(async(userEmail) => {
            
                    if(!userEmail){

                        ///
                        //aqui deve ser feita a verificação via whatsapp para saber se o número de telefone é realmente válido ou não!
                        const codeConfirm = generateCode(name, whatsapp);

                        const number = `55${whatsapp}@c.us`;
                        const message = `Olá, ${name.toUpperCase()}. \nSeja bem-vindo(a) ao SINGEP. \n\nSeu código de confirmação é: ${codeConfirm}.`;
                        await axios.post("http://localhost:3033/send", {number: number, message: message});
                        
                        const created_at = Date.now();
                        const updated_at = Date.now();

                        const fullData = {
                            name,
                            email,
                            whatsapp,
                            ownerof,
                            password,
                            auth: false,
                            code: codeConfirm,
                            created_at,
                            updated_at
                        };

                        await User.create(fullData);
                        return {status: 200, body: "Usuário criado com sucesso!"};

                    } else {

                        return {status: 409, body: "Email já cadastrado, faça o login."};

                    }

                });
                
            } else {

                return {status: 409, body: "Whatsapp já cadastrado, faça o login."};

            }
        });

    } catch (error) {

        console.log(error);
        return {status: 500, body: "Erro no servidor. Por favor, tente mais tarde."};
        
    }
}

module.exports = signupHandler;