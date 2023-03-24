const express = require("express");
const routes = express();

const bodyParser = require("body-parser");
routes.use(bodyParser.urlencoded({extended: false}));
routes.use(bodyParser.json());

//Model
const RegisterProduct = require("../../database/models/RegisterProduct");

//authToken
const auth = require("../../middlewares/authJWT");

//GET
routes.get("/product/products", auth, async (req, res) => {
    
    try {

        const data = await RegisterProduct.find();
        res.json(data);

    } catch(error) {

        console.log(error);
        res.json("Erro no servidor. Por favor tente de novo mais tarde").status(500);

    }
});

routes.get("/product/:name", auth, async (req, res) => {

    const name = req.params.name; 

    try {

        const data = await RegisterProduct.find({name});
        res.json(data);

    } catch(error) {

        console.log(error);
        res.json("Erro no servidor. Por favor tente de novo mais tarde").status(200);

    }

});

routes.get("/product/lote/:lote", auth, async (req, res) => {

    const lote = req.params.lote;

    try {

        const data = await RegisterProduct.find({lote});
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

       await RegisterProduct.find({name, lote}).then(finded => {

            if(finded.length === 0){

                RegisterProduct.create(product);
                res.json("Produto registrado com sucesso").status(200);

            } else {

                RegisterProduct.findOne({name, lote}).then(res => {

                    let sumTotalUn = parseInt(res.totalun) + parseInt(totalun);
                    let sumTotalKg = parseInt(res.totalkg) + parseInt(totalkg);
                    RegisterProduct.updateOne({name, lote}, {$set: {totalun: sumTotalUn, updated_at: Date.now()}}).then();
                    RegisterProduct.updateOne({name, lote}, {$set: {totalkg: sumTotalKg, updated_at: Date.now()}}).then();

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