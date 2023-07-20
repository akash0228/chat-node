const express=require('express');
const path=require('path');
const http=require('http');
const socketio=require('socket.io');

const app=express();
const server=http.createServer(app);
const io=socketio(server);
const formatMessage=require('./utils/messages.js');

//set static folder
app.use(express.static(path.join(__dirname,'public')));

const botname='CharCord Bot';

//Run when a client connects
io.on('connection',socket=>{
    socket.on('joinRoom',({username,room})=>{
        //to user or client 
        socket.emit('message',formatMessage(botname,'Welcome to ChatCord!'));

         //Broadcast when user connects   this will emit to everybody except user who is connecting
         socket.broadcast.emit('message',formatMessage(botname,`${username} has joined the room`));
    });

    console.log('new user connected');

    
    //Listen for emit or chatmessage
    socket.on('chatMessage',(message)=>{

        //emitting to everybodt this message
        io.emit('message',formatMessage('USER',message));
    });

    //if every body then io.emit();
    //Runs when client/user disconnects
    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botname,'A user has left the chat'));
    });

})

const PORT=3000 || process.env.PORT;

server.listen(PORT,()=> console.log(`Server running on port ${PORT}`));