const express = require("express");
const app = express();

//cors
var cors = require('cors');
app.use(cors());

//product routes
const productRoutes = require("./src/controllers/products/routes");

app.use("/singep", productRoutes);

//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//handles
const signinHandler = require("./src/handlers/signinHandler");
const signupHandler = require("./src/handlers/signupHandler");
const authAccount = require("./src/handlers/authAccount");


//whatsapp message sender
const whatsappSender = require("./src/controllers/whatsapp/sendMessage");
app.use("/", whatsappSender);


app.get("/", (req, res) => {
    res.status(200).json({name: "Json"});
});

app.post("/signin", async (req, res) => {

    const {user, password} = req.body;
    const resp = await signinHandler(user, password);
    const body = resp.body;
    let token = resp.token;
    
    res.status(resp.status).json({body, token});
    

});

app.post("/authUserAccount", async(req, res) => {
    
    const {user, code} = req.body;
    const data = {user, code};

    let resp = await authAccount(data);
    console.log(resp);
    res.json(resp.body).status(resp.status);

});

app.post("/signup", async (req, res) => { 

    console.log(req);

    const {name, email, whatsapp, ownerof, password, confirmPassword} = req.body;
    
        const data = {name, email, whatsapp, ownerof, password, confirmPassword};
        console.log(data);
        let resp = await signupHandler(data);
        console.log(resp.status);
        res.json(resp.body, resp.status)
    
});

app.listen(3033, () => {
    console.log("Server running on port 3033.");
});
