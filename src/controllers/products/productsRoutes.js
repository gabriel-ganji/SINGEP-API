const express = require("express");
const routes = express();

const Product = require("../../database/models/Product");

const bodyParser = require("body-parser");
routes.use(bodyParser.urlencoded({extended: false}));
routes.use(bodyParser.json());

//authToken
const auth = require("../../middlewares/authJWT");

//handlers
const { registerProductHandler } = require("../../handlers/registerProductHandler");
const updateProductHandler = require("../../handlers/updateProductHandler");
const deleteProductHandler = require("../../handlers/deleteProductHandler");

//GET
//Criate a new product
routes.get("/product/products/:whatsapp", async (req, res) => {

    const whatsapp = req.params.whatsapp;
    
    try {

        const data = await Product.find({whatsappOwner: whatsapp});
        res.json(data);

    } catch(error) {

        console.log(error);
        res.json("Erro no servidor. Por favor tente de novo mais tarde").status(500);

    }
});

//Pega um produto pelo nome
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

//pega um producto pelo lote
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
//registra um produto
routes.post("/product/register", async (req, res) => {
    
    const data = req.body;
    const result = await registerProductHandler(data);
    res.json(result.body).status(result.status);

});

//atualiza um produto
routes.post("/product/update", async (req, res) => {
    
    const data = req.body;
    const result = await updateProductHandler(data);
    res.json(result.body).status(result.status);

});

//deleta um produto
routes.delete("/product/delete", async(req, res) => {
    const data = req.body;
    const result = await deleteProductHandler(data);
    res.json(result.body).status(result.status);
})

module.exports = routes;