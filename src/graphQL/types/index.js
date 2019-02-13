import { gql } from 'apollo-server-express'

import Exercise from './exercise'
import Program from './program'
import MenuItem from './menuItem'

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

const typeDefs = [linkSchema, Exercise, Program, MenuItem]

export default typeDefs
