import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import {
  ApolloServer,
  // AuthenticationError,
} from 'apollo-server-express'
import { createServer } from 'http'
import * as Promise from 'bluebird'
import { typeDefs, resolvers } from './graphQL'
import Models from './mongo/schemas'

const PORT = process.env.PORT || '4000'
const JWT_SECRETE = 'super-secret'
const login = 'user'
const password = 'password1'
const db = `mongodb://${login}:${password}@ds219130.mlab.com:19130/example`

// Connect to MongoDB with Mongoose.
mongoose.Promise = Promise
mongoose.connect(
  db,
  {
    useMongoClient: true,
  },
)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

const app = express()
app.use('*', cors())

const getUser = async (authorization) => {
  const bearerLength = 'Bearer '.length
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength)
    const { ok, result } = await new Promise(res => jwt.verify(token, JWT_SECRETE, (err, data) => {
      if (err) {
        res({ ok: false, result: err })
      } else {
        res({ ok: true, result: data })
      }
    }))
    if (ok) {
      const user = await Models.User.findById(result._id)
      return user ? { ...user.toObject(), jwt: token } : null
    }
    return null
  }
  return null
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = (req && req.headers.authorization) || ''
    const user = await getUser(token)
    // if (!user) {
    //   throw new AuthenticationError('You must be logged in!')
    // }
    return {
      models: Models,
      user,
      JWT_SECRETE,
    }
  },
})
server.applyMiddleware({ app })

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
