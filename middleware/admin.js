// Middleware for handling auth

//const { Admin } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../config");

function adminMiddleware(req, res, next) {

    const token = req.headers.authorization;
    const words = token.split(" "); // ["Bearer", "token"]
    const jwtToken = words[1]; // token

    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET_KEY);
        if (decodedValue.username) {
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch(e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }
    
    // const username = req.headers.username;
    // const password = req.headers.password;
    // Admin.findOne({
    //     username: username,
    //     password: password
    // })
    // .then(function(value){
    //     if(value){
    //         next();
    //     } else{
    //         res.status(403).json({
    //             msg : "admin doesn't exist"
    //         })
    //     }
    // })
}

module.exports = adminMiddleware;