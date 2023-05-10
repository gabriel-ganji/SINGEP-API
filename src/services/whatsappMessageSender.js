const {create, Whatsapp, Message, SocketState } = require("venom-bot");

class Sender {

    constructor () {
        this.initialize();
    }

    sendText(to, body){
        //(11) 959050868 -> wrong format
        // 5511959050868@c.us -> correct way
        this.client.sendText(to, body);
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
