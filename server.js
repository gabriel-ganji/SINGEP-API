const express = require("express");
const app = express();

//product routes
const productRoutes = require("./src/controllers/products/routes");

app.use("/singep/product", productRoutes);

//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
const JwtUser = require("./src/database/jwtUser");

//handles
const signinHandler = require("./src/handlers/signinHandler");
const signupHandler = require("./src/handlers/signupHandler");

app.get("/", (req, res) => {
    res.status(200).json({name: "Json"});
});

app.post("/signin", async (req, res) => {

    const {user, password} = req.body;
    const resp = await signinHandler(user, password);
    const message = resp.message;
    let token = resp.token;
    
    try {
        await JwtUser.create({token});
        res.status(resp.status).json({message, token});
    } catch(error) {
        console.log(error);

    }

});

app.post("/signup", async (req, res) => {

    const {name, email, whatsapp, ownerof, password, confirmPassword} = req.body;
    
        const data = {name, email, whatsapp, ownerof, password, confirmPassword};
        let resp = await signupHandler(data);
        res.json(resp.body).status(resp.status);
    
});

app.listen(3033, () => {
    console.log("Server running on port 3033.");
});
