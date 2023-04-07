const ContactUs = require("../database/models/contactUs");

async function contactUsHandler(data) {
    
    const {whatsappOwner, subject, message} = data;
    
    try{
        ContactUs.create({whatsappOwner, subject, message}).then(res => console.log(res));
    } catch(error) {
        console.log(error);
    }
    
}

module.exports = contactUsHandler;