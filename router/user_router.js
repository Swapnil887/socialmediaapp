const express = require("express")
const { model } = require("mongoose")
const {Usermodel} = require("../models/user_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userroute = express.Router()







userroute.post("/register",(req,res)=>{
    const {email,password,name,gender} = req.body;
    try {
        bcrypt.hash(password,5,async(error,hash)=>{
            if(error)
            {
                console.log(error)
                res.send("something went wrong while encrypting password")
            }
            else{
                const user = {email,password:hash,gender,name}
                var data =new Usermodel(user)
                await data.save()
                console.log(data)
                res.send(data)
            }
        })
       
    } catch (error) {
        console.log(error)
        res.send("something went wrong while register")
    }
})

userroute.post("/login",async(req,res)=>{
    var {email,password}=req.body;
    console.log(email)
    var final_data = await Usermodel.find({email})
    var hashed_password = final_data[0].password;
  try{
    if(final_data.length>0)
    {
        bcrypt.compare(password,hashed_password,(err,result)=>{
            if(result)
            {
                var token = jwt.sign({userID:final_data[0]._id},"masai")
                console.log(token)
                res.json(token)
            }
            else{
                res.json("wrong cregential")
            }
        })
        
    }
    else{
        res.json("wrong credential")
    }
    
}

    catch(err)
    {console.log(err)
        res.send("something went wrong while login")
    }
})

module.exports = {userroute}