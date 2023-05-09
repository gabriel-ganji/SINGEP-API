const Product = require("../database/models/Product");

async function updateProductHandler(data) {

    const { whatsappOwner, name, lote, newPrice } = data;
    console.log(whatsappOwner, "NAME: ", name, lote, newPrice);

    try {
        return await Product.findOne({whatsappOwner, name, lote}).then(res => {
            console.log(res);
            if(res === null){
                return {status: 404, body:"Produto não encontrado. Não há como atualizar."}
            } else {
                Product.updateOne({whatsappOwner, name, lote}, {$set: {price: newPrice}}).then(res => console.log(res));
                return {status: 200, body: "Produto atualizado com sucesso!"}
            }
            
        });

    } catch(error) {
        console.log(error);
        return {status: 200, body: "Hello there!" }
    }

} 

module.exports = {updateProductHandler};