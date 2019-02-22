export default {
  Query: {
    menuItem: async (root, args, { models: { MenuItem } }) => {
      const menuItem = await MenuItem.findOne({ id: args.id })
      return menuItem
    },
    menuItems: async (root, args, { models: { MenuItem } }) => {
      const menuItems = await MenuItem.find({})
      return menuItems
    },
  },
  Mutation: {
    createMenuItem: async (root, { input }, { models: { MenuItem } }) => {
      const newMenuItem = new MenuItem({ ...input })
      const menuItem = await newMenuItem.save()
      return menuItem
    },
  },
  //   editExercise: (root, { id, input }) => {
  //     return new Promise((resolve, reject) => {
  //       Exercise.findOneAndUpdate({ id }, { $set: { ...input } }).exec(
  //         (err, res) => {
  //           pubsub.publish(EXERCISE_EDITED, { exerciseEdited: res })
  //           err ? reject(err) : resolve(res)
  //         }
  //       )
  //     })
  //   },
  //   deleteExercise: (root, args) => {
  //     return new Promise((resolve, reject) => {
  //       Exercise.findOneAndRemove(args).exec((err, res) => {
  //         err ? reject(err) : resolve(res)
  //       })
  //     })
  //   }
  // },
}
