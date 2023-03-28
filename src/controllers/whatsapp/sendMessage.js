const express = require("express");
const router = express.Router();
const Sender = require("../../services/whatsappMessageSender");

const sender = new Sender();

router.post("/sendWhatsappMessage", (req, res) => {
    
    const {number, message} = req.body;

    try {

        sender.sendText(number, message);
        res.status(200).json({message: "Mensagem enviada com sucesso!"});

    }catch(error) {

        console.log(error);
        res.status(500).json({message: error});

    }

});

module.exports = router;