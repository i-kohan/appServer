import { gql } from 'apollo-server-express'

export default gql`
  type Program {
    id: ID!
    name: String!
    description: String!
    exercises: [Exercise]
    isCustom: Boolean
    createdAt: String
    updatedAt: String
  }

  type ProgramsPagination {
    metadata: ProgramsMetadata
    data: [Program]
  }

  type ProgramsMetadata {
    accessor: String
    count: Int
    rowsToShow: [String]
  }

  input ProgramFilter {
    name: String
    description: String
  }
  
  input ProgramCreateInput {
    name: String!
    description: String!
    exercisesIds: [ID!]!
  }

  input ProgramEditInput {
    name: String,
    description: String
    exercisesIds: [ID]
  }

  extend type Query {
    program(id: ID!): Program
    programs(filter: ProgramFilter, page: Int, rowsPerPage: Int): ProgramsPagination
  }

  extend type Mutation {
    createProgram(input: ProgramCreateInput!, isCustom: Boolean): Program
    editProgram(id: ID!, input: ProgramEditInput!): Program
    deleteProgram(id: ID!): Program
  }

  extend type Subscription {
    programCreated: Program
    programEdited: Program
  }
`
