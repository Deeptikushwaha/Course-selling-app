//const { User } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../config");
function userMiddleware(req, res, next) {
    
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET_KEY);

    if (decodedValue.username) {    
        req.username = decodedValue.username;
        req.randomData = "Adsadsadsadssd";
        next();
    } else {
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
    // const username = req.headers.username; 
    // const password = req.headers.password; 

    // User.findOne({
    //     username: username,
    //     password: password
    // })
    // .then(function(value) {
    //     if (value) {
    //         next();
    //     } else {
    //         res.status(403).json({
    //             msg: "User doesnt exist"
    //         })
    //     }
    // })
}

module.exports = userMiddleware;