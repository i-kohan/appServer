import { PubSub } from 'apollo-server'
import Program from '../../mongo/schemas/program'

const pubsub = new PubSub()

const PROGRAM_CREATED = 'PROGRAM_CREATED'
const PROGRAM_EDITED = 'PROGRAM_EDITED'

export default {
  Query: {
    program: (root, args) => new Promise((resolve, reject) => {
      Program.findOne({ id: args.id }).exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    }),
    programs: () => new Promise((resolve, reject) => {
      Program.find({})
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
    createProgram: (root, { input }) => {
      const isCustom = input.isCustom || true
      const newProgram = new Program({ ...input, isCustom })
      return new Promise((resolve, reject) => {
        newProgram.save((err, res) => {
          pubsub.publish(PROGRAM_CREATED, { programCreated: res })
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    },
    editProgram: (root, { id, input }) => new Promise((resolve, reject) => {
      Program.findOneAndUpdate({ id }, { $set: { ...input } }).exec(
        (err, res) => {
          pubsub.publish(PROGRAM_EDITED, { programEdited: res })
          if (err) {
            reject(err)
          }
          resolve(res)
        },
      )
    }),
    deleteProgram: (root, args) => new Promise((resolve, reject) => {
      Program.findOneAndRemove(args).exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    }),
  },
  Subscription: {
    programCreated: {
      subscribe: () => pubsub.asyncIterator([PROGRAM_CREATED]),
    },
    programEdited: {
      subscribe: () => pubsub.asyncIterator([PROGRAM_EDITED]),
    },
  },
}
