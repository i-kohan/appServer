import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../mongo/schemas/user'

export default {
  Query: {
    currentUser: (root, args, { user }) => { console.log(user); return {
      "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNjY5NTI1MzRkMjZmNjI0OGJjYTEyZCIsImlhdCI6MTU1MDQ4NzM1NX0.kA5Dbu7ny5DL7-N243s8l-XyzMbbtM-hsKo02RQIEIA",
      "username": "1235",
      "email": "Hello@gmail.com",
      "id": "5c66952534d26f6248bca12d"
    }},
  },
  Mutation: {
    login: async (root, { input }, context) => {
      const { username, password } = input
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error("User with such username doesn't exists")
      }
      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        throw new Error('Password is invalid')
      }

      user.jwt = jwt.sign({ id: user.id }, context.JWT_SECRETE)

      return user
    },
    signup: async (root, { input }, context) => {
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
      createdUser.jwt = jwt.sign({ id: user.id }, context.JWT_SECRETE)
      return createdUser
    },
  },
}
