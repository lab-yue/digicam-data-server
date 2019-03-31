import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import typeDefs from "./schema/schema";
import resolvers from "./resolvers/resolvers";

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
    //    formatError: err => err.message
  });
  const info = await server.listen();
  console.log(`🚀 Server ready at ${info.url}`);
})();
