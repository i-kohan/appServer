import { PubSub } from 'apollo-server'
import { buildMongoConditionsFromFilters } from '@entria/graphql-mongo-helpers'
import { programsMapping } from '../mappings'

const pubsub = new PubSub()

const PROGRAM_CREATED = 'PROGRAM_CREATED'
const PROGRAM_EDITED = 'PROGRAM_EDITED'

export default {
  Query: {
    program: async (root, args, { models: { Program } }) => {
      const program = await Program.findOne({ id: args.id })
      return program
    },
    programs: async (root, args, { models: { Program } }) => {
      const filterResult = buildMongoConditionsFromFilters(null, args.filter, programsMapping)
      const programs = await Program.find(filterResult.conditions)
      return programs
    },
  },
  Mutation: {
    createProgram: async (root, { input }, { models: { Program } }) => {
      const isCustom = input.isCustom || true
      const newProgram = new Program({ ...input, isCustom })
      const program = await newProgram.save()
      pubsub.publish(PROGRAM_CREATED, { programCreated: program })
      return program
    },
    editProgram: async (root, { id, input }, { models: { Program } }) => {
      const program = await Program.findOneAndUpdate({ id }, { $set: { ...input } })
      pubsub.publish(PROGRAM_EDITED, { programEdited: program })
      return program
    },
    deleteProgram: async (root, args, { models: { Program } }) => {
      const removedProgram = await Program.findOneAndRemove(args)
      return removedProgram
    },
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
