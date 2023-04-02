const Product = require("../database/models/Product");

async function deleteProduct(data) {

    const { whatsappOwner, name, lote } = data;
    console.log(name, lote, "delete");

    try {
        return await Product.findOne({whatsappOwner, name, lote}).then(res => {

            if(res === null){
                return {status: 404, body:"Produto não encontrado. Não há como excluir."}

            } else {

                Product.deleteOne({whatsappOwner, name, lote});
                
            }

            return {status: 200, body: "Produto excluido com sucesso!"}
            
        });

    } catch(error) {

    }

    return {status: 200, body: "Hello there!" }

} 

module.exports = deleteProduct;