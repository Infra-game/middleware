const { query } = require('express');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mysql = require ("mysql");



app.get('/', (req, res) => {
  res.sendFile(__dirname + '\index.html');
});

app.get('/users', (req, res) => {
  
  res.send('\index.html');
})

function logger(r)

server.listen(3000, () => {
  console.log('listening on localhost:3000');
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

