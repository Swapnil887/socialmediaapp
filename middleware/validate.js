const mongoose = require("mongoose");

const jwt = require("jsonwebtoken")

var validate = (req,res,next)=>{
    var data = req.body;
    var token = req.headers.authorization
    try {
if(token){
        var token_data = jwt.verify(token,"masai");
        if(token_data){
        req.body.userID = token_data.userID
        next()}}
        else{
            res.send("you have to login first")
        }
        
    } catch (error) {
        console.log(error)
     next()   
    }
    
}


module.exports = {validate}


