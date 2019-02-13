import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import { typeDefs, resolvers } from './graphQL'

const PORT = process.env.PORT || '4000'

const login = 'user'
const password = 'password1'
const db = `mongodb://${login}:${password}@ds219130.mlab.com:19130/example`

// Connect to MongoDB with Mongoose.
mongoose.connect(
  db,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

const app = express()
app.use('*', cors())

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
