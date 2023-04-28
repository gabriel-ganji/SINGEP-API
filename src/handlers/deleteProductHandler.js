const Product = require("../database/models/Product");

async function deleteProductHandler(data) {

    const { whatsappOwner, name, lote } = data;
    console.log(whatsappOwner, name, lote, "delete");

    try {
        return await Product.findOneAndDelete({whatsappOwner, name, lote}).then(res => {
            console.log(res);
            if(res == null) {
                return {status: 404, body:"Produto não encontrado. Não há como excluir."}
            } else {
                return {status: 200, body: "Produto excluido com sucesso!"}
            }

            // if(res === null){
            //     return {status: 404, body:"Produto não encontrado. Não há como excluir."}

            // } else {

            //     Product.deleteOne({whatsappOwner: whatsappOwner, name: name, lote: lote});
                
            // }

            
            
        });

    } catch(error) {
        console.log(error);
        return {status: 404, body:"Produto não encontrado. Não há como excluir."}
    }

} 

module.exports = { deleteProductHandler };