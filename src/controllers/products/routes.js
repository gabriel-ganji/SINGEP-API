const express = require("express");
const routes = express();

const bodyParser = require("body-parser");
routes.use(bodyParser.urlencoded({extended: true}));
routes.use(bodyParser.json());

//Model
const Product = require("../../database/models/Product");

//authToken
const auth = require("../../middlewares/authJWT");
const { AnalyzeDate } = require("./analyzeExpiry");
const { registerProductHandler } = require("../../handlers/registerProductHandler");
const { updateProductHandler } = require("../../handlers/updateProductHandler");
const { deleteProductHandler } = require("../../handlers/deleteProductHandler");

/////   GET   /////
routes.get("/products/product/:whatsapp", async (req, res) => {

    const whatsapp = req.params.whatsapp;
    
    try {

        const data = await Product.find({"whatsappOwner": whatsapp}).sort({name: 1});
        res.json(data);

    } catch(error) {

        console.log(error);
        res.json("Erro no servidor. Por favor tente de novo mais tarde").status(500);

    }
});

routes.get("/product/:name", auth, async (req, res) => {

    const name = req.params.name; 

    try {

        const data = await Product.find({name});
        res.json(data);

    } catch(error) {

        console.log(error);
        res.json("Erro no servidor. Por favor tente de novo mais tarde").status(200);

    }

});

routes.get("/product/:name/:lote", async (req, res) => {

    const {name, lote} = req.params; 

    try {

        const data = await Product.find({name, lote});
        res.json(data);

    } catch(error) {

        console.log(error);
        res.json("Erro no servidor. Por favor tente de novo mais tarde").status(200);

    }

});

routes.get("/product/analyzeDate/whatsappOwner/:whatsapp", async (req, res) => {
    const whatsapp = req.params.whatsapp;
    const result = await AnalyzeDate(whatsapp);
    console.log("Result: ", result);
    res.json(result);
});

routes.get("/product/lote/:lote", auth, async (req, res) => {

    const lote = req.params.lote;

    try {

        const data = await Product.find({lote});
        res.json(data);

    } catch(error) {

        console.log(error);
        res.json("Erro no servidor. Por favor tente de novo mais tarde").status(200);

    }

});

/////     POST     /////
//Register
routes.post("/product/register", async (req, res) => {

    const body = req.body;
    const result = await registerProductHandler(body);

    res.json(result);

});

//Update
routes.post("/product/update", async(req, res) => {

    const data = req.body;
    console.log(data);
    const result = await updateProductHandler(data);
    res.status(result.status);
    res.json(result.body);

});

routes.post("/product/delete", async(req, res) => {

    const data = req.body;
    const result = await deleteProductHandler(data);
    res.status(result.status);
    res.json(result.body);

});

module.exports = routes;