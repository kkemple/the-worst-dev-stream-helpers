const { gql } = require("apollo-server-express");

const CHAT_MESSAGE = "CHAT_MESSAGE";

const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Channel {
    id: ID!
    title: String!
    category: String!
    views: Int!
    followers: Int!
    currentStream: Stream
    currentViewers: Int!
  }

  type Stream {
    id: ID!
    title: String!
    description: String!
    date: String!
    startTime: String!
    streamers: [String!]!
  }

  type ChatMessage {
    displayName: String!
    message: String!
    color: String
    emotes: [[String!]!]
  }

  type RaidMessage {
    userName: String!
    viewers: Int!
  }

  type SubscriptionMessage {
    isGift: Boolean!
    userName: String!
    gifterName: String
  }

  type Subscription {
    chat: ChatMessage!
  }
`;

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
