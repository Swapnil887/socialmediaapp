require("dotenv").config()
const mongoose = require("mongoose")

var connection = mongoose.connect(process.env.url)


module.exports = {connection}