const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const workerSchema=new mongoose.Schema(
    {
        username: {
            type: String,
        },
        name:{
            type:String
        },
        password: {
            type: String,
            minlength: [8, "Password must contain minimum 8 characters"],
        },
        mobile: {
            type: Number,
            unique: [true, "mobile no. exists"],
            length: [10, "Mobile Number must be 10 digits "],
        },
        otp: {
            type: Number,
            index: true,
        },
        city:{
            type:String
        },
        role:{
            type:String,
            enum:['worker']
        },
        field:{
            type:String
        },
        rating:{type:Number},
        verified:{type:Number,default:0,enum:[0,1]},
        idProof:{type:String},
        profilePic:{type:String}
    },{timestamps:true}
)
workerSchema.post("save", function (doc, next) {
    console.log("new User created", doc);
    next();
});

workerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 9);
    }
    next()
})

const Worker=mongoose.model('Worker',workerSchema)
module.exports=Worker