import { GraphQLServer } from "graphql-yoga";

// Schema
const typeDefs = `
    type Query {
        hello : String!
        name : String!
        bio : String!
        location : String!
    }
`;

// Resolver
const resolvers = {
  Query: {
    hello() {
      return "My first query";
    },
    name() {
      return "Jarwo";
    },
    location() {
      return "Banyuwangi";
    },
    bio() {
      return "biology";
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("server running at port 4000");
});
