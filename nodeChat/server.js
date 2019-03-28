const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3022;


function getCurrentDate(){
    return new Date().toLocaleDateString();
}

function getCurrentTime(){
    return  new Date().toLocaleTimeString();
}

function randomNumberGenerator(){
  return Math.floor(Math.random() * 100000000);
}


app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {

  var addr = socket.handshake.address.split(':')[3];
  var uname = randomNumberGenerator();
  console.log( addr + ' connected as ' + uname + ' at ' + getCurrentTime() );


  socket.on('chat message', (msg) => {

    console.log( uname + ' >> ' + msg);  

    new_message = "<div> <a href=# style='color:red; font-size: 100%'> "+ uname + " >> </a> <br> <p style='font-size: 80%'> "+ msg +"</p> <div>"
    io.emit('chat message', (new_message)); 
    //io.emit('chat message', (socket.uname, msg));
  });
  

  socket.on('disconnect', () => {
    console.log(uname + ' disconnected at ' + getCurrentTime());
  });
  

});



http.listen(PORT, () => {
  console.log(getCurrentDate() + ' :: ' + getCurrentTime());  
  console.log(`listening on *:${PORT}`);
});
