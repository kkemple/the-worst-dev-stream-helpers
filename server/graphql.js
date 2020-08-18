const { gql } = require("apollo-server-express");
const fs = require("fs");

const CHAT_MESSAGE = "CHAT_MESSAGE";

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const createResolvers = (pubsub) => {
  return {
    Query: {
      hello: () => "hi",
    },
    Subscription: {
      chat: {
        subscribe: () => pubsub.asyncIterator([CHAT_MESSAGE]),
      },
    },
  };
};

module.exports = {
  typeDefs,
  createResolvers,
};
