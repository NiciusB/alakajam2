const express = require('express')
const app = express()
const server = require('http').createServer(app)

app.disable('x-powered-by')
app.use(express.static('dist'))

const io = require('socket.io')(server)
io.on('connection', function(socket){
  socket.on('chat', function(msg) {
    io.emit('chat', msg)
  })
})


server.listen(process.env.PORT || 3000)
