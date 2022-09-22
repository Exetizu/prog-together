const path =require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,"/../public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
server.listen(80,()=>{
    console.log("Server start on port:80");
})
var codesave = ""
io.on('connection',(socket)=>{
    socket.on('new-client-append',(code)=>{
        console.log("a")
        socket.emit('new-client-append', {code: codesave});
    })
    
    console.log("User connected");
    socket.on('codeSend',(code)=>{
        codesave = code.code
        console.log(code);
        socket.broadcast.emit('codeReceive',{
            code: code.code
        });
    });
    socket.on('disconnect',(socket)=>{
        console.log("User disconnected");
    });
});