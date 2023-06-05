const express = require("express");
const routes = express();
const contactUsHandler = require("../../handlers/contactUsHandler");
const Notify = require("../../database/models/Notify");
const Product = require("../../database/models/Product");

routes.get("/notifies/:whatsapp", async (req, res) => {
    
    const whatsapp = req.params.whatsapp;
    
    try {
        
        let result = await Notify.find({whatsappOwner: whatsapp});

        res.json(result).status(200);

    } catch (error){
        console.log(error);
        res.json("Erro").status(500);
    }

});

module.exports = routes;