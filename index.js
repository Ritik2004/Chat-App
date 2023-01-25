//this is a node server which will handle socket io connections

//this server listen to incoming event

const io = require('socket.io')(3000 ,{
    cors: {
        origin: "*"
    }
});
const users = {}; 
//socket is a particular connection

//io.on is a socket instance and listen to a lot of connection

io.on('connection', socket =>{
//socket.on handle particluar connection ie if there is
//request from a individual person to connect  

//socket.on is sending new-user-joined event
    socket.on('new-user-joined', name=>{
        console.log("new user", name);
          users[socket.id]=name;
 //this will broadcast the msg to other that a new 
 //person has joined         
          socket.broadcast.emit('user-joined', name);
    });

    //if socket recieve a event send which is trigger when someone send
    //a message
    socket.on('send', message=>{
     //the message will be broadcasted to all   
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });
//if someone leaves a chat other will know
    socket.on('disconnect', message=>{
        //the message will be broadcasted to all   
           socket.broadcast.emit('left', users[socket.id]);
           delete users[socket.id]
       });
})