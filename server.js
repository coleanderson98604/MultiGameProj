var express = require("express");
var path = require("path");
var session = require("express-session");
var bcrypt = require('bcryptjs');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema
app.use(session({secret: "ChoiBois", resave: false, saveUninitialized: true}));
var sharesession = require("express-socket.io-session");
var bodyParser = require("body-parser");
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/;
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/MultiGame')


var server = app.listen(8000, function(){
    console.log("listening on port 8000");
})

var users = [];
var io = require('socket.io').listen(server);
io.sockets.on('connect', function(socket){

})