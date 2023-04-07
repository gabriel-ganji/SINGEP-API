const Product = require("../database/models/Product");

async function updateProduct(data) {

    const { whatsappOwner, name, lote, newPrice } = data;

    try {
        return await Product.findOne({whatsappOwner, name, lote}).then(res => {
            console.log(res);
            if(res === null){
                return {status: 404, body:"Produto não encontrado. Não há como atualizar."}
            } else {
                Product.updateOne({whatsappOwner, name, lote}, {$set: {price: newPrice}}).then(res => console.log(res));
            }

            return {status: 200, body: "Produto atualizado com sucesso!"}
            
        });

    } catch(error) {

    }

    return {status: 200, body: "Hello there!" }

} 

module.exports = updateProduct;