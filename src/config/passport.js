import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../user/user.model.js'

export default function initPassportStrategy () {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username }).exec()

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      } else if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' })
      } else {
        return done(null, user)
      }
    } catch (e) {
      return done(e)
    }
  }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec()
      done(null, user)
    } catch (e) {
      done(e)
    }
  })
}
