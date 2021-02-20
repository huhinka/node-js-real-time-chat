import { Router } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'

const router = new Router()

router.get('/',
  ensureLoggedIn('/users/login'),
  (req, res) => {
    res.render('index/index', { title: "Let's chat", username: req.user.username })
  })

export default router
