import { gql } from 'apollo-server-express'

export default gql`
  type Exercise {
    id: ID!
    name: String!
    description: String
    createdAt: String
    updatedAt: String
  }

  # type ExerciseCursor {
  #   cursor: String!
  #   exercises: [Exercise]!
  # }

  type ExercisesPagination {
    metadata: ExercisesMetadata
    data: [Exercise]
  }

  type ExercisesMetadata {
    accessor: String
    count: Int
    rowsToShow: [String]
  }

  input ExerciseCreateInput {
    name: String!
    description: String!
  }

  input ExerciseEditInput {
    name: String
    description: String
  }

  type ExerciseCreationForm {
    fields: [Stepper]
  }

  extend type Query {
    exercise(id: ID!): Exercise
    exercises(page: Int, rowsPerPage: Int): ExercisesPagination
    exerciseCreationForm: ExerciseCreationForm
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
