import { GraphQLServer } from "graphql-yoga";

// Scalar : String, Boolean, Int, Float, ID

// 1. Create an "add" query that returns a float
// 2. Set up "add" to take a two arguments (a ,b ) which are required floats.
// 3. Have the resolver send back the sum of the two arguments

// Schema // GPA OKAY TO NULL BECAUSE IT CAN BE NOT IN SCHOOL
const typeDefs = `
    type Query {
        greeting(name : String ): String!
        add(numbers : [Float!]) : Float!
        post : Post!
    },
    type Product {
        title : String!
        price : Float!
        releaseYear : Int
        rating : Float
        inStock : Boolean!
    },
    type Post {
        id : ID!
        title : String!
        body : String!
        published : Boolean!
    }
`;

// Resolver
const resolvers = {
  Query: {
    add(parents, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }

      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    post() {
      return {
        id: "abc123",
        title: "Title",
        body: "Hellow world, welcome to graph",
        published: true
      };
    },
    greeting(parents, args, ctx, info) {
      console.log("PARENTS =============");
      console.log(parents);
      console.log("ARGS ================");
      console.log(args);
      console.log("CTX ====================");
      console.log(ctx);
      console.log("INFO ================");
      console.log(info);

      if (args.name) {
        return `Hello ${args.name}`;
      } else {
        return ` Just Hello`;
      }
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
