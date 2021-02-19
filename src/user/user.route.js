import { Router } from 'express'
import passport from 'passport'
import { ensureLoggedIn } from 'connect-ensure-login'

import User from './user.model.js'

const router = new Router()

// register

router.get('/register', (req, res) => {
  res.render('user/user-register', { title: 'register' })
})

router.post('/register', async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  })

  const count = await User.count({ username: newUser.username }).exec()
  if (count > 0) {
    next(new Error(`User ${newUser.username} exists`))
  } else {
    try {
      await newUser.save()
      res.redirect('login')
    } catch (e) {
      next(e)
    }
  }
})

// login

router.get('/login', (req, res) => {
  res.render('user/user-login', { title: 'Login' })
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.redirect('/')
  })

// logout

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('../')
})

// profile

router.get('/profile', ensureLoggedIn('/users/login'), (req, res) => {
  res.json(req.user)
})

export default router
