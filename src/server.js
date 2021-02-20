import http from 'http'
import * as io from 'socket.io'

import app from './app.js'
import onChat from './index/index.chat.js'

const server = http.createServer(app)

const socketIO = new io.Server(server)
socketIO.on('connection', onChat(socketIO))

const port = 3000
server.listen(port, () => {
  console.log(`Node JS Real Time Chat App listening at http://localhost:${port}`)
})
