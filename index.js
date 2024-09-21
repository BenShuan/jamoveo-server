const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
var cors = require("cors");

require("dotenv").config();

app.use(cors());

app.use(express.json());


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});



  io.on("connection", (socket) => {

  socket.on('join-room',user=>{
    try {
      socket.emit('send-conferm',`${user.username} has joined the Jamoveo`)
      
      console.log(`${user.username} has joined the session`);
    } catch (error) {
      console.log('first')
    }
  })


  socket.on('admin-start-session',(song)=>{
    console.log('Session starts' )
    io.emit('start-session',song)
  })
  
  socket.on('admin-end-session',()=>{
    console.log('Session ended' )
    io.emit('end-session')
  })

  io.on('disconnect',()=>{
    console.log('A user was disconected')
  })

});



//defined all routes
const userRoute = require("./routes/users");
app.use("/users", userRoute);

const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

const songsRoute = require("./routes/songs");
app.use("/songs", songsRoute);

httpServer.listen(3000);

module.exports = httpServer;
