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
    },
    password: {
        type: String,
        required: [true, "You must enter a password."],
        minlength: [8, "Password must be at least 8 characters."],
    }
});

UserSchema.pre('save', function(next){
    console.log("Pre reached.")
    let that = this;
    bcrypt.hash(this.password,10,function(err,hash){
        if(err){
            console.log("Error generating hash.");
            next();
        } else {
            that.password = hash;
            next();
        }
    });
});

var User = mongoose.model('User', UserSchema);

var sharesession = require("express-socket.io-session");

//Get Users
app.get('/users', function(req,res){
    User.find({},function(err,user){
        if(err){
            res.json({succeeded: false, status: err});
        }
        else {
            res.json({data: user});
        }
    })
})

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
                res.json({succeeded:false,status:"Invalid user data."});
            } else {
                bcrypt.compare(req.body.password,user.password,function(err,same){
                    if(err){
                        res.json({succeeded:false,status:"Server error."});
                    } else {
                        if(!same){
                            res.json({succeeded:false,status:"Invalid user data."});
                        } else {
                            res.json({succeeded:true,status:"All clear."});
                        }
                    }
                });
                // if (!bcrypt.compare(req.body)) {
                //     res.json({succeeded:false,status:"Invalid user data."})
                // } else {
                //     res.json({succeeded:true,status:user});
                // }
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
    console.log('new connection made.')

    socket.on('roomCheck', function(){
        socket.emit('rooms', io.sockets.adapter.rooms);
    })

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