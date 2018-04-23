var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static( __dirname + '/public/dist' ));

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MultiGame')

//Basic user schema -- right now includes only username -- required, must be at least 4 characters.
var UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "You must enter a username."],
        minlength: [4, "Username must be at least 4 characters."],
        unique: true
    }
});

var User = mongoose.model('User', UserSchema);

var sharesession = require("express-socket.io-session");

//Basic registration route.
app.post('/register', function(req,res){
    User.create(req.body, function(err,user){
        if(err){
            res.json({succeeded:false,status:err});
        } else {
            res.json({succeeded:true,status:user});
        }
    });
});

//Basic login route.
app.post('/login', function(req,res){
    console.log(req.body.username);
    User.findOne({username:req.body.username},function(err,user){
        if(err){
            res.json({succeeded:false,status:err});
        } else {
            if (!user) {
                res.json({succeeded:false,status:"User not found."});
            } else {
                res.json({succeeded:true,status:user});
            }
        }
    });
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

var server = app.listen(8000, function(){
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);
io.sockets.on('connect', function(socket) {

});