const mongoose = require("mongoose");

const databaseConnection = async () => {

    try {

        mongoose.connect("mongodb+srv://Ganji:Ganji01011010.@gevape.h5jorsg.mongodb.net/?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

    } catch(error) {

        console.log(error);

    }
};

module.exports = databaseConnection;