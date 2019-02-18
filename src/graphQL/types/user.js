import { gql } from 'apollo-server-express'

export default gql`
    type User {
        id: ID!,
        email: String!,
        username: String!,
        jwt: String!
    }

    extend type Query {
        currentUser: User
    }

    input UserLoginInput {
      password: String!, username: String!
    }

    input UserSignupInput {
      username: String!
      password: String!
      email: String!
    }

    extend type Mutation {
        login(input: UserLoginInput!): User
        signup(input: UserSignupInput!): User
    }
    
    schema {
        query: Query,
        mutation: Mutation,
    }
`
