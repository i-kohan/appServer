import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!,
    email: String!,
    username: String!,
    jwt: String!
    subscriptions: [User]
    favoriteExercises: [Exercise]
    favoritePrograms: [Program]
  }

  input UserLoginInput {
    password: String!, username: String!
  }

  input UserSignupInput {
    username: String!
    password: String!
    email: String!
  }

  input UserEditInput {
    subscriptionsId: ID
    favoriteExerciseId: ID
    favoriteProgramId: ID
  }

  extend type Query {
    currentUser: User
    users: [User]
  }

  extend type Mutation {
    login(input: UserLoginInput!): User
    signup(input: UserSignupInput!): User
    editUser(id: ID!, input: UserEditInput!): User
    addExerciseToFavorite(exerciseId: ID!): User
    addProgramToFavorite(programId: ID!): User
    subscribeToUser(userId: ID!): User
  }
`
