import Exercise from "../../mongo/schemas/exercise";

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const EXERCISE_CREATED = 'EXERCISE_CREATED'
const EXERCISE_EDITED = 'EXERCISE_EDITED'

export default {
  Query: {
    exercise: (root, args) => {
      return new Promise((resolve, reject) => {
        Exercise.findOne({ id: args.id }).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    exercises: () => {
      return new Promise((resolve, reject) => {
        Exercise.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    createExercise: (root, { input }) => {
      const newExercise = new Exercise({ ...input });
      return new Promise((resolve, reject) => {
        newExercise.save((err, res) => {
          pubsub.publish(EXERCISE_CREATED, { exerciseCreated: res })
          err ? reject(err) : resolve(res);
        });
      });
    },
    editExercise: (root, { id, input }) => {
      return new Promise((resolve, reject) => {
        Exercise.findOneAndUpdate({ id }, { $set: { ...input } }).exec(
          (err, res) => {
            pubsub.publish(EXERCISE_EDITED, { exerciseEdited: res })
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteExercise: (root, args) => {
      return new Promise((resolve, reject) => {
        Exercise.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Subscription: {
    exerciseCreated: {
      subscribe: () => pubsub.asyncIterator([EXERCISE_CREATED]),
    },
    exerciseEdited: {
      subscribe: () => pubsub.asyncIterator([EXERCISE_EDITED])
    }
  }
};