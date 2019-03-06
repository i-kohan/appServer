import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    addExerciseToFavorite: async (root, { exerciseId }, { user, models: { User } }) => {
      const { favoriteExerciseIds } = user
      const userToEdit = await User.findById(user._id)
      if (!favoriteExerciseIds) {
        userToEdit.favoriteExerciseIds = [exerciseId]
      } else {
        userToEdit.favoriteExerciseIds = [...favoriteExerciseIds, exerciseId]
      }
      const editedUser = await userToEdit.save()
      return editedUser
    },
    addProgramToFavorite: async (root, { programId }, { user, models: { User } }) => {
      const { favoriteProgramIds } = user
      const userToEdit = await User.findById(user._id)
      if (!favoriteProgramIds) {
        userToEdit.favoriteProgramIds = [programId]
      } else {
        const exist = favoriteProgramIds.some(id => programId === id)
        if (exist) {
          throw new Error('You have already added this program to favorite')
        }
        userToEdit.favoriteProgramIds = [...favoriteProgramIds, programId]
      }
      const editedUser = await userToEdit.save()
      return editedUser
    },
    subscribeToUser: async (root, { userId }, { user, models: { User } }) => {
      const { subscriptions } = user
      const userToEdit = await User.findById(user._id)
      if (!subscriptions) {
        userToEdit.subscriptions = [userId]
      } else {
        userToEdit.subscriptions = [...subscriptions, userId]
      }
      const editedUser = await userToEdit.save()
      return editedUser
    },
  },
  User: {
    id: user => user._id,
    subscriptions: async (user, args, { models: { User } }) => {
      const { subscriptions } = user
      if (!subscriptions) {
        return []
      }
      const users = await Promise.all(subscriptions.map(async (subId) => {
        const sub = await User.findById(subId)
        return sub
      }))
      return users
    },
    favoriteExercises: async (user, args, { models: { Exercise } }) => {
      const { favoriteExerciseIds } = user
      if (!favoriteExerciseIds) {
        return []
      }
      const exercises = await Promise.all(favoriteExerciseIds.map(async (exId) => {
        const ex = await Exercise.findById(exId)
        return ex
      }))
      return exercises
    },
    favoritePrograms: async (user, args, { models: { Program } }) => {
      const { favoriteProgramIds } = user
      if (!favoriteProgramIds) {
        return []
      }
      const programs = await Promise.all(favoriteProgramIds.map(async (prId) => {
        const pr = await Program.findById(prId)
        return pr
      }))
      return programs
    },
  },
}
