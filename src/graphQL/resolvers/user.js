import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { editUserByFiledName, getUserField } from './helpers'

export default {
  Query: {
    currentUser: (root, args, { user }) => user,
    users: async (root, args, { models: { User } }) => {
      const users = await User.find({})
      return users
    },
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
    // editUser: async (root, { id, input }, { models: { User } }) => {
    //   const user = await User.findById(id)
    //   const userInfo = {}
    //   console.log(user)
    //   const editedUser = await User.findOneAndUpdate({ _id: id }, { $set: { ...user, ...input } })
    //   console.log(editedUser)
    //   return editedUser
    // },
    addExerciseToFavorite: async (root, { exerciseId }, { user, models: { User } }) => editUserByFiledName('favoriteExerciseIds', exerciseId, User, user),
    addProgramToFavorite: async (root, { programId }, { user, models: { User } }) => editUserByFiledName('favoriteProgramIds', programId, User, user),
    subscribeToUser: async (root, { userId }, { user, models: { User } }) => editUserByFiledName('subscriptions', userId, User, user),
  },
  User: {
    id: user => user._id,
    subscriptions: async (user, args, { models: { User } }) => getUserField('subscriptions', [], User, user),
    favoriteExercises: async (user, args, { models: { Exercise } }) => getUserField('favoriteExerciseIds', [], Exercise, user),
    favoritePrograms: async (user, args, { models: { Program } }) => getUserField('favoriteProgramIds', [], Program, user),
  },
}
