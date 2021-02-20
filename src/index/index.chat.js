import dayjs from 'dayjs'

const FIRST_MSG = 'first message'
const BROADCASTING = 'broadcasting'
const CHAT_MESSAGE = 'chat message'

const ROBOT = 'robot'

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
    socket.on(FIRST_MSG, (msg) => {
      socket.username = msg.username
      io.emit(BROADCASTING, createMessage(`${socket.username} joined the room`))
    })

    socket.on('disconnect', () => {
      io.emit(BROADCASTING, createMessage(`${socket.username} exists`))
    })

    socket.on(CHAT_MESSAGE, (msg) => {
      io.emit(CHAT_MESSAGE, createMessage(msg, socket.username))
    })
  }
}
