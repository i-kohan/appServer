import { gql } from 'apollo-server-express'

export default gql`
  type MenuItem {
    id: ID!
    title: String!
    path: String!
    iconName: String!
  }

  input MenuItemCreateInput {
    title: String!
    path: String!
    iconName: String!
  }

  input MenuItemEditInput {
    path: String
    title: String
    iconName: String
  }

  extend type Query {
    menuItem(id: ID!): MenuItem
    menuItems: [MenuItem]
  }

  extend type Mutation {
    createMenuItem(input: MenuItemCreateInput): MenuItem
    # editMenuItem(id: ID!, input: MenuItemEditInput): MenuItem
    # deleteMenuItem(id: ID!): MenuItem
  }
`
