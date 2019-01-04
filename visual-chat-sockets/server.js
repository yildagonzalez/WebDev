var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var moment = require('moment')

////////////////////////////////////////////////////////
// static file routes

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

app.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/style.css')
})

app.get('/bchat.js', function(req, res){
  res.sendFile(__dirname + '/bchat.js')
})

app.get('/brak.png', function(req, res){
  res.sendFile(__dirname + '/brak.png')
})

////////////////////////////////////////////////////////
// server-sent events (simple heartbeat)

app.get('/events', function(request, response) {
  response.status(200).set({
    "connection": "keep-alive",
    "cache-control": "no-cache",
    "Content-Type": "text/event-stream",
    "Access-Control-Allow-Origin": "http://localhost",
    "Access-Control-Expose-Headers": "*"
  })

  setInterval(function() {
    response.write(`data: Server say, ` + moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + `!\n\n`)
  }, 5000)
})

////////////////////////////////////////////////////////
// websocket connection

var users = []

io.on('connection', function(socket){

  // LOGIN message, expects JSON "name" in data
  socket.on('LOGIN', function(data) {
      // send current user list to new client only
      socket.emit('LOGIN_RESPONSE', users)

      // send login to everyone, including new client
      io.emit('LOGIN', data)

      // add new client to users
      users.push(data['name'])
      console.log("data on server: " + data['name'])
      console.log("users: " + users)

  })

  // POST chat message, expects JSON "name" and "msg" in data
  socket.on('POST', function(data){
      // broadcast chat message to all clients
      io.emit('POST', data)
  })

  // MOVE message, expects JSON "name", "left" and "top" in data
  socket.on('MOVE', function(data){
      // broadcast move message to all clients
      io.emit('MOVE', data)
  })

  console.log('a user connected')
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })

})

////////////////////////////////////////////////////////
// listen for client connections

http.listen(8888, function(){
  console.log('listening on *:8888')
})