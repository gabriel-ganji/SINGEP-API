const { default: axios } = require("axios");
const Product = require("../../database/models/Product");
const Notify = require("../../database/models/Notify");

const AnalyzeDate = async (whatsapp) => {

    try {

       return await Product.find({"whatsappOwner": whatsapp}).then(async (data) => {

            let yourDate = new Date();
            const dateNow = yourDate.toISOString().split('T')[0];
            
            for(i of data){
                
                if(String(i.expiry) < dateNow){
                    
                    const message = `Olá. O produto *${i.name}* do lote *${i.lote}* venceu! Você tem *${i.totalun}* unidades vencidas deste produto, certifique-se de tirá-los de circulação.`;
                    const number = `55${i.whatsappOwner}@c.us`;

                    await axios.post("http://localhost:3033/send", {number: number, message: message});
                    
                    try {

                        let prodName = i.name;
                        let prodLote = i.lote;
                        let obj = {whatsappOwner: whatsapp, prodName, prodLote, latestSubmission: dateNow, created_at: new Date(), updated_at: new Date()};
                        Notify.create(obj);

                    } catch(error) {

                        console.log(error);

                    }
                    
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
