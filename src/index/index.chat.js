export default function onChat (io) {
  return (socket) => {
    console.log('a user connected')
    socket.broadcast.emit('hi')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
      console.log(`message: ${msg}`)
      io.emit('chat message', msg)
    })
  }
}
