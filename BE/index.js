const express = require('express');
const http = require("http");
const socketio = require("socket.io");
const fs = require("fs");
const cors = require("cors");
const cron = require("node-cron");
const { dbConnect } = require('./dbconnect');
const { Logs } = require('./schema');


const app = express();
const corsOptions = {
    origin: 'https://real-time-mon.vercel.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
  app.use(cors(corsOptions));



const server = http.createServer(app);
const io = socketio(server);


function readFileChunks(filePath) {
    const readStream = fs.createReadStream(filePath);
    let data = "";
    readStream.on("data", (chunk) => {
        data += chunk;
    });
    readStream.on("end", () => {
        console.log(data);
    });
    readStream.on("error", (err) => {
        console.log(err);
    });
}

io.on("connection", (socket) => {
    console.log("a user connected");
    Logs.find({}, (err, logs) => {
        if (err) {
            console.log(err);
        } else {
            socket.emit("logs", logs);
        }
    });
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

cron.schedule('0 0 12 * *', () => {
    console.log('running a task every 12 hours');
   readFileChunks();
});


server.listen(3000, async() => {
    try {
        dbConnect;
        console.log('server running at http://localhost:3000');
    } catch (error) {
        console.log(error);
    }
    
});