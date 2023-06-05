const {create, Whatsapp, Message, SocketState } = require("venom-bot");

class Sender {

    constructor () {
        this.initialize();
    }

    async sendText(to, body){
        //(11) 959050868 -> wrong format
        // 5511959050868@c.us -> correct way
        
        try{
        
            this.client.sendText(to, body);
        
        } catch (error) {

            console.log(error);
        }
        
    }

    initialize() {

        const qr = (base64Qrimg) => {

        }

        const status = (statusSession) => {

        }

        const start = (client) => {
            this.client = client;
            // this.sendText("to", "body");
        }

        create("ws-sender-dev", qr, status)
            .then((client) => start(client))
            .catch((error) => console.log(error));
    }

}

module.exports = Sender;
