import { gql } from 'apollo-server-express'

export default gql`
  type Program {
    _id: ID!
    name: String!
    description: String!
    exercisesIds: [ID!]!
    isCustom: Boolean
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
    programs: [Program]
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
