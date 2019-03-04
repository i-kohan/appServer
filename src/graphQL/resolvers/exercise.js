import { PubSub } from 'apollo-server'

const pubsub = new PubSub()

const EXERCISE_CREATED = 'EXERCISE_CREATED'
const EXERCISE_EDITED = 'EXERCISE_EDITED'

export default {
  Query: {
    exercise: async (root, args, { models: { Exercise } }) => {
      const exercise = await Exercise.findById(args.id)
      return exercise
    },
    exercises: async (root, args, { models: { Exercise } }) => {
      const exercises = await Exercise.find({})
      const count = exercises.length
      if ('page' in args && 'numberOfRows' in args) {
        const { page, numberOfRows } = args
        return {
          exercises: exercises.slice(page * numberOfRows, page * numberOfRows + numberOfRows),
          count,
        }
      }
      return { exercises, count }
    },
  },
  Mutation: {
    createExercise: async (root, { input }, { models: { Exercise } }) => {
      const newExercise = new Exercise({ ...input })
      const exercise = await newExercise.save()
      pubsub.publish(EXERCISE_CREATED, { exerciseCreated: exercise })
      return exercise
    },
    editExercise: async (root, { id, input }, { models: { Exercise } }) => {
      const editedExercise = await Exercise.findOneAndUpdate({ id }, { $set: { ...input } })
      pubsub.publish(EXERCISE_EDITED, { exerciseEdited: editedExercise })
      return editedExercise
    },
    deleteExercise: async (root, args, { models: { Exercise } }) => {
      const removedExercise = await Exercise.findOneAndRemove(args)
      return removedExercise
    },
  },
  Subscription: {
    exerciseCreated: {
      subscribe: () => pubsub.asyncIterator([EXERCISE_CREATED]),
    },
    exerciseEdited: {
      subscribe: () => pubsub.asyncIterator([EXERCISE_EDITED]),
    },
  },
}
