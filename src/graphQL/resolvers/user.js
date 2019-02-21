import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default {
  Query: {
    currentUser: (root, args, { user }) => user,
  },
  Mutation: {
    login: async (root, { input }, { JWT_SECRETE, models: { User } }) => {
      const { username, password } = input
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error("User with such username doesn't exists")
      }
      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        throw new Error('Password is invalid')
      }

      user.jwt = jwt.sign({ _id: user._id }, JWT_SECRETE)

      return user
    },
    signup: async (root, { input }, { JWT_SECRETE, models: { User } }) => {
      const { email, username, password } = input
      const existingUser = await User.findOne({ username })
      if (existingUser) {
        throw new Error('User with such username is already exists')
      }

      const hash = await bcrypt.hash(password, 10)
      const user = new User({
        username,
        password: hash,
        email,
      })
      const createdUser = await user.save()
      createdUser.jwt = jwt.sign({ _id: user._id }, JWT_SECRETE)
      return createdUser
    },
  },
}
