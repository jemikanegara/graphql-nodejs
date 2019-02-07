import { GraphQLServer } from "graphql-yoga";

// Scalar : String, Boolean, Int, Float, ID

// 1. Create a Post type
// 2. Add id, title, body, and published to the Post Type
// 3. Define a "post" query that returns a single post
// 4. Set up the resolver method to return some post data
// 5. Test out the query

// Schema // GPA OKAY TO NULL BECAUSE IT CAN BE NOT IN SCHOOL
const typeDefs = `
    type Query {
        product : Product!
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
    product() {
      return resolvers.Product;
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
