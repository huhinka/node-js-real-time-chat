import dayjs from 'dayjs'

const BROADCASTING = 'broadcasting'
const CHAT_MESSAGE = 'chat message'

const ROBOT = 'robot:'

function now () {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

function createMessage (msg, username = ROBOT) {
  return {
    date: now(),
    username: username,
    message: msg
  }
}

export default function onChat (io) {
  return (socket) => {
    io.emit(BROADCASTING, createMessage('joined the room'))

    socket.on('disconnect', () => {
      io.emit(BROADCASTING, createMessage('exists'))
    })

    socket.on(CHAT_MESSAGE, (msg) => {
      io.emit(CHAT_MESSAGE, createMessage(msg.msg, msg.username))
    })
  }
}
