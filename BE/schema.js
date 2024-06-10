const mongoose=require("mongoose");

const schema=mongoose.Schema({
    message:String,
    type:String,
    timestamp:{type:Date, default:Date.now()}
});

const Logs=mongoose.model("Log",schema);

module.exports={
    Logs
}