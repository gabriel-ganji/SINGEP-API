const express = require("express");
const routes = express();

const bodyParser = require("body-parser");
routes.use(bodyParser.urlencoded({extended: false}));
routes.use(bodyParser.json());

//Model
const Product = require("../../database/models/Product");

//authToken
const auth = require("../../middlewares/authJWT");
const AnalyzeDate = require("./analyzeExpiry");

//GET
routes.get("/products/product/:whatsapp", async (req, res) => {

    const whatsapp = req.params.whatsapp;
    
    try {

        const data = await Product.find({"whatsappOwner": whatsapp});
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

routes.get("/product/analyzeDate/whatsappOwner/:whatsapp", (req, res) => {
    const whatsapp = req.params.whatsapp;
    const result = AnalyzeDate(whatsapp); 
    res.json(result);
})

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

//POST
routes.post("/product/register", auth, async (req, res) => {

    const body = req.body;
    const {name, price, lote, expiry, totalun, totalkg} = body;

    const created_at = Date.now();
    const updated_at = Date.now();

    const product = {name, price, lote, expiry, totalun, totalkg, created_at, updated_at};
    
    try {

       await Product.find({name, lote}).then(finded => {

            if(finded.length === 0){

                Product.create(product);
                res.json("Produto registrado com sucesso").status(200);

            } else {

                Product.findOne({name, lote}).then(res => {

                    let sumTotalUn = parseInt(res.totalun) + parseInt(totalun);
                    let sumTotalKg = parseInt(res.totalkg) + parseInt(totalkg);
                    Product.updateOne({name, lote}, {$set: {totalun: sumTotalUn, updated_at: Date.now()}}).then();
                    Product.updateOne({name, lote}, {$set: {totalkg: sumTotalKg, updated_at: Date.now()}}).then();

                });

                res.json("Produto alterado com sucesso").status(200);
                               
            }

        });
    
    } catch(error){

        console.log(error);
        res.send("Ops, não foi possível registrar o produto. Por favor, tente mais tarde.");

    }

});

module.exports = routes;