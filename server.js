var express = require("express");
var path = require("path");
var app = express();

app.use(bodyParser.json());

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var sharesession = require("express-socket.io-session");
var bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost/MultiGame')

var server = app.listen(8000, function(){
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);
io.sockets.on('connect', function(socket) {

});