import path from 'path'
import mongoose from 'mongoose'
import express from 'express'
import passport from 'passport'
import session from 'express-session'

import mongoConfig from './config/mongo.js'
import initPassportStrategy from './config/passport.js'

import userRouter from './user/user.route.js'
import indexRouter from './index/index.route.js'

// db

async function connectWithRetry () {
  try {
    await mongoose.connect(mongoConfig.mongodbHost, { useNewUrlParser: true })

    console.log(`MongoDB ${mongoConfig.mongodbHost} Connected`)
  } catch (e) {
    console.error(`Error in MongoDB Connection: ${e}`)
    setTimeout(connectWithRetry, 5000)
  }
}

connectWithRetry()

// app

const app = express()

// view
const srcPath = path.join(path.resolve(), 'src')
app.set('views', srcPath)
app.set('view engine', 'pug')

// common middlewire

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false // don't create session until somethint stored
}))

// passport
initPassportStrategy()
app.use(passport.initialize())
app.use(passport.session())

// router
app.use('/', indexRouter)
app.use('/users', userRouter)

export default app
