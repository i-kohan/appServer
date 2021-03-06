import { gql } from 'apollo-server-express'

import Exercise from './exercise'
import Program from './program'
import MenuItem from './menuItem'
import User from './user'
import Inputs from './inputs'

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

const typeDefs = [linkSchema, Exercise, Program, MenuItem, User, Inputs]

export default typeDefs
