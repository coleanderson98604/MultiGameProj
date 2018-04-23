var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static( __dirname + '/public/dist' ));

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var sharesession = require("express-socket.io-session");

mongoose.connect('mongodb://localhost/MultiGame')

var server = app.listen(8000, function(){
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);
io.sockets.on('connect', function(socket) {
    console.log('new connection made.')
    socket.on('join', function(data){
        //joining, .join specifies a specific room for the user to join
        socket.join(data.room)
        //test info on server side
        console.log(`${data.user} joined the room: ${data.room}`)
        //broadcast to everyone except the person who is joining, .to specifies which room to broadcast too
        socket.broadcast.to(data.room).emit('new user joined', {user: data.user, message:'has joined this room.'});
    });

    socket.on('leave', function(data){


        console.log(`${data.user} left the room: ${data.room}`)
        //broadcast to everyone except the person who is leaving, .to specifies which room to broadcast too
        socket.broadcast.to(data.room).emit('left room', {user: data.user, message:'has left this room.'});
        //leave the room
        socket.leave(data.room)
    });

    //socket for setting the messages from the individual user
    socket.on('message', function(data){
        //sends message to all of the people in that room
        io.in(data.room).emit('new message', {user: data.user, message: data.message});
    })
});