const path=require('path')
const express=require('express')
const http=require('http')
const socketio=require('socket.io')
const app=express()
const filter=require('bad-words')
const {generatemsg,genlocmsg}=require('./utilities/msg.js')
const {adduser,remuser,getuser,userinroom}=require('./utilities/user.js')
const server=http.createServer(app)
const io=socketio(server)
const port=process.env.PORT||5000
const pubdir=path.join(__dirname,'../public')
app.use(express.static(pubdir))
let count=0
io.on('connection',(socket)=>
 {
    console.log('new client arrived')
socket.on('join',({username,room},callback)=>{
   const {error,user}= adduser({id:socket.id,username,room})

    if(error){
      return callback(error)
    }


    socket.join(user.room)
socket.emit('message',generatemsg('Admin Nibba','Welcome '))
socket.broadcast.to(user.room).emit('message',generatemsg(user.username+' Nibba joined!!!'))
io.to(user.room).emit('roomdata',{
    room:user.room,
    users:userinroom(user.room)
})
callback()
})

socket.on('send',(message,callback)=>{
    const user=getuser(socket.id)
    const fltr=new filter()
    if(fltr.isProfane(message))
    {
        return callback('profanity not allowed')
    }
    io.to(user.room).emit('message',generatemsg(user.username,message))
    callback()
    
})
socket.on('send-ADDHA',(coords,callback)=>{
    const user=getuser(socket.id)
    io.to(user.room).emit('ADDHA',genlocmsg(user.username,'http://google.com/maps?q='+coords.latitude+","+coords.longitude))
    callback()
})
socket.on('disconnect',()=>{
    const user=remuser(socket.id)
    if(user){
io.to(user.room).emit(generatemsg('Admin','Nibba has left..!!'))
io.to(user.room).emit('roomdata',{
    room:user.room,
    users:userinroom(user.room)
})
    }
})
 })
server.listen(port,()=>
console.log('serve is started on port '+port))
