const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: Boolean
  }
  type Mutation {
    registerUser(name: String!, email: String!, password: String!): User!
  }
  type User {
    id: ID!
    name: String!
    email: String!
  }
`;



const resolvers = {
  Query: {
    hello: () => true
  },
  Mutation: {
    registerUser: async (_, { name, email, password }) => {
      
      return { id: "1", name, email, password};
    },
  },
};

const server = new ApolloServer({
  typeDefs, resolvers  
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
