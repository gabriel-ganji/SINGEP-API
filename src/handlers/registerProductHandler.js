//Model
const Product = require("../database/models/Product");

async function registerProductHandler(data){

    const {whatsappOwner, name, price, lote, expiry, totalun, totalkg} = data;

    console.log("name:: ", name, typeof(name));

    if(name === undefined || price === undefined || expiry === undefined || totalun === undefined || totalkg === undefined) {
        return {body: "Ops, não foi possível registrar o produto. Por favor, tente mais tarde.", status: 401};
    };

    if(name.length === 0 || price.length === 0 || expiry.length === 0 || totalun.length === 0 || totalkg.length === 0) {
        return {body: "Ops, não foi possível registrar o produto. Por favor, tente mais tarde.", status: 401};
    };

    const created_at = Date.now();
    const updated_at = Date.now();

    const product = {whatsappOwner, name, price, lote, expiry, totalun, totalkg, created_at, updated_at};
    
    try {

       return await Product.find({name, lote}).then(finded => {

            if(finded.length === 0){

                try {
                    Product.create(product);
                    return {body: 'Produto registrado com sucesso!', status: 200};
                    
                } catch(err){
                    return {body: 'Erro', status: 500};
                }

            } else {
                
                Product.findOne({name, lote, price}).then(res => {

                    let sumTotalUn = parseInt(res.totalun) + parseInt(totalun);
                    let sumTotalKg = parseInt(res.totalkg) + parseInt(totalkg);
                    RegisterProduct.updateOne({name, lote, price}, {$set: {totalun: sumTotalUn, updated_at: Date.now()}}).then();
                    RegisterProduct.updateOne({name, lote, price}, {$set: {totalkg: sumTotalKg, updated_at: Date.now()}}).then();

                });
                return {body: 'Produto alterado com sucesso!', status: 200};
                               
            }

        });
    
    } catch(error){

        console.log(error);
        return {body: "Ops, não foi possível registrar o produto. Por favor, tente mais tarde.", status: 500};

    }

}

module.exports = { registerProductHandler };