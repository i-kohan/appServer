import MenuItem from '../../mongo/schemas/menuItem'

export default {
  Query: {
    menuItem: (root, args) => new Promise((resolve, reject) => {
      MenuItem.findOne({ id: args.id }).exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    }),
    menuItems: () => new Promise((resolve, reject) => {
      MenuItem.find({})
        .populate()
        .exec((err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    }),
  },
  Mutation: {
    createMenuItem: (root, { input }) => {
      const newMenuItem = new MenuItem({ ...input })
      return new Promise((resolve, reject) => {
        newMenuItem.save((err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
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
