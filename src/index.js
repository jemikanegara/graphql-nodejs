import { GraphQLServer } from "graphql-yoga";

// Scalar : String, Boolean, Int, Float, ID

// 1. Create an "add" query that returns a float
// 2. Set up "add" to take a two arguments (a ,b ) which are required floats.
// 3. Have the resolver send back the sum of the two arguments

// DEMO USER DATA
const users = [
  {
    id: "1",
    name: "Jem",
    email: "jem@jem.com"
  },
  {
    id: "2",
    name: "Rocky",
    email: "rocky@bottom.com",
    age: 23
  },
  {
    id: "3",
    name: "Bully",
    email: "bully@bull.com",
    age: 90
  }
];

// Schema // GPA OKAY TO NULL BECAUSE IT CAN BE NOT IN SCHOOL
const typeDefs = `
    type Query {
        users(query : String) : [User!]!
        greeting(name : String ): String!
        post : Post!
    },
    type User {
      id : ID!
      name : String!
      email : String!
      age : Int
    }
    ,
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return (
          user.name.toLowerCase().includes(args.query.toLowerCase()) ||
          user.email.toLowerCase().includes(args.query.toLowerCase()) ||
          user.id.toLowerCase().includes(args.query.toLowerCase())
        );
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
