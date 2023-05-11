const { default: axios } = require("axios");
const Product = require("../../database/models/Product");
const Notify = require("../../database/models/Notify");

const sendMessage = async (i) => {

    console.log("sendMessage");

    const message = `Olá. O produto *${i.name}* do lote *${i.lote}* venceu! Você tem *${i.totalun}* unidades vencidas deste produto, certifique-se de tirá-los de circulação.`;
    const number = `55${i.whatsappOwner}@c.us`;

    await axios.post("http://localhost:3033/send", {number: number, message: message});

}

const AnalyzeDate = async (whatsapp) => {

    try {

       return await Product.find({"whatsappOwner": whatsapp}).then(async (products) => {

            let yourDate = new Date();
            const dateNow = yourDate.toISOString().split('T')[0];
            let account = 0;

            const resultNotify = await Notify.find({"whatsappOwner": whatsapp});
            
            for (let product of products) {
                
                if (String(product.expiry) < dateNow) {
                    console.log(product);

                    if (resultNotify[0] == null) {
                        console.log(resultNotify[account]);
                        sendMessage(product);
                        try {

                            let prodName = product.name;
                            let prodLote = product.lote;
                            let expiry = product.expiry;
                            let total = product.totalun;
                            let obj = {whatsappOwner: whatsapp, prodName, prodLote, expiry, total, latestSubmission: dateNow, created_at: new Date(), updated_at: new Date()};
                            Notify.create(obj);
                    
                        } catch (error) {
                    
                            console.log(error);
                    
                        }

                    } else {
                        
                        let notifyLatestSubmission = resultNotify[0].latestSubmission.toISOString().split('T')[0];
                        console.log("else abaixo de let notify...");
                        console.log(notifyLatestSubmission, dateNow);

                        if(notifyLatestSubmission < dateNow){

                            sendMessage(product);
                            
                            try {

                                let prodName = product.name;
                                let prodLote = product.lote;
                                let obj = {whatsappOwner: whatsapp, prodName, prodLote};
                                await Notify.updateOne(obj, {$set: {latestSubmission: dateNow}});
                        
                            } catch(error) {
                        
                                console.log(error);
                        
                            }

                        }

                    }
                    
                }
                account++;
            }

            return {body: "not null", status: 200};

        });
        
    } catch(error) {
        console.log(error);
        return {body: "", status: 500}
    }
}

module.exports = {AnalyzeDate};
