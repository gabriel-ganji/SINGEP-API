const express = require("express");
const app = express();

//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//handles
const signinHandler = require("./src/handlers/signinHandler");
const signupHandler = require("./src/handlers/signupHandler");

app.get("/", (req, res) => {
    res.status(200).json({name: "Json"});
});

app.post("/signin", async (req, res) => {

    const {user, password} = req.body;
    const resp = await signinHandler(user, password);
    res.status(resp.status).json(resp.body);

});

app.post("/signup", async (req, res) => {

    const {name, email, whatsapp, ownerof, password, confirmPassword} = req.body;
    
        const data = {name, email, whatsapp, ownerof, password, confirmPassword};
        let resp = await signupHandler(data);
        res.status(resp.status).json(resp.body);
    
});

app.listen(3033, () => {
    console.log("Server running on port 3033.");
});