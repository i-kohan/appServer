import { gql } from 'apollo-server-express'

export default gql`
  type Exercise {
    id: ID!
    name: String!
    description: String
  }

  input ExerciseCreateInput {
    name: String!
    description: String!
  }

  input ExerciseEditInput {
    name: String
    description: String
  }

  extend type Query {
    exercise(id: ID!): Exercise
    exercises: [Exercise]
  }

  extend type Mutation {
    createExercise(input: ExerciseCreateInput): Exercise
    editExercise(id: ID!, input: ExerciseEditInput): Exercise
    deleteExercise(id: ID!): Exercise
  }

  extend type Subscription {
    exerciseCreated: Exercise
    exerciseEdited: Exercise
  }
`
