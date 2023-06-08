const { default: axios } = require("axios");
const Product = require("../../database/models/Product");
const Notify = require("../../database/models/Notify");

const sendMessage = async (i) => {

    console.log("sendMessage");

    const message = `Olá. O produto *${i.name}* do lote *${i.lote}* venceu! Você tem *${i.totalun}* unidades vencidas deste produto, certifique-se de tirá-los de circulação.`;
    const number = `55${i.whatsappOwner}@c.us`;

    await axios.post("http://localhost:5454/send", {number: number, message: message});
    return;

}

const AnalyzeDate = async (whatsapp) => {

    try {

       return await Product.find({"whatsappOwner": whatsapp}).then(async (products) => {

            let yourDate = new Date();
            const dateNow = yourDate.toISOString().split('T')[0];

            // const resultNotify = await Notify.find({"whatsappOwner": whatsapp});
            
            await Notify.deleteMany({whatsappOwner: whatsapp});

            for (let product of products) {
                
                if (String(product.expiry) < dateNow) {

                    await sendMessage(product);
                    
                    let oldObjt = {whatsappOwner: whatsapp, prodName: product.name, prodLote: product.lote};
                    let prodName = product.name;
                    let prodLote = product.lote;
                    let expiry = product.expiry;
                    let total = product.totalun;

                    let obj = {whatsappOwner: whatsapp, prodName, prodLote, expiry, total, latestSubmission: dateNow, created_at: new Date(), updated_at: new Date()};
                    
                    Notify.findOne(oldObjt).then((res) => {
                        
                        if(res){
                            Notify.updateOne(oldObjt, {$set: {obj}});
                        } else {
                            Notify.create(obj);
                        }
                        
                    })

                }

            }

            return {body: "not null", status: 200};

        });
        
    } catch(error) {
        console.log(error);
        return {body: "", status: 500}
    }
}

module.exports = {AnalyzeDate};
