import { GraphQLServer } from "graphql-yoga";

// Scalar : String, Boolean, Int, Float, ID

// Create query definition and resolver for each
// title - string product name
// price - number as float
// releaseYear - number as int (optional)
// rating - number as float (optional)
// inStock - boolean

// Schema // GPA OKAY TO NULL BECAUSE IT CAN BE NOT IN SCHOOL
const typeDefs = `
    type Query {
        id : ID!
        name : String!
        age : Int!
        employed : Boolean!
        gpa : Float
    },
    type Product {
        title : String!
        price : Float!
        releaseYear : Int
        rating : Float
        inStock : Boolean!
    }
`;

// Resolver
const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    name() {
      return "Jarwo";
    },
    age() {
      return 23;
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    }
  },
  Product: {
    title() {
      return "Baju anak";
    },
    price() {
      return 1000.23;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return null;
    },
    inStock() {
      return true;
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
