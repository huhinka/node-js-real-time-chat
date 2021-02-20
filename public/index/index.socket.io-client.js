window.onload = () => {
  const FIRST_MSG = 'first message'
  const CHAT_MESSAGE = 'chat message'
  const BROADCASTING = 'broadcasting'

  const socket = io()

  const username = document.getElementById('username')
  const messages = document.getElementById('messages')
  const form = document.getElementById('form')
  const input = document.getElementById('input')

  socket.emit(FIRST_MSG, { username: username.textContent })

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (input.value) {
      socket.emit('chat message', input.value)
      input.value = ''
    }
  })

  function addMessage (msg) {
    const item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
  }

  socket.on(CHAT_MESSAGE, (msg) => {
    addMessage(`[${msg.date}] ${msg.username}: ${msg.message}`)
  })

  socket.on(BROADCASTING, (msg) => {
    addMessage(`[${msg.date}] ${msg.username}: ${msg.message}`)
  })

  // disconnect
  function now () {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  socket.on('disconnect', () => {
    addMessage(`[${now()}] robot: lost connection...`)
  })
}
