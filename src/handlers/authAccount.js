const User = require("../database/models/User");

function authAccount(data){
    let user = data.user;
    User.find(user).then(res => console.log(res));
}

module.exports = {
    authAccount
}