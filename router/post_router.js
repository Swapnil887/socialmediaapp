const express = require("express")
const { model } = require("mongoose")
const {Postmodel} = require("../models/post_model")
const postroute = express.Router()
const jwt = require("jsonwebtoken")


postroute.post("/new",async (req,res)=>{
   var data = req.body;
   var token = req.headers.authorization;
   try {
    var token_data = jwt.verify(token,"masai")
    var new_Id = token_data.userID
    data.userID = new_Id;
    var x = await Postmodel.insertMany(data)
    res.send(x)
   } catch (error) {
    console.log(error)
    res.send("something went wrong while posting")
   }
})

postroute.patch("/update/:id",async (req,res)=>{
    var token = req.headers.authorization;
    var parid = req.params.id;
    var body = req.body;
    try{
        var resolve_token = jwt.verify(token,"masai")
        var token_id = resolve_token.userID;
        var data = await Postmodel.findById({_id:parid},body)
        console.log(data)
        var data_id = data.userID;
    
        if(data_id===token_id)
        {
            var x = await Postmodel.updateMany({_id:parid},body)
            res.send("update done")
        }
        else{
            res.send("you are not authorized")
        }

    }
    catch(error)
    {console.log(error)
        res.send("something went wrond while updating")
    }
})


postroute.delete("/delete/:id",async (req,res)=>{
        var token = req.headers.authorization;
    var parid = req.params.id;
    var body = req.body;
    try{
        var resolve_token = jwt.verify(token,"masai")
        var token_id = resolve_token.userID;
        var data = await Postmodel.findById({_id:parid},body)
        var data_id = data.userID;
        if(data_id===token_id)
        {
            var x = await Postmodel.deleteMany({_id:parid})
            res.send("delete done")
        }
        else{
            res.send("you are not authorized")
        }

    }
    catch(error)
    {
        res.send("something went wrond while updating")
    }
})


module.exports = {postroute}