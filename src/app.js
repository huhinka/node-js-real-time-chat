import path from 'path'
import mongoose from 'mongoose'
import express from 'express'
import passport from 'passport'
import session from 'express-session'

import mongoConfig from './config/mongo.js'
import initPassportStrategy from './config/passport.js'

import userRouter from './user/user.route.js'
import indexRouter from './index/index.route.js'
import morgan from 'morgan'

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
app.use(morgan('combined'))

// view
const srcPath = path.join(path.resolve(), 'src')
app.set('views', srcPath)
app.set('view engine', 'pug')

// common middleware

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false // don't create session until something stored
}))

// passport
initPassportStrategy()
app.use(passport.initialize())
app.use(passport.session())

// router
app.use('/', indexRouter)
app.use('/users', userRouter)

export default app
