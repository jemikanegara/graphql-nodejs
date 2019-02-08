import { GraphQLServer } from "graphql-yoga";

// Scalar : String, Boolean, Int, Float, ID

// 1. Set up an array of three posts with dummy post data (id, title, body, published)

const posts = [
  {
    id: "1",
    title: "Learn GraphQL",
    body: "Dont forget the syntax",
    published: false,
    author: "1"
  },
  {
    id: "2",
    title: "Learn Vue",
    body: "Vue is new framework",
    published: true,
    author: "2"
  },
  {
    id: 3,
    title: "Whats Next?",
    body: "I dont know what to do next",
    published: true,
    author: "1"
  }
];

// 2. Set up a "posts" query and resolver that returns all the posts

// 3. Test the query out

// 4. Add a "query" argument that only returns posts that contain the query string in the title or body

// 5. Run a few sample queries searching for posts with specific title

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
        post(query : String) : [Post!]!
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
        author : User!
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
    post(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
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
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
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
