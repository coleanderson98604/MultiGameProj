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

});