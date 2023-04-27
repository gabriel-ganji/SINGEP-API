const { default: axios } = require("axios");
const Product = require("../../database/models/Product");
const Sender = require("../../services/whatsappMessageSender");

const sender = new Sender();

const AnalyzeDate = (whatsapp) => {
    
    let yourDate = new Date();
    const dateNow = yourDate.toISOString().split('T')[0];

    try {
        Product.find({"whatsappOwner": whatsapp}).then(async (data) => {
            
            for(i of data){
                console.log(i.expiry, dateNow);
                if(String(i.expiry) < dateNow){
                    // console.log("PASSOU DA DATA DE VALIDADE!");
                    const message = `Olá. O produto *${i.name}* do lote *${i.lote}* venceu! Você tem ${i.totalun} unidades vecidas deste produto, certifique-se de tirá-los de circulação.`;
                    const number = `55${i.whatsappOwner}@c.us`;

                    await axios.post("http://localhost:3033/sendWhatsappMessage", {number, message});
                    
                }
            }
        });

        return {body: "", status: 200}
        
    } catch(err) {
        console.log(err);
        return {body: "", status: 500}
    }
}

module.exports = AnalyzeDate;
