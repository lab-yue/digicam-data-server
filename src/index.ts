import * as dotenv from "dotenv"
dotenv.config()

import { ApolloServer } from "apollo-server"
import resolvers from "./resolvers/resolvers"
import typeDefs from "./schema/schema"

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  const info = await server.listen()
  console.log(`🚀 Server ready at ${info.url}`)
})()
