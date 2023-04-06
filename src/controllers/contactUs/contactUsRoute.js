const express = require("express");
const routes = express();
const contactUsHandler = require("../../handlers/contactUsHandler");

routes.post("/contactUs/message", async (req, res) => {
    
    const data = req.body;
    //let resp = await contactUsHandler(data);
    res.json("Menssagem enviada com sucesso. Entraremos em contato o mais breve possível.").status(200);


});