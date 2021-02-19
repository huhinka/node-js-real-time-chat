import { Router } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'

const router = new Router()

router.get('/',
  ensureLoggedIn('/users/login'),
  (req, res) => {
    // TODO real time chat page
    res.render('index/index', { title: 'Hey', message: `Hello ${req.user.username}!` })
  })

export default router
