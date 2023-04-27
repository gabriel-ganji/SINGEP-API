function generateCode(name, whatsapp){

    name = name.replace(" ", "");
    code = name.slice(0, 2) + whatsapp.slice(-2) + name.slice(-2);
    return code.toUpperCase();
    
}

module.exports = {generateCode};