const express = require('express');
const http = require("http");
const socketio = require("socket.io");
const fs = require("fs");
const cron = require("node-cron");
const { dbConnect } = require('./dbconnect');
const { Logs } = require('./schema');

const app = express();

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ['https://real-time-mon.vercel.app', 'http://localhost:5173'],
    methods: ["GET", "POST"]
  }
});

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