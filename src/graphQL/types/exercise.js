import { gql } from 'apollo-server-express'

export default gql`
  type Exercise {
    _id: ID!
    name: String!
    description: String
    createdAt: Int
  }

  # type ExerciseCursor {
  #   cursor: String!
  #   exercises: [Exercise]!
  # }

  type ExercisesPagination {
    exercises: [Exercise]
    count: Int
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
    exercises(page: Int, numberOfRows: Int): ExercisesPagination
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
