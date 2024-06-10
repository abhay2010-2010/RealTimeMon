const mongoose=require('mongoose');

const dbConnect=mongoose.connect("mongodb+srv://aabhhayy2010:rWQnKyU4UHpfM5Y4@cluster0.pxke5af.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Logs");

module.exports={
    dbConnect
}