const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const  category = new Schema({
    id:{type:ObjectId},
    name:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:50,
        default:'No name'
    }
})
module.exports = mongoose.models.category || mongoose.model("category",category)