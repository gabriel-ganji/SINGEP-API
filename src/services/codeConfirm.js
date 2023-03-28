function generateCode(name, whatsapp){

    name = name.replace(" ", "");
    code = name.slice(0, 2) + whatsapp.slice(0, 3) + name.slice(-3, -1);
    return code.toUpperCase();
    
}

module.exports = {generateCode};