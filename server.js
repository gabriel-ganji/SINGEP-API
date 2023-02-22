const express = require("express");
const app = express();

//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json({name: "Json"});
});

app.listen(3033, () => {
    console.log("Server running on port 3033.");
});