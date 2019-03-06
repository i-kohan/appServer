import { PubSub } from 'apollo-server'
// import { buildMongoConditionsFromFilters } from '@entria/graphql-mongo-helpers'
// import { programsMapping } from '../mappings'
import { buildProgramsPageConfig } from '../pageConfigs'

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
      // const filterResult = buildMongoConditionsFromFilters(null, args.filter, programsMapping)
      // const programs = await Program.find(filterResult.conditions)
      // return programs
      let programs = await Program.find({})
      const count = programs.length
      if ('page' in args && 'rowsPerPage' in args) {
        const { page, rowsPerPage } = args
        programs = programs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      }
      return buildProgramsPageConfig(programs, count)
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
  Program: {
    exercises: async (program, args, { models: { Exercise } }) => {
      const ids = program.exercisesIds
      const exercises = await ids.map(async (id) => {
        const exercise = await Exercise.findById(id)
        return exercise
      })
      return exercises
    },
    id: program => program._id,
  },
}
