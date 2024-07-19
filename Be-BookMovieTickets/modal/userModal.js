const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;// objectId là đại diện cho nó là id 
//Schema đại diện cho cấu trúc dữ liệu    định nghĩa các trường, kiểu dữ liệu

const  userSchema =  new Schema({
    id:{type:ObjectId},
    useremail:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:50,
        default:'No email'
    },
    password:{
        type:String,
        required: true,
        trim: true
    }
})
module.exports = mongoose.models.user || mongoose.model("user",userSchema)
